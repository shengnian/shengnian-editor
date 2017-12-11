/* @flow */

import React, {Component} from 'react';
import IconButton from './IconButton';
import Modal from './Modal';
import autobind from 'class-autobind';

type Props = {
  iconName: string;
  showPopover: boolean,
  onTogglePopover: Function,
  onSubmit: Function;
};

export default class VideoIconButton extends Component {
  props: Props;

  static defaultProps = {
    iconName: 'video-player'
  }

  constructor() {
    super(...arguments);
    autobind(this);

    this.state = {
      isModalActive: false,
      isModalAppendable: true
    };
  }

  activateModal(){
    this.setState({
      isModalActive: true
    });
  }

  deactivateModal(){
    this.setState({
      isModalActive: false
    });
  }

  unmountModal(){
    this.setState({
      isModalActive: false,
      isModalAppendable: false
    });
  }

  render() {
    return (
      <IconButton
        iconName={this.props.iconName}
        onClick={this.activateModal}>
        {this._renderPopover()}
      </IconButton>
    );
  }

  _renderPopover() {
    if (!this.state.isModalAppendable) {
      return null;
    }
    return (
      <Modal isActive={this.state.isModalActive} onClose={this.deactivateModal}>
        <div className='modal-wrapper'>
          <div className='insult'>And he doesn't have that many.....</div>
          <div className='button-row'>
            <button onClick={this.deactivateModal}>Close modal bruh</button>
            <button onClick={this.unmountModal}>Close modal and unmount component bruh</button>
          </div>
        </div>
      </Modal>
    );
  }
}