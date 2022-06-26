import { useEffect, useMemo, useState } from 'react';
import { readState } from '@/apis';
import KpToken from '@/components/KpToken';
import { useWeb3React } from '@web3-react/core';
import usePriceFeed from '../Covalent';
import styles from './index.less';

import DataProvider from '@/abis/DataProvider.json';
import { getPoolAddr, getTokenList } from '@/constants';
import { getContractAddr } from '@/constants/addresses';
import { withConfirmation, getContract } from '@/apis';
import { toFloat } from '@/utils';

const MarketDashboard = () => {
  const latestPrices = usePriceFeed();

  // const positions = [
  //   {
  //     token: 'ETH',
  //     action: 'Deposit',
  //     size: '1000',
  //   },
  // ];

  const { active, library, chainId, account } = useWeb3React();
  const [positions, setPositions] = useState([]);
  const updatePositionTable = async () => {
    if (!library) return;
    // console.log("marketdashboard, args: ", library, DataProvider.abi, getPoolAddr("Main Pool"), "getTraderPositions")
    // let reader = getContract(getPoolAddr("Main Pool"), LendingPool.abi, library, account)
    // let res = await reader["getTraderPositions"]();
    const tokenList = getTokenList(chainId);
    const userTokenData = [];
    for (let i = 0; i < tokenList.length; i++) {
      const token = tokenList[i];
      const decimals = token.decimals;
      const res = await readState(
        library,
        DataProvider.abi,
        getContractAddr('dataProvider'),
        'getUserReserveData',
        [0, token.address, account],
      );

      const supply = toFloat(res[0], decimals);
      const borrow = toFloat(res[1], decimals);
      if (supply != '0.0') {
        const data = {
          token: token.name,
          type: 'supply',
          value: supply,
        };
        userTokenData.push(data);
      }
      if (borrow != '0.0') {
        const data = {
          token: token.name,
          type: 'borrow',
          value: borrow,
        };
        userTokenData.push(data);
      }

      console.log('kpmarketdashboard: ', res, toFloat(res[0]));
    }
    console.log('kpmarketdashboard, userTokendata', userTokenData);
    setPositions(userTokenData);
  };
  useEffect(() => {
    updatePositionTable();
  }, [library]);

  useEffect(() => {
    if (!library) return;
    library.on('block', () => {
      updatePositionTable();
    });

    return () => {
      library.removeAllListeners('block');
    };
  }, [library]);
  console.log('marketDashboard, positions: ', positions);

  return (
    <>
      {active ? (
        <>
          <div style={{ marginTop: '1.5rem' }}>Dashboard</div>
          <div className={styles.boxItem}>
            <div>
              <p className={styles.small}>Token</p>
              <p className={styles.small}>Action</p>
            </div>
            <div>
              <p className={styles.small}>Size</p>
            </div>
          </div>
          <hr />
          {positions.map((position) => (
            <div className={`${styles.boxItem} ${styles.light}`}>
              <div>
                <p className={styles.title}>
                  <p className={styles.title}>{position.token}</p>
                  <p className={styles.small}>{position.type}</p>
                </p>
              </div>
              <div>
                <p className={styles.title}>{position.value}</p>
              </div>
            </div>
          ))}
          {/* <div onClick={showPositinos}>show position</div> */}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default MarketDashboard;
