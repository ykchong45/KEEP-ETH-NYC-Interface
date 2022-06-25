import { Row, Col, Button, Slider, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { ReactComponent as Expand } from '@/assets/expand.svg';
import KpBigInput from '@/components/KpBigInput';
import KpInfoList from '@/components/KpInfoList';
import { useWeb3React } from '@web3-react/core';
import KpTokenInput from '@/components/KpTokenInput';
import KpTokenSelect from '@/components/KpTokenSelect';

import styles from './index.less';

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
  const { chainId, active, account, activate, deactivate } = useWeb3React();
  const [val, setVal] = useState(1);

  // 选择token
  const onChoseToken = (props: any) => {};

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
            Future Token
          </span>
          <KpTokenSelect
            onSelectToken={onSelectFutureToken}
            name={futureToken?.name}
            icon={futureToken?.icon}
          />
        </div>
        <KpBigInput placeholder="Collateral Amount" />
        <>
          <div className={styles.lm}>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Leverage Model</div>
            <div className={styles.inputArea}>
              <div>
                <input
                  value={
                    (typeof val == 'number' && (val * 1).toFixed(1)) || val
                  }
                  onChange={(e) => setVal(e.target.value)}
                />
                <span>x</span>
              </div>
            </div>
            <Checkbox checked={lm} onChange={(e) => setLm(e.target.checked)} />
          </div>
          {lm && (
            <Slider
              onChange={(e) => setVal(e)}
              marks={{ 1: '1x', 2: '2x', 3: '3x', 4: '4x', 5: '5x' }}
              value={val}
              step={0.1}
              min={1}
              max={5}
            />
          )}
        </>

        <KpInfoList dataSource={infolistMain} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button disabled={!active} onClick={() => {}}>
            {selectedTab}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default KpLongShort;
