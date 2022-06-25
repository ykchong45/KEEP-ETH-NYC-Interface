import { Row, Col, Button, Slider, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { ReactComponent as Expand } from '@/assets/expand.svg';
import KpBigInput from '@/components/KpBigInput';
import KpInfoList from '@/components/KpInfoList';
import KpTokenInput from '@/components/KpTokenInput';
import KpTokenNPoolSelect from '@/components/KpTokenNPoolSelect';

import styles from './index.less';
import { useWeb3React } from '@web3-react/core';
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

const KpTotal = (props: any) => {
  const { dataSource, onSelectPool, onSelectToken, selectedTab, ...rest } =
    props;
  const [more, setMore] = useState(false);
  const [lm, setLm] = useState(true);
  const [val, setVal] = useState(1);
  // 选择token
  const onChoseToken = (props: any) => {};

  const { active } = useWeb3React();
  return (
    <div className={styles.ki} {...rest}>
      <div style={{ padding: '36px 15px' }}>
        <KpTokenNPoolSelect
          pool
          onSelectPool={onSelectPool}
          onSelectToken={onSelectToken}
          dataSource={props.dataSource}
        />
        <KpBigInput placeholder="Amount" />

        <KpInfoList dataSource={infolistMain} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button disabled={!active} onClick={props.open}>
            {selectedTab}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default KpTotal;
