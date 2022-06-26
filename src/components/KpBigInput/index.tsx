import { Row, Col } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import styles from './index.less';

const KpBigInput = (props: any) => {
  const { name, price, number, placeholder, inputVal, setInputVal, ...rest } =
    props;

  return (
    <div className={styles.kb} {...rest}>
      <div className={styles.areaInput}>
        <input
          placeholder={placeholder}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </div>
      <div className={styles.price}>$0.0</div>
    </div>
  );
};
export default KpBigInput;
