import { Row, Col, Button, Slider, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { ReactComponent as Expand } from '@/assets/expand.svg';
import KpBigInput from '@/components/KpBigInput';
import KpInfoList from '@/components/KpInfoList';
import { useWeb3React } from '@web3-react/core';
import KpTokenInput from '@/components/KpTokenInput';
import KpTokenSelect from '@/components/KpTokenSelect';
import useSWR from 'swr';
import { checkAllowance, approve, performTx, withConfirmation } from '@/apis';
import { ethers } from 'ethers';
import { parseUnits } from '@ethersproject/units';
import LendingPool from '@/abis/LendingPool.json';
import { toBN } from '@/utils';

import styles from './index.less';
import { getPoolAddr, getToken } from '@/constants';

const KpLongShort = (props: any) => {
  const {
    selectedToken,
    collateralToken,
    setCollateralToken,
    futureToken,
    setFutureToken,
    onSelectPool,
    onSelectToken,
    selectedTab,
    tokenUpdated,
    setTokenUpdated,
    ...rest
  } = props;
  const [more, setMore] = useState(false);
  const [lm, setLm] = useState(true);
  const { library, chainId, active, account, activate, deactivate } =
    useWeb3React();
  const [slider, setSlider] = useState(1);
  const [inputVal, setInputVal] = useState();
  const [step, setStep] = useState('approve');
  const [buttonText, setButtonText] = useState('Approvee');

  // TODO: calculate info
  const [infolistMain, setInfolistMain] = useState([]);
  useEffect(() => {
    const newInfolistMain = [
      [`${selectedTab} Token Amount`, `0.00 ${futureToken?.name || ''}`],
      ['Liq. Price', ''],
      ['Borrow Rate', '3.41%'],
    ];
    setInfolistMain(newInfolistMain);
  }, []);

  const onSelectCollateralToken = () => {
    setTokenUpdated('collateral');
    onSelectToken();
  };
  const onSelectFutureToken = () => {
    setTokenUpdated('future');
    onSelectToken();
  };
  useEffect(() => {
    if (tokenUpdated == 'collateral') {
      setCollateralToken(selectedToken);
    } else {
      setFutureToken(selectedToken);
    }
  }, [selectedToken]);
  console.log('collateral / future: ', collateralToken, futureToken);

  const printArgs = () => {
    console.log(
      'kplongshort, args: ',
      selectedTab,
      collateralToken?.name,
      futureToken?.name,
      inputVal,
      slider,
    );
  };

  // const token = collateralToken ? getToken(chainId, collateralToken) || 'ETH';
  const poolAddr = getPoolAddr('Main Pool');

  // allowance check
  const { data: allowance, mutate: updateAllowance } = useSWR(
    active &&
      collateralToken && [
        chainId,
        library,
        account,
        collateralToken?.name || 'ETH',
        poolAddr,
      ],
    checkAllowance,
  );
  console.log('kplongshort, allowance: ', allowance);

  useEffect(() => {
    console.log('kpbuy, update step', inputVal, allowance);
    if (!inputVal || !allowance) return;
    const inputBN = ethers.BigNumber.from(`${inputVal}`);
    if (inputBN.gt(allowance)) {
      setStep('approve');
    } else {
      setStep('tx');
    }
  }, [allowance, inputVal]);

  useEffect(() => {
    if (!library) return;
    library.on('block', () => {
      console.log('kpbuy, updated block');
      updateAllowance();
    });
    return () => {
      library.removeAllListeners('block');
    };
  }, [library]);

  // button click action
  const onButtonClicked = () => {
    console.log('executingTX');
    const poolAddr = getPoolAddr('Main Pool');
    if (step == 'approve') {
      approve(chainId, library, account, collateralToken.name, poolAddr);
    } else {
      const parsedAmount = parseUnits(
        inputVal || `0`,
        collateralToken.decimals,
      ).toString();
      const parsedLeverage = parseUnits(`${slider}` || `0`, 27).toString();
      if (selectedTab == 'Long') {
        withConfirmation(
          performTx(
            library,
            LendingPool.abi,
            account,
            poolAddr,
            'openPosition',
            [
              collateralToken.address,
              futureToken.address,
              collateralToken.address,
              parsedAmount,
              parsedLeverage,
            ],
          ),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (selectedTab == 'Short') {
        withConfirmation(
          performTx(
            library,
            LendingPool.abi,
            account,
            poolAddr,
            'openPosition',
            [
              futureToken.address,
              collateralToken.address,
              futureToken.address,
              parsedAmount,
              parsedLeverage,
            ],
          ),
        ).then(() => {
          console.log('Transaction done');
        });
      }
    }
  };

  return (
    <div className={styles.ki} {...rest}>
      <div style={{ padding: '36px 15px' }}>
        <div style={{ padding: '5px 0' }}>
          <span style={{ display: 'flex', color: 'rgba(255, 255, 255, 0.4)' }}>
            Collateral
          </span>
          <KpTokenSelect
            onSelectToken={onSelectCollateralToken}
            name={collateralToken?.name}
            icon={collateralToken?.icon}
          />
        </div>
        <div style={{ padding: '5px 0' }}>
          <span style={{ display: 'flex', color: 'rgba(255, 255, 255, 0.4)' }}>
            Future
          </span>
          <KpTokenSelect
            onSelectToken={onSelectFutureToken}
            name={futureToken?.name}
            icon={futureToken?.icon}
          />
        </div>
        <KpBigInput
          placeholder="Collateral Amount"
          inputVal={inputVal}
          setInputVal={setInputVal}
        />
        <>
          <div className={styles.lm}>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Leverage Model</div>
            <div className={styles.inputArea}>
              <div>
                <input
                  value={
                    (typeof slider == 'number' && (slider * 1).toFixed(1)) ||
                    slider
                  }
                  onChange={(e) => setSlider(e.target.value)}
                />
                <span>x</span>
              </div>
            </div>
            <Checkbox checked={lm} onChange={(e) => setLm(e.target.checked)} />
          </div>
          {lm && (
            <Slider
              onChange={(e) => setSlider(e)}
              marks={{ 1: '1x', 5: '5x', 10: '10x', 15: '15x', 20: '20x' }}
              value={slider}
              step={0.1}
              min={1}
              max={20}
            />
          )}
        </>

        <KpInfoList dataSource={infolistMain} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button disabled={!active} onClick={onButtonClicked}>
            {step == 'approve' ? 'Approve' : selectedTab}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default KpLongShort;
