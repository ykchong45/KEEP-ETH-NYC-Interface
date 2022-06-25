import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import {
  Row,
  Col,
  Skeleton,
  Tabs,
  Button,
  Table,
  Affix,
  Drawer,
  Slider,
} from 'antd';
import KpTabs from '@/components/KpTabs';
import KpMarginDashboard from '@/components/KpMarginDashboard';
import styles from './index.less';
import KpLongShort from '@/components/KpLongShort';
import KpPriceChart from '@/components/KpPriceChart';
import { getTokenList } from '@/constants';
const Page = () => {
  const { library, deactivate, chainId, account, active, activate, error } =
    useWeb3React();
  const [more, setMore] = useState(false);
  const [pool, setPool] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Long');
  const [lm, setLm] = useState(false);
  const [r1, setR1] = useState({});
  const [r2, setR2] = useState({});
  const [tokenUpdated, setTokenUpdated] = useState('Collateral');
  const [collateralToken, setCollateralToken] = useState();
  const [futureToken, setFutureToken] = useState();
  const injected = new InjectedConnector({
    supportedChainIds: [56],
  });
  useEffect(() => {
    // activate(injected);
  }, []);
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState('1');

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSelectToken = () => {
    setVisible(true);
  };
  const onSelectTokenCurrent = (item) => {
    setR1(item);
    setVisible(false);
  };
  const onChange = (key: any) => {
    setKey(key);
  };
  console.log('margin, chainid: ', chainId);
  console.log('margin, tokenlist ', getTokenList(chainId));
  return (
    <div className={styles.market}>
      <Row>
        <Col className={styles.main} span={24}>
          <Row>
            <Col span={16}>
              <KpPriceChart token={futureToken?.name || 'BTC'} />
              <KpMarginDashboard />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ paddingLeft: '25px' }}
            >
              <div className={styles.action}>
                <KpTabs
                  tabType="margin"
                  setSelectedTab={setSelectedTab}
                  onChange={() => {}}
                />
                <KpLongShort
                  collateralToken={collateralToken}
                  setCollateralToken={setCollateralToken}
                  futureToken={futureToken}
                  setFutureToken={setFutureToken}
                  onSelectPool={() => {}}
                  selectedTab={selectedTab}
                  selectedToken={r1}
                  tokenUpdated={tokenUpdated}
                  setTokenUpdated={setTokenUpdated}
                  onSelectToken={onSelectToken}
                />
                <Drawer
                  title="Select a Token"
                  className={styles.h100}
                  placement="bottom"
                  onClose={onClose}
                  visible={visible}
                  getContainer={false}
                  maskClosable={false}
                  // closeIcon={false}
                  style={{ position: 'absolute' }}
                >
                  <div className={styles.title}>
                    <div>
                      <p>Token Name</p>
                    </div>
                    <div>
                      <p>Balance</p>
                    </div>
                  </div>
                  <hr />

                  <div className={styles.tokenlist}>
                    {getTokenList(chainId).map((item) => {
                      if (tokenUpdated == 'future' && item.name == 'USDC')
                        return <></>;

                      return (
                        <div
                          className={styles.item}
                          onClick={() => onSelectTokenCurrent(item)}
                        >
                          <div>
                            <img src={item.icon} />
                            <p>{item.name}</p>
                          </div>
                          <div>
                            <p>0</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Drawer>
              </div>
            </Col>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    </div>
  );
};
export default Page;
