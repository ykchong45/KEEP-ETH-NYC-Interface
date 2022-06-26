import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { FortmaticConnector } from '@web3-react/fortmatic-connector';
// import { PortisConnector } from '@web3-react/portis-connector';
// import { TorusConnector } from '@web3-react/torus-connector';
// import { LedgerConnector } from '@web3-react/ledger-connector';
// import { TrezorConnector } from '@web3-react/trezor-connector';
// import { BscConnector } from '@binance-chain/bsc-connector';

// import { FortmaticConnector_test } from './fortmaticToBinance';
// import { PortisConnector_test } from './portisToBinance';
// import { NaboxConnector } from './naboxWallet';

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  4: 'https://rinkeby.infura.io/v3/1e70bbd1ae254ca4a7d583bc92a067a2',
  56: 'https://bsc-dataseed1.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  137: 'https://polygon-rpc.com',

  69: 'https://kovan.optimism.io/',
  80001: 'https://rpc-mumbai.maticvigil.com/',
  1337: 'http://localhost:8545/',
};
const POLLING_INTERVAL = 12000;

// 连接钱包时支持的货币id
const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 137, 42161, 69, 80001, 1337],
  //supportedChainIds: [56, 97, 137, 80001],
  // supportedChainIds: [56, 97],
});

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS['1'],
    4: RPC_URLS['4'],
    56: RPC_URLS['56'],
    97: RPC_URLS['97'],
    137: RPC_URLS['137'],

    69: RPC_URLS['69'],
    80001: RPC_URLS['80001'],
    1337: RPC_URLS['1337'],
  },
  //rpc: { 1: RPC_URLS['1']},
  bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  qrcode: true,
});

export { injected, walletconnect };
