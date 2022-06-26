import { useLayoutEffect, useState } from 'react';
import { history } from 'umi';
import Market from './Market';
import Card from './Card';
import Logo from '@/assets/logo.png';
import { ReactComponent as Github } from '@/assets/github.svg';
import { ReactComponent as Twitter } from '@/assets/twitter.svg';
import { ReactComponent as Discord } from '@/assets/discord.svg';
import { ReactComponent as Medium } from '@/assets/medium.svg';
import { ReactComponent as Telegram } from '@/assets/telegram.svg';
import { ReactComponent as Youtube } from '@/assets/youtube.svg';
import { ReactComponent as Paper } from '@/assets/paper.svg';
import styles from './index.less';

import bg from './bg.png';
const IndexPage = () => {
  return (
    <div style={{ margin: '-150px', overflow: 'hidden' }}>
      <img
        src={bg}
        style={{
          minHeight: '100%',
          minWidth: '100%',
          maxHeight: 'calc(100vw - 145px)',
        }}
      />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          The Most Capital-Efficient Lending Protocol
        </h1>
      </div>
    </div>
  );
};

export default IndexPage;
