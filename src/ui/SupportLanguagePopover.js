import React from 'react'
import ReactDOM from 'react-dom'
import autobind from 'class-autobind';

import DefaultToolbarConfig from '../lib/EditorToolbarConfig';
import Dropdown from './Dropdown'

type Props = {
  position: Object,
  selectedKey: string,
  onChange: func,
  onMouseOut: func,
};

class SupportLanguagePopover extends React.PureComponent {

  props: Props;

  constructor(...args) {
    super(...args);
    autobind(this);
  }

  componentDidMount() {

    this.supportedLanguagesModal = document.createElement('div');
    this.supportedLanguagesModal.className = 'editable-prismSupportedLanguages-wrapper'
    // this.supportedLanguagesModal.style.position = 'relative'
    // this.supportedLanguagesModal.style.zIndex = '9999'
    document.body.appendChild(this.supportedLanguagesModal);

    this.renderContent(this.props);
  }

  componentWillReceiveProps(newProps){
    this.renderContent(newProps);
  }

  componentWillUnmount(){
    //act like this shit was never here ever
    ReactDOM.unmountComponentAtNode(this.supportedLanguagesModal);
    document.body.removeChild(this.supportedLanguagesModal);
  }

  renderContent(props) {
    let choices = new Map(
      (DefaultToolbarConfig.PRISM_SUPPORTED_LANGUAGES || []).map((lang) => [lang.value, {label: lang.label}])
    );
    let {selectedKey, onChange, position} = props;

    const styles = {
      position: 'fixed',
      zIndex: '1000',
      top: position.top + 'px',
      left: position.left + 'px',
      backgroundColor: '#fff'
    };

    ReactDOM.render(
      <div
        className='editable-prismSupportedLanguages'
        style={styles}
      >
        <Dropdown
          choices={choices}
          selectedKey={selectedKey ? selectedKey : 'none'}
          onChange={onChange}
        />
      </div>,
      this.supportedLanguagesModal
    );
  };

  render () {
    return null;
  };
};

export default SupportLanguagePopover