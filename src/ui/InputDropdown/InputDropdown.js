import React from 'react';
import cx from 'classnames'

import Selection from './Selection';

import styles from './InputDropdown.css';
import iconStyles from '../IconButton.css';

type Props = {
  name: string;
  items: Array;
  activeIndex: Number;
  onInputChange: (inputValue: string) => any;
  onItemSelected: Function,
}

class InputDropdown extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isActive: false,
      inputValue: '',
      activeIndex: -1,
    };
    this.itemWasPressed = false;
  }

  onItemClick = (key: string) => {
    const clickedItem = this.props.items.find(item => item.value === key);
    this.selectItem(clickedItem);
  }

  onFocus = () => {
    this.setState({
      isActive: true,
      activeIndex: -1,
    });
  }

  onBlur = () => {
    if (this.itemWasPressed) {
      // Blur event is triggered before click event, which means a click on a dropdown item wont be triggered if we hide the dropdown list here.
      this.itemWasPressed = false;

      return;
    }

    this.setState({ isActive: false });
  }

  onKeyDown = (event) => {
    let nextIndex = this.state.activeIndex;
    switch (event.keyCode) {
      case 13:
        // enter
        this.selectCurrentActive();
        break;
      case 38:
        // up
        nextIndex = Math.max(this.state.activeIndex - 1, 0);
        break;
      case 40:
        // down
        nextIndex = Math.min(this.state.activeIndex + 1, this.props.items.length - 1);
        break;
      default:
        break;
    }

    if (nextIndex !== this.state.activeIndex) {
      this.setState({ activeIndex: nextIndex });
    }
  }

  onInputChange = (event) => {
    const value = event.currentTarget.value;
    this.setState({ inputValue: value });

    if (this.props.onInputChange) {
      this.props.onInputChange(value);
    }
  }

  onItemMouseDown = () => {
    this.itemWasPressed = true;
  }

  onItemMouseEnter = (value) => {
    const index = this.props.items.findIndex(item => item.value === value);
    this.setState({ activeIndex: index });
  }

  selectCurrentActive = () => {
    if (this.state.activeIndex > -1) {
      this.selectItem(this.props.items[this.state.activeIndex]);
    }
  }

  selectItem = (item) => {
    this.setState({
      inputValue: item.label,
      isActive: false,
    });

    this._inputDropdown.blur();

    if (this.props.onItemSelected) {
      this.props.onItemSelected(item);
    }
  }

  // componentWillReceiveProps(newProps) {
    // if(newProps.displayValue) {
    //   this.setState({
    //     inputValue: newProps.displayValue
    //   })
    // }
  // }

  render() {

    const iconClassName = cx({
      [iconStyles.icon] : true,
      [iconStyles.root]: true,
    });

    return (
      <div className={styles.root}>
        <input
          type='text'
          name={this.props.name}
          value={this.state.inputValue}
          onChange={this.onInputChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          ref={(dropdownInput) => this._inputDropdown = dropdownInput}
          placeholder={this.props.placeholder}
        />
        {/*<div className={iconClassName}>*/}
          {/*<i className={iconStyles['icon-chevron-down']} />*/}
        {/*</div>*/}
        <Selection
          visible={this.state.isActive}
          items={this.props.items}
          activeIndex={this.state.activeIndex}
          onItemClick={this.onItemClick}
          onItemMouseDown={this.onItemMouseDown}
          onItemMouseEnter={this.onItemMouseEnter}
        />
      </div>
    );
  }
}

export default InputDropdown;
