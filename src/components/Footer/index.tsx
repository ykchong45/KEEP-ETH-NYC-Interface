import { Layout } from 'antd';
import { ReactComponent as Github } from '@/assets/github.svg';
import { ReactComponent as Twitter } from '@/assets/twitter.svg';
import { ReactComponent as Discord } from '@/assets/discord.svg';
import { ReactComponent as Medium } from '@/assets/medium.svg';
import { ReactComponent as Telegram } from '@/assets/telegram.svg';
import { ReactComponent as Youtube } from '@/assets/youtube.svg';
import { ReactComponent as Paper } from '@/assets/paper.svg';
import styles from './index.less';
const Footer = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <div className={styles.connect}>
        <a href="#" title="WhitePaper">
          <Paper />
        </a>
        <a href="#" title="Github">
          <Github />
        </a>
        <a href="#" title="Twitter">
          <Twitter />
        </a>
        <a href="#" title="Telegram">
          <Telegram />
        </a>
        <a href="#" title="Discord">
          <Discord />
        </a>
        <a href="#" title="Medium">
          <Medium />
        </a>
        <a href="#" title="Youtube">
          <Youtube />
        </a>
      </div>
    </Layout.Footer>
  );
};
export default Footer;
