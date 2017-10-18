import React from 'react';
import cx from 'classnames';

import styles from './SelectionItem.css'

type Props = {
  label: string;
  selectedKey: ?string;
  isActive?: boolean;
  onItemClick: (selectedKey: string) => any;
  onItemMouseDown: () => any;
  onItemMouseEnter: (key: string) => any;
};

class SelectionItem extends React.Component {

  props: Props;

  render() {
    const className = cx(styles.item, {
      [styles.isActive]: this.props.isActive
    })
    return (
      <li
        onClick={this.onClick}
        className={className}
        onMouseDown={this.props.onItemMouseDown}
        onMouseEnter={this.onMouseEnter}>
        {this.props.label}
      </li>
    );
  }

  onClick = () => {
    if (this.props.onItemClick) {
      this.props.onItemClick(this.props.selectedKey);
    }
  }

  onMouseEnter = () => {
    if (this.props.onItemMouseEnter) {
      this.props.onItemMouseEnter(this.props.selectedKey);
    }
  }
}

export default SelectionItem;
