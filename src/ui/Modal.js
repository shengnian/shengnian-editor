/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import styles from './Modal.css';

type Props = {
  isActive?: boolean;
  onClose?: Function;
}

export default class Modal extends React.Component {
  props: Props;

  constructor(...args){
    super(...args);
    this.handleClickInside = this.handleClickInside.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount(){
    //create an element to append
    this.modal = document.createElement('div');
    //append that shit
    document.body.appendChild(this.modal);
    //call the render method to add custom styled div and children contents to appended element
    this.renderModalContent(this.props);
  }
  componentWillReceiveProps(newProps){
    this.renderModalContent(newProps);
  }
  componentWillUnmount() {
    //act like this shit was never here ever
    ReactDOM.unmountComponentAtNode(this.modal);
    document.body.removeChild(this.modal);
  }
  handleClickInside(e) {
    e.stopPropagation();
  }
  handleClickOutside() {
    this.props.onClose();
  }
  renderModalContent(props){
    //put something in the appended shit
    // let cont;

    let className = cx(styles.root, {
      [styles.active] : props.isActive,
    });

    ReactDOM.render(
      <div className={className}>
        <div className={styles.overlay}></div>
        <div className={styles.modal} onClick={this.handleClickOutside}>
          <div className={styles.modalInner} onClick={this.handleClickInside}>
            {this.props.children}
          </div>
        </div>
      </div>,
      this.modal
    );
    // cont = document.getElementById('modal-container');
    // if (props.isActive){
    //   console.log(this.modalDiv)
      // this.modalDiv.classList.add(styles.active);
    // } else {
      // this.modalDiv.classList.remove(styles.active);
    // }
  }
  render(){
    //don't render anything here because we are appending to the body portal style ahhhh yissssss
    return null;
  }
}