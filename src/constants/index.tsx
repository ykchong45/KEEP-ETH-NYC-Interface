// available networks
const networks = [
  {
    name: 'Polygon',
    img: '/polygon.svg',
    id: 80001,
    checked: false,
  },
  {
    name: 'Optimism',
    img: '/optimism.png',
    id: 69,
    checked: false,
  },
];

const defaultChainId = 80001;

export const getNetworks = () => networks;
export const getDefaultNetwork = () =>
  networks.find((net) => net.id == defaultChainId);

// lending pools
export const pools = {
  1: 'Main Pool',
  2: 'MATIC Pool',
};
export const getPoolNames = (id: Number) => pools[id];

// tokenlist
export const tokenListPolygon = [
  // {
  //   key: '1',
  //   name: 'BTC',
  //   pools: [1],
  //   icon: '/btc.svg',
  // },
  {
    key: '2',
    name: 'MATIC',
    pools: [1, 2],
    icon: '/matic.svg',
  },
  {
    key: '3',
    name: 'ETH',
    icon: '/eth.svg',
    pools: [1, 2],
  },
  {
    key: '4',
    name: 'USDC',
    icon: '/usdc.svg',
    pools: [1],
  },
];

export const tokenListOp = [
  // {
  //   key: '1',
  //   name: 'BTC',
  //   pools: [1],
  //   icon: '/btc.svg',
  // },
  // {
  //   key: '2',
  //   name: 'OP',
  //   pools: [1, 2],
  //   icon: '/optimism.png',
  // },
  {
    key: '3',
    name: 'ETH',
    icon: '/eth.svg',
    pools: [1, 2],
  },
  {
    key: '4',
    name: 'USDC',
    icon: '/usdc.svg',
    pools: [1],
  },
];

export const getTokenList = (chainId: Number | undefined) =>
  ({
    69: tokenListOp,
    80001: tokenListPolygon,
  }[chainId || defaultChainId]);
