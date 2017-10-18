import React from 'react';

import SelectionItem from './SelectionItem';
import styles from './Selection.css'

type Props = {
  activeIndex: Number;
  items: Array;
  visible: boolean;
  onItemClick: (selectedKey: string) => any;
  onItemMouseDown: () => any;
  onItemMouseEnter: (key: string) => any;
}

const Selection = (props: Props) => {
  const listStyle = {
    display: props.visible ? 'block' : 'none',
  };

  const listItems = props.items.map(
    (item, index) => <SelectionItem
      key={item.value}
      selectedKey={item.value}
      label={item.label}
      isActive={index === props.activeIndex}
      onItemClick={props.onItemClick}
      onItemMouseDown={props.onItemMouseDown}
      onItemMouseEnter={props.onItemMouseEnter}
    />
  );

  return (
    <ul className={styles.list} style={listStyle}>
      {listItems}
    </ul>
  );
};


export default Selection;