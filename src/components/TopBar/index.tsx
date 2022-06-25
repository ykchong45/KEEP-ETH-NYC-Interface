import { Space } from 'antd';
import { HomeOutlined, SettingFilled } from '@ant-design/icons';
import { SearchButton } from '@/components/KpToken';
import styles from './index.less';

const TopBar = () => {
  return (
    <div className={styles.warp}>
      <div></div>
      <SearchButton />
      <div>
        <Space>
          <HomeOutlined />
          <SettingFilled />
        </Space>
      </div>
    </div>
  );
};
export default TopBar;
