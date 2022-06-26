import { Row, Col, Button, Slider, Checkbox } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Expand } from '@/assets/expand.svg';
import KpBigInput from '@/components/KpBigInput';
import KpInfoList from '@/components/KpInfoList';
import KpTokenInput from '@/components/KpTokenInput';
import KpTokenNPoolSelect from '@/components/KpTokenNPoolSelect';
import { ethers } from 'ethers';

import styles from './index.less';
import { useWeb3React } from '@web3-react/core';
import { approve, checkAllowance, performTx, withConfirmation } from '@/apis';
import { getPoolAddr, getToken } from '@/constants';
import useSWR from 'swr';
import LendingPool from '@/abis/LendingPool.json';
import { parseUnits } from '@ethersproject/units';
const infolistMain = [
  ['User borrow limit', '$0.00'],
  ['Utilization', '0%'],
  ['Supply APR', '3.41%'],
];
const infolistMore = [
  ['Reserve deposit limit', '1,000,000,000 USDC'],
  ['Loan to value (LTV ratio) ', '75%'],
  ['Liquidation threshold ', '85%'],
  ['Liquidation penalty', '5%'],
  ['Max borrow APR ', '50%'],
  ['Target borrow APR ', '8%'],
  ['Target utilization metric info', '80%'],
  ['Current asset utilization', '58.48%'],
  ['Reserve address', 'Bgxf...Mpmw '],
  ['Token mint', 'Bgxf...Mpmw '],
  ['cToken mint', 'Bgxf...Mpmw '],
  ['Pyth oracle address', 'Bgxf...Mpmw '],
  ['Switchboard oracle address', 'Bgxf...Mpmw '],
];

const checkApprove = () => {};

const KpTotal = (props: any) => {
  const { dataSource, onSelectPool, onSelectToken, selectedTab, ...rest } =
    props;
  const { active, account, chainId, library } = useWeb3React();
  const [inputVal, setInputVal] = useState();
  const [step, setStep] = useState('approve');

  const TabRef = useRef();
  TabRef.current = selectedTab;
  // useEffect(() => {

  // }, [])

  console.log('kpbuy, r1, r2', dataSource);

  const onButtonClicked = (selectedTab) => {
    console.log('executingTX');
    if (step == 'approve') {
      const poolName = dataSource.r2.name;
      const poolAddr = getPoolAddr(poolName);
      console.log('kpbuy, r2 name: ', poolAddr, chainId);
      approve(chainId, library, account, dataSource.r1.name, poolAddr);
    } else {
      const token = getToken(chainId, dataSource.r1.name);
      const parsedAmount = parseUnits(
        inputVal || `0`,
        token.decimals,
      ).toString();
      if (TabRef.current == 'Supply') {
        const poolName = dataSource.r2.name;
        const poolAddr = getPoolAddr(poolName);
        console.log(LendingPool);
        withConfirmation(
          performTx(library, LendingPool.abi, account, poolAddr, 'deposit', [
            token.address,
            parsedAmount,
            account,
          ]),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (TabRef.current == 'Borrow') {
        const poolName = dataSource.r2.name;
        const poolAddr = getPoolAddr(poolName);
        console.log(LendingPool);
        withConfirmation(
          performTx(library, LendingPool.abi, account, poolAddr, 'borrow', [
            token.address,
            parsedAmount,
            2,
            account,
          ]),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (TabRef.current == 'Withdraw') {
        const poolName = dataSource.r2.name;
        const poolAddr = getPoolAddr(poolName);
        console.log(LendingPool);
        // const parsedAmount = parseUnits(`${inputVal}`,decimals).toString();
        withConfirmation(
          performTx(library, LendingPool.abi, account, poolAddr, 'withdraw', [
            token.address,
            parsedAmount,
            account,
          ]),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (TabRef.current == 'Repay') {
        const poolName = dataSource.r2.name;
        const poolAddr = getPoolAddr(poolName);
        console.log(LendingPool);
        // const parsedAmount = parseUnits(`${inputVal}`,decimals).toString();
        withConfirmation(
          performTx(library, LendingPool.abi, account, poolAddr, 'repay', [
            token.address,
            parsedAmount,
            2,
            account,
          ]),
        ).then(() => {
          console.log('Transaction done');
        });
      }
    }
  };

  const token = dataSource.r1.name || 'ETH';
  const poolAddr = dataSource.r2?.name
    ? getPoolAddr(dataSource.r2.name)
    : 'Main Pool';
  console.log('kpbuy, mainpool', poolAddr);

  const { data: allowance, mutate: updateAllowance } = useSWR(
    [chainId, library, account, token, poolAddr],
    checkAllowance,
  );

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

  const printArgs = () => {
    console.log('kpbuy, args: ', dataSource.r1, dataSource.r2, inputVal);
  };

  return (
    <div className={styles.ki} {...rest}>
      <div style={{ padding: '36px 15px' }}>
        <KpTokenNPoolSelect
          pool
          onSelectPool={onSelectPool}
          onSelectToken={onSelectToken}
          dataSource={props.dataSource}
        />
        <KpBigInput
          placeholder="Amount"
          inputVal={inputVal}
          setInputVal={setInputVal}
        />

        <KpInfoList dataSource={infolistMain} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button disabled={!active} onClick={onButtonClicked}>
            {step == 'approve' ? 'Approve' : selectedTab}
          </Button>
        </div>

        <span onClick={() => printArgs()}>test print arguments</span>
      </div>
    </div>
  );
};
export default KpTotal;
