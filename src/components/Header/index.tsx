import { useEffect, useState } from 'react';
import { history } from 'umi';
import { Layout, Menu, Row, Col } from 'antd';
import { createFromIconfontCN, CheckCircleOutlined } from '@ant-design/icons';
import KpModal from '@/components/KpModal';
import Logo from '@/assets/logo.png';
import iconjs from './iconfont.js';

import styles from './index.less';
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '@/connectors';
import web3 from 'web3';
import { getNetworks } from '@/constants';
const IconFont = createFromIconfontCN({
  scriptUrl: iconjs,
});

const Header = () => {
  const [visibleMetaMask, setVisibleMetaMask] = useState(false);
  const onhandCancel = () => {
    setVisibleMetaMask((data) => !data);
  };
  const [networkList, setNetworkList] = useState(getNetworks());

  const { chainId, active, account, activate, deactivate } = useWeb3React();

  const switchChain = async (selectedChainId) => {
    console.log(
      'current chainId: ',
      selectedChainId,
      web3.utils.toHex(selectedChainId),
    );
    if (window.ethereum.networkVersion !== selectedChainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(selectedChainId) }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Polygon Mainnet',
                chainId: web3.utils.toHex(selectedChainId),
                nativeCurrency: {
                  name: 'MATIC',
                  decimals: 18,
                  symbol: 'MATIC',
                },
                rpcUrls: ['https://polygon-rpc.com/'],
              },
            ],
          });
        }
      }
    }
  };

  // check the connected chainId
  useEffect(() => {
    console.log('chainId', chainId);
    if (chainId) {
      setNetworkList((data) => {
        let newData = data.map((item) => {
          item.checked = false;
          return item;
        });
        const chainIdx = networkList.findIndex((item) => item.id == chainId);
        console.log('chainId index ', chainIdx);
        newData[chainIdx].checked = true;
        return newData;
      });
    }
  }, [chainId]);

  // // reload the page when chainId change
  // useEffect(() => {
  //   if (chainId)
  //     document.location.reload()
  // }, [chainId])

  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on('chainChanged', () => {
  //       document.location.reload()
  //     })
  //   }
  // }, [])
  console.log('chainid ', chainId, ' account ', account);

  const shortenAddr = (addr) => {
    return `${addr.substring(0, 5)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <Layout.Header className={styles.header}>
      <Row justify="space-between" align="middle">
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <span className={styles.logoText}>Keep</span>
          <img src={Logo} style={{ width: '2.2em' }} />
        </Col>
        <Col style={{ flex: '1' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{
              lineHeight: '64px',
              marginLeft: '24px',
              transform: 'translateY(-1px)',
            }}
          >
            <Menu.Item key="1" onClick={() => history.push('/')}>
              Market
            </Menu.Item>

            <Menu.Item key="2" onClick={() => history.push('/Margin')}>
              Margin
            </Menu.Item>
          </Menu>
        </Col>
        <div
          className={styles.connect}
          onClick={() => setVisibleMetaMask(true)}
        >
          {!active ? 'Connect Wallet' : shortenAddr(account)}
        </div>
      </Row>
      {/* <Row>Test</Row> */}
      <KpModal
        width={420}
        visible={visibleMetaMask}
        onCancel={onhandCancel}
        bodyStyle={{
          padding: '21px',
          background: '#1b1d23',
          borderRadius: ' 5px',
        }}
      >
        <div className={styles.witem}>
          {active && (
            <Row>
              <Col span={24}>
                <div
                  className={styles.tokenBox}
                  onClick={() => {
                    deactivate();
                    onhandCancel();
                  }}
                >
                  Disconnect
                </div>
              </Col>
            </Row>
          )}
          <div className={styles.title}>1. Select a Network</div>
          <Row>
            {networkList.map((item, index) => {
              return (
                <Col span={12}>
                  <div
                    onClick={() => {
                      setNetworkList((data) => {
                        let newData = data.map((item) => {
                          item.checked = false;
                          return item;
                        });
                        newData[index].checked = true;
                        return newData;
                      });
                      switchChain(item.id);
                    }}
                    className={`${styles.tokenBox} ${
                      item.checked && styles.tokenChecked
                    }`}
                  >
                    <img src={item.img} />
                    {item.name}
                    <CheckCircleOutlined className={styles.checked} />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
        <div className={styles.witem} style={{ marginTop: '20px' }}>
          <div className={styles.title}>2. Select a Wallet</div>
          <Row>
            <Col span={12}>
              <div
                className={styles.tokenBox}
                onClick={() => {
                  activate(injected);
                  onhandCancel();
                }}
              >
                <IconFont
                  style={{ fontSize: '20px', marginRight: '10px' }}
                  type="Metamask"
                />
                Metamask
              </div>
            </Col>
            <Col span={12}>
              <div
                className={styles.tokenBox}
                onClick={() => {
                  activate(walletconnect);
                  onhandCancel();
                }}
              >
                <IconFont
                  style={{ fontSize: '20px', marginRight: '10px' }}
                  type="WalletConnect"
                />
                Wallet Connect
              </div>
            </Col>
          </Row>
        </div>
      </KpModal>
    </Layout.Header>
  );
};
export default Header;
