import KpToken from '@/components/KpToken';
import usePriceFeed from '../Covalent';
import styles from './index.less';

const MarginDashboard = () => {
  const latestPrices = usePriceFeed();

  const positions = [
    {
      token: 'ETH',
      side: 'Long',
      size: '1000',
      pnl: '100',
      entryPrice: '1000',
      leverage: '5',
      liquidationPrice: '900',
    },
  ];
  positions.forEach(
    (position) => (position.markPrice = latestPrices[position.token] || 0),
  );

  return (
    <>
      <hr />
      <div className={styles.boxItem}>
        <div>
          <p className={styles.small}>Position</p>
          <p className={styles.small}>Side</p>
        </div>
        <div>
          <p className={styles.small}>Size</p>
          <p className={styles.small}>PnL</p>
        </div>
        <div>
          <p className={styles.small}>Entry Price</p>
          <p className={styles.small}>Leverage</p>
        </div>

        <div>
          <p className={styles.small}>Mark Price</p>
          <p className={styles.small}>Liquidation Price</p>
        </div>
      </div>
      {positions.map((position) => (
        <div className={`${styles.boxItem} ${styles.light}`}>
          <div>
            <p className={styles.title}>
              {/* <KpToken icon="/eth.svg" name="ETH" price="$1839.98" /> */}
              <p className={styles.title}>{position.token}</p>
              <p className={styles.small}>{position.side}</p>
            </p>
          </div>
          <div>
            <p className={styles.title}>{position.size}</p>
            <p className={styles.small}>{position.pnl}</p>
          </div>
          <div>
            <p className={styles.title}>${position.entryPrice}</p>
            <p className={styles.small}>{position.leverage}x</p>
          </div>
          <div>
            <p className={styles.title}>${position.markPrice}</p>
            <p className={styles.small}>${position.liquidationPrice}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MarginDashboard;
