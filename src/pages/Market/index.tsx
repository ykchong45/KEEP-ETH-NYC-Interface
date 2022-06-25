import { useEffect, useMemo, useState } from 'react';
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
import KpBuy from '@/components/KpBuy';
import KpRpc from '@/components/KpRpc';
import KpTabs from '@/components/KpTabs';
import KpChildTable from '@/components/KpChildTable';
import {
  columns,
  childColumns,
  childData,
  columnsPool,
  dataPool,
  childColumnsPool,
  childDataPool,
} from './data';
import styles from './index.less';
import { getTokenList, getPoolNames } from '@/constants';
import usePriceFeed from '@/components/Covalent';
const { TabPane } = Tabs;

const Page = (props) => {
  const { library, deactivate, chainId, account, active, activate, error } =
    useWeb3React();
  const [selectedTab, setSelectedTab] = useState('Supply');
  const [more, setMore] = useState(false);
  const [pool, setPool] = useState(false);
  const [lm, setLm] = useState(false);
  const [r1, setR1] = useState({});
  const [r2, setR2] = useState({});
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [poolData, setPoolData] = useState([]);
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
  const onSelectPool = (key, name) => {
    setR2((data) => {
      return { key, name };
    });
  };
  const onChange = (key: any) => {
    setKey(key);
  };
  const tokenList = getTokenList(chainId);
  // const parentTable = tokenList.map(token => ({
  //   icon: token.icon,
  //   name: token.name,
  //   price: token.price,
  //   lev: token.lev,

  //   ltv: 5,
  //   totalSupply: 123,
  //   totalBorrow: 123,
  //   supplyApr: 5,
  //   borrowApr: 8,
  // }))

  //

  // Covalent price feed
  const latestPrices = usePriceFeed();

  // fetch asset, ltv, totalSupply, supplyApr, totalBorrow, borrowApr for all token, all pools
  const marketData = useMemo(() => {
    let marketData = tokenList.map((token, idx) => {
      const pools = token.pools.map((poolId) => ({
        key: idx,
        token: token.name,
        name: getPoolNames(poolId),
        ltv: 5,
        totalSupply: 123,
        totalBorrow: 123,
        supplyApr: 5,
        borrowApr: 8,
      }));

      const stats = {
        ltv: pools.reduce((prev, pool) => prev + pool.ltv, 0) / pools.length,
        totalBorrow: pools.reduce((prev, pool) => prev + pool.totalBorrow, 0),
        totalSupply: pools.reduce((prev, pool) => prev + pool.totalSupply, 0),
        borrowApr:
          pools.reduce((prev, pool) => prev + pool.borrowApr, 0) / pools.length,
        supplyApr:
          pools.reduce((prev, pool) => prev + pool.supplyApr, 0) / pools.length,
      };
      return {
        key: idx,
        icon: token.icon,
        name: token.name,
        pools,
        ...stats,
      };
    });

    console.log('debug, marketData: ', marketData);
    return marketData;
  }, [tokenList, latestPrices]);

  useEffect(() => {
    let newPoolData = [];
    if (marketData) {
      console.log('debug, poolData expanded: ', expandedRowKeys);
      newPoolData = marketData[expandedRowKeys]?.pools;
      console.log(
        'debug, poolData: ',
        marketData,
        expandedRowKeys,
        newPoolData,
      );
    }
    setPoolData(newPoolData);
  }, [marketData, expandedRowKeys]);

  // only expand one row at a time: https://stackoverflow.com/questions/67295603/react-and-expandedrow-render-in-ant-design
  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.key); // I have set my record.id as row key. Check the documentation for more details.
    }
    setExpandedRowKeys(keys);
  };

  const totalSupply = useMemo(() => {
    if (marketData) {
      return marketData.reduce(
        (prev, token) =>
          prev + token.totalSupply * (latestPrices[token.name] || 0),
        0,
      );
    }
    return 0;
  }, [marketData]);
  const totalBorrows = useMemo(() => {
    if (marketData) {
      return marketData.reduce(
        (prev, token) =>
          prev + token.totalBorrow * (latestPrices[token.name] || 0),
        0,
      );
    }
    return 0;
  }, [marketData]);

  return (
    <div className={styles.market}>
      <Row>
        <Col className={styles.main} span={24}>
          <KpRpc totalSupply={totalSupply} totalBorrows={totalBorrows} />

          <Row>
            <Col span={16}>
              <div>
                <Tabs
                  defaultActiveKey="1"
                  onChange={onChange}
                  type="card"
                  style={{
                    width: '200px',
                    border: '1px solid #1b1d23',
                    borderBottom: '0',
                    transform: 'translateY(1px)',
                  }}
                >
                  <TabPane tab="Assets" key="1"></TabPane>
                  {/* <TabPane tab="Pools" key="2"></TabPane> */}
                </Tabs>
              </div>
              {(key == '1' && (
                <Table
                  style={{ border: '1px solid #1b1d23' }}
                  columns={columns}
                  dataSource={marketData}
                  expandedRowKeys={expandedRowKeys}
                  onExpand={onTableRowExpand}
                  expandable={{
                    expandRowByClick: true,
                    expandedRowRender: (record1) => (
                      <div style={{ background: '#1b1d23' }}>
                        <KpChildTable
                          style={{ margin: '0' }}
                          columns={childColumns}
                          showHeader={false}
                          pagination={false}
                          dataSource={poolData}
                          onRow={(record2) => {
                            return {
                              onClick: (event) => {
                                setR1(record1);
                                setR2(record2);
                              }, // 点击行
                            };
                          }}
                        />
                      </div>
                    ),
                  }}
                  pagination={false}
                />
              )) || (
                <Table
                  style={{ border: '1px solid #1b1d23' }}
                  columns={columnsPool}
                  dataSource={dataPool}
                  expandable={{
                    expandRowByClick: true,
                    expandedRowRender: (record) => (
                      <div style={{ background: '#1b1d23' }}>
                        <KpChildTable
                          style={{ margin: '0' }}
                          columns={childColumnsPool}
                          showHeader={false}
                          pagination={false}
                          dataSource={record.childData}
                          onRow={(record2) => {
                            return {
                              onClick: (event) => {
                                setR1(record2);
                                setR2(record);
                              }, // 点击行
                            };
                          }}
                        />
                      </div>
                    ),
                  }}
                  pagination={false}
                />
              )}
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ paddingLeft: '25px' }}
            >
              <Affix offsetTop={10}>
                <div className={styles.action}>
                  <KpTabs
                    tabType="market"
                    setSelectedTab={setSelectedTab}
                    onChange={() => {}}
                  />
                  <KpBuy
                    onSelectPool={onSelectPool}
                    onSelectToken={onSelectToken}
                    selectedTab={selectedTab}
                    dataSource={{
                      r1,
                      r2,
                    }}
                    open={() => props.setVisibleMetaMask(true)}
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
                      {getTokenList(chainId).map((item) => (
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
                      ))}
                    </div>
                  </Drawer>
                </div>
              </Affix>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Page;
