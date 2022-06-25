import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Layout } from 'antd';

import styles from './BasicLayout.less';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const { Content } = Layout;
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}
const BasicLayout = (props) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content className={styles.main} style={{ padding: '0 150px' }}>
          {props.children}
        </Content>
        <Footer />
      </Layout>
    </Web3ReactProvider>
  );
};
export default BasicLayout;
