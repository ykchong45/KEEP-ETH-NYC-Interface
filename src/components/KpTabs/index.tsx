import { useState } from 'react';
import styles from './index.less';

const marketTabs = [
  {
    name: 'Supply',
    checked: true,
  },
  {
    name: 'Borrow',
    checked: false,
  },
  {
    name: 'Withdraw',
    checked: false,
  },
  {
    name: 'Repay',
    checked: false,
  },
];

const marginTabs = [
  {
    name: 'Long',
    checked: true,
  },
  {
    name: 'Short',
    checked: false,
  },
];

const tabsSelector = (tabType) =>
  ({
    margin: marginTabs,
    market: marketTabs,
  }[tabType]);

const KpTabs = (props) => {
  const [tabs, setTabs] = useState(tabsSelector(props.tabType));
  console.log(tabs);
  const { setSelectedTab } = props;
  const onChoose = (index: any) => {
    setTabs((data) => {
      let newData = data.map((item) => {
        item.checked = false;
        return item;
      });
      newData[index].checked = true;
      setSelectedTab(newData[index].name);
      return newData;
    });
    props.onChange(index);
  };
  return (
    <div className={styles.tabs}>
      {tabs.map((item, index) => (
        <div
          onClick={() => onChoose(index)}
          className={(item.checked && styles.activity) || {}}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
export default KpTabs;
