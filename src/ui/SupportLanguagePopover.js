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
  mounted = false;

  constructor(...args) {
    super(...args);
    autobind(this);
  }

  componentDidMount() {
    console.log(this.mounted)
    if(!this.mounted) {
      this.supportedLanguagesModal = document.createElement('div');
      this.supportedLanguagesModal.className = 'editable-prismSupportedLanguages-wrapper'
      // this.supportedLanguagesModal.style.position = 'relative'
      // this.supportedLanguagesModal.style.zIndex = '9999'
      document.body.appendChild(this.supportedLanguagesModal);

      this.renderContent(this.props);
      this.mounted = true;
    }
  }

  componentWillReceiveProps(newProps){
    this.renderContent(newProps);
  }

  componentWillUnmount(){
    //act like this shit was never here ever
    ReactDOM.unmountComponentAtNode(this.supportedLanguagesModal);
    document.body.removeChild(this.supportedLanguagesModal);
    this.mounted = false;
  }

  renderContent(props) {
    let choices = new Map(
      (DefaultToolbarConfig.PRISM_SUPPORTED_LANGUAGES || []).map((lang) => [lang.value, {label: lang.label}])
    );
    let {position, selectedKey, onChange } = props;

    const styles = {
      position: 'fixed',
      zIndex: '1000',
      top: position.top,
      left: position.left,
      backgroundColor: '#fff'
    };

    if(!this.mounted) {
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
    }
  };

  render () {
    return null;
  };
};

export default SupportLanguagePopover