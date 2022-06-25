import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useWeb3React } from '@web3-react/core';
import styles from './index.less';
import { getNetworks, getDefaultNetwork } from '@/constants';
import millify from 'millify';
const menu = (chainId: Number) => {
  const networks = getNetworks();
  const otherNetworks = networks.filter((network) => network.id != chainId);
  console.log('kprpc: ', otherNetworks, chainId);
  return (
    <div className={styles.marker}>
      <ul>
        <div className={styles.title}>
          <p>Select Market</p>
          <hr></hr>
        </div>
        {otherNetworks.map((network) => (
          <li>
            <div className={styles.icon}>
              <img src={network.img} />
            </div>
            <div>{network.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
const KpTotal = (props: any) => {
  const { name, price, number, ...rest } = props;
  let { chainId } = useWeb3React();
  const defaultNetwork = getDefaultNetwork();
  chainId = chainId || defaultNetwork.id;
  const currentNetwork = getNetworks().find((net) => net.id == chainId);
  console.log('kprpc, chainid: ', chainId);
  return (
    <div className={styles.kt} {...rest}>
      <div className={styles.title}>
        <div>
          <img
            style={{ width: '35px', verticalAlign: 'top' }}
            src={currentNetwork.img}
          />
          <span className={styles.rpc}>{currentNetwork.name}</span>
        </div>
      </div>
      <div className={styles.dashboard}>
        {/* <div className={styles.item}>
          <div>
            <div></div>
            <div>
              <span>$5.69M</span>
              <br />
              <span>Total market size</span>
            </div>
          </div>
        </div> */}
        <div className={styles.item}>
          <div>
            <div></div>
            <div>
              <span>${millify(props.totalSupply)}</span>
              <br />
              <span>Total supply</span>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div>
            <div></div>
            <div>
              <span>${millify(props.totalBorrows)}</span>
              <br />
              <span>Total borrows</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KpTotal;
