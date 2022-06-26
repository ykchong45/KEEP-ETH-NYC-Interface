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
  {
    name: 'Polygon',
    img: '/polygon.svg',
    id: 1337,
    checked: false,
  },
];

const defaultChainId = 80001;

export const getNetworks = () => networks;
export const getDefaultNetwork = () =>
  networks.find((net) => net.id == defaultChainId);

// lending pools
export const pools = {
  'Main Pool': {
    id: 1,
    address: '0x9E545E3C0baAB3E08CdfD552C960A1050f373042',
  },
  'MATIC Pool': {
    id: 2,
    address: '0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9',
  },
};

export const getPoolAddr = (key) => pools[key].address;

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
    address: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f',
    decimals: 18,
    pools: ['Main Pool', 'MATIC Pool'],
    icon: '/matic.svg',
  },
  {
    key: '3',
    name: 'ETH',
    address: '0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44',
    decimals: 18,
    icon: '/eth.svg',
    pools: ['Main Pool', 'MATIC Pool'],
  },
  {
    key: '4',
    name: 'USDC',
    address: '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1',
    decimals: 6,
    icon: '/usdc.svg',
    pools: ['Main Pool'],
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
    pools: ['Main Pool'],
  },
  {
    key: '4',
    name: 'USDC',
    icon: '/usdc.svg',
    pools: ['Main Pool'],
  },
];

export const getTokenList = (chainId: Number | undefined) =>
  ({
    69: tokenListOp,
    80001: tokenListPolygon,
    1337: tokenListPolygon,
  }[chainId || defaultChainId]);

export const getToken = (chainId, symbol) => {
  const tokenList = getTokenList(chainId);
  return tokenList.find((token) => token.name == symbol);
};
