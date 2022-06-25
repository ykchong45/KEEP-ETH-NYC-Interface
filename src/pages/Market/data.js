import { Table } from 'antd';
import KpToken from '@/components/KpToken';
import KpTotal from '@/components/KpTotal';
export const columns = [
  {
    title: 'Asset',
    width: '16%',
    dataIndex: 'icon',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    sorter: (a, b) => a.name.length - b.name.length,
    showSorterTooltip: false,
    render: (text, item) => (
      <KpToken icon={text} name={item.name} price="$28903.2" />
    ),
  },
  {
    title: 'LTV',
    width: '16%',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
    showSorterTooltip: false,
    render: (text) => `${text}%`,
  },
  {
    title: 'Total Supply',
    width: '16%',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text, item) => (
      <KpTotal number="1,234" name={item.name} price="$28903.2" />
    ),
  },
  {
    title: 'Supply APR',
    width: '16%',
    dataIndex: 'age',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text) => `${text / 10}%`,
  },
  {
    title: 'Total Borrow',
    width: '16%',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text, item) => (
      <KpTotal number="1,234" name={item.name} price="$28903.2" />
    ),
  },
  {
    width: '19%',
    title: 'Borrow APR',
    dataIndex: 'age',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text) => `${text / 10}%`,
  },
  Table.EXPAND_COLUMN,
];
export const childColumns = [
  {
    title: 'Asset name',
    dataIndex: 'name',
    width: '16%',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // sorter: (a, b) => a.name.length - b.name.length,
    render: (text, item) => (
      <>
        0{item.key}&nbsp;&nbsp;&nbsp;&nbsp;{text}
      </>
    ),
  },
  {
    title: 'LTV',
    dataIndex: 'age',
    width: '16%',

    defaultSortOrder: 'descend',
    render: (text) => `${text}%`,
  },
  {
    title: 'Total supply',
    width: '16%',
    dataIndex: 'address',
    render: (text, item) => <KpTotal number="1,234" price="$28903.2" />,
  },
  {
    title: 'Supply APR',
    width: '16%',
    dataIndex: 'age',
    render: (text) => `${text / 10}%`,
  },
  {
    title: 'Total borrow',
    width: '16%',
    dataIndex: 'address',
    render: (text, item) => <KpTotal number="1,234" price="$28903.2" />,
  },
  {
    title: 'Borrow APR',
    width: '19%',
    dataIndex: 'age',
    render: (text) => `${text / 10}%`,
  },
  {
    title: <>&ngsp;&ngsp;&ngsp;&ngsp;</>,
    dataIndex: 'age',

    // sorter: (a, b) => a.address.length - b.address.length,
    render: (text) => (
      <span style={{ opacity: 0 }}>
        <button
          type="button"
          class="ant-table-row-expand-icon ant-table-row-expand-icon-expanded"
          aria-label="Collapse row"
        ></button>
      </span>
    ),
  },
];
export const data = [
  {
    key: '1',
    name: 'BTC',
    age: 32,
    icon: '/btc.svg',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'BNB',
    age: 42,
    icon: '/bnb.svg',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'DAI',
    icon: '/dai.svg',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'ETH',
    icon: '/eth.svg',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'USDA',
    icon: '/usda.svg',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '6',
    name: 'USDC',
    icon: '/usdc.svg',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '7',
    name: 'USDH',
    icon: '/usdh.svg',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '8',
    name: 'USDT',
    age: 32,
    icon: '/usdt.svg',
    address: 'London No. 2 Lake Park',
  },
  {
    key: '9',
    name: 'FOX',
    age: 32,
    icon: '/fox.svg',
    address: 'London No. 2 Lake Park',
  },
  {
    key: '10',
    name: 'BUSD',
    age: 32,
    icon: '/busd.svg',
    address: 'London No. 2 Lake Park',
  },
  {
    key: '11',
    name: 'POLYGON',
    age: 32,
    icon: '/polygon.svg',
    address: 'London No. 2 Lake Park',
  },
];
export const childData = [
  {
    key: '1',
    name: 'MainPool',
    age: 32,
    icon: '/btc.svg',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'FoxPool',
    age: 42,
    icon: '/bnb.svg',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'OtherPool',
    icon: '/dai.svg',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

export const columnsPool = [
  {
    title: 'Asset',
    width: '16%',
    dataIndex: 'key',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    sorter: (a, b) => a.key - b.key,
    showSorterTooltip: false,
    render: (text, item) => (
      <span>
        0{item.key} {item.name}
      </span>
    ),
  },
  {
    title: 'LTV',
    width: '16%',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
    showSorterTooltip: false,
    render: (text) => `${text}%`,
  },
  {
    title: 'Total Supply',
    width: '16%',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: () => <KpTotal number="1,234" name="BTC" price="$28903.2" />,
  },
  {
    title: 'Supply APR',
    width: '16%',
    dataIndex: 'age',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text) => `${text / 10}%`,
  },
  {
    title: 'Total Borrow',
    width: '16%',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: () => <KpTotal number="1,234" name="BTC" price="$28903.2" />,
  },
  {
    width: '19%',
    title: 'Borrow APR',
    dataIndex: 'age',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text) => `${text / 10}%`,
  },
  Table.EXPAND_COLUMN,
];
export const dataPool = [
  {
    key: '1',
    name: 'MainPool',
    age: 52,
    icon: '/btc.svg',
    address: 'New York No. 1 Lake Park',
    childData: [
      {
        key: '11',
        name: 'BTC',
        age: 32,
        icon: '/btc.svg',
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '12',
        name: 'BNB',
        age: 42,
        icon: '/bnb.svg',
        address: 'London No. 1 Lake Park',
      },
      {
        key: '13',
        name: 'DAI',
        icon: '/dai.svg',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'ETH',
        icon: '/eth.svg',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '5',
        name: 'USDA',
        icon: '/usda.svg',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '6',
        name: 'USDC',
        icon: '/usdc.svg',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '7',
        name: 'USDH',
        icon: '/usdh.svg',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '8',
        name: 'USDT',
        age: 32,
        icon: '/usdt.svg',
        address: 'London No. 2 Lake Park',
      },
      {
        key: '9',
        name: 'FOX',
        age: 32,
        icon: '/fox.svg',
        address: 'London No. 2 Lake Park',
      },
    ],
  },
  {
    key: '2',
    name: 'FoxPool',
    age: 42,
    icon: '/bnb.svg',
    address: 'London No. 1 Lake Park',
    childData: [
      {
        key: '6',
        name: 'USDC',
        icon: '/usdc.svg',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '7',
        name: 'USDH',
        icon: '/usdh.svg',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '8',
        name: 'USDT',
        age: 32,
        icon: '/usdt.svg',
        address: 'London No. 2 Lake Park',
      },
      {
        key: '9',
        name: 'FOX',
        age: 32,
        icon: '/fox.svg',
        address: 'London No. 2 Lake Park',
      },
    ],
  },
  {
    key: '3',
    name: 'OtherPool',
    age: 42,
    icon: '/bnb.svg',
    address: 'London No. 1 Lake Park',
    childData: [
      {
        key: '7',
        name: 'USDH',
        icon: '/usdh.svg',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '8',
        name: 'USDT',
        age: 32,
        icon: '/usdt.svg',
        address: 'London No. 2 Lake Park',
      },
      {
        key: '9',
        name: 'FOX',
        age: 32,
        icon: '/fox.svg',
        address: 'London No. 2 Lake Park',
      },
    ],
  },
];
export const childColumnsPool = [
  {
    title: 'Asset',
    width: '16%',
    dataIndex: 'icon',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    sorter: (a, b) => a.name.length - b.name.length,
    showSorterTooltip: false,
    render: (text, item) => (
      <KpToken icon={text} name={item.name} price="$28903.2" />
    ),
  },
  {
    title: 'LTV',
    width: '16%',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
    showSorterTooltip: false,
    render: (text) => `${text}%`,
  },
  {
    title: 'Total Supply',
    width: '16%',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text, item) => (
      <KpTotal number="1,234" name={item.name} price="$28903.2" />
    ),
  },
  {
    title: 'Supply APR',
    width: '16%',
    dataIndex: 'age',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text) => `${text / 10}%`,
  },
  {
    title: 'Total Borrow',
    width: '16%',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text, item) => (
      <KpTotal number="1,234" name={item.name} price="$28903.2" />
    ),
  },
  {
    width: '19%',
    title: 'Borrow APR',
    dataIndex: 'age',
    sorter: (a, b) => a.address.length - b.address.length,
    showSorterTooltip: false,
    render: (text) => `${text / 10}%`,
  },
  {
    title: <>&ngsp;&ngsp;&ngsp;&ngsp;</>,
    dataIndex: 'age',

    // sorter: (a, b) => a.address.length - b.address.length,
    render: (text) => (
      <span style={{ opacity: 0 }}>
        <button
          type="button"
          class="ant-table-row-expand-icon ant-table-row-expand-icon-expanded"
          aria-label="Collapse row"
        ></button>
      </span>
    ),
  },
];
export const childDataPool = [
  {
    key: '1',
    name: 'MainPool',
    age: 32,
    icon: '/btc.svg',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'FoxPool',
    age: 42,
    icon: '/bnb.svg',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'OtherPool',
    icon: '/dai.svg',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
