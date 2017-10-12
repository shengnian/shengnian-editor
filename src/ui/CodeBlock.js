import React from 'react';
import {EditorState, EditorBlock} from 'draft-js'
import SupportLanguagePopover from './SupportLanguagePopover'


const updateDataOfBlock = (editorState, block, newData) => {
  const contentState = editorState.getCurrentContent();
  const newBlock = block.merge({
    data: newData,
  });
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
};

export default class CodeBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {
        left: '-1180px',
        top: '-999px'
      }
    }
  }

  componentDidMount () {
    this._bindOrRmoveMouseOver(true);
  }

  componentWillUnmount() {
    this._bindOrRmoveMouseOver(false)
  }

  render() {
    const data = this.props.block.getData();
    const selectedKey = data.get('selectedKey');

    return [
      <EditorBlock
        key='editor-block-editor'
        {...this.props}
      />,
      <SupportLanguagePopover
        key='lang-popover'
        position={this.state.position}
        selectedKey={selectedKey}
        onChange={this._onChangePrismLang}
        onShow={
          this._showLanguages
        }
        onHide={
          this._hideLanguages
        }
      />
    ];

  };

  _getPoint = (obj) => {
    let t = obj.offsetTop;
    let l = obj.offsetLeft;
    while (obj = obj.offsetParent) {// obj = obj.offsetParent;while (obj != undefined)
      t += obj.offsetTop;
      l += obj.offsetLeft;
    }
    return {
      top: t,
      left: l
    }
  }

  _showLanguages  = (e) => {
    clearTimeout(this._hideLanguagesTimeout)
    const heightOffset = 15;

    const currTarget = e.currentTarget;
    let width = currTarget.offsetWidth;
    let {top, left} = this._getPoint(e.currentTarget)

    // TODO change 215 to selector width.
    this.setState({
      position: {
        left: (left + width - 215),
        top: (top + heightOffset),
      }
    })
  }

  _hideLanguages = (e) => {

    const oElem = e.toElement || e.relatedTarget;
    if (oElem.tagName.toLowerCase() === 'select') {
      return;
    }

    this._hideLanguagesTimeout = setTimeout(() => {
      this.setState({
        position: {
          left: '-1180px',
          top: '-999px'
        }
      })
    }, 350)
  }

  _bindOrRmoveMouseOver = (isBind = true) => {

    let blockKey = this.props.block.getKey();
    let codeBlocks = document.querySelectorAll('pre.public-DraftStyleDefault-pre');
    for (let i = 0, len = codeBlocks.length; i < len; i ++) {
      let dataOffsetKey = codeBlocks[i].getAttribute('data-offset-key');
      // let isDataBlock = codeBlocks[i].getAttribute('data-block');

      if(dataOffsetKey === (blockKey + '-0-0')) {
        if(isBind) {
          codeBlocks[i].addEventListener('mouseenter', this._showLanguages, false)
          codeBlocks[i].addEventListener('mouseleave', this._hideLanguages, false)
        } else {
          codeBlocks[i].removeEventListener('mouseenter', this._showLanguages, false)
          codeBlocks[i].removeEventListener('mouseleave', this._hideLanguages, false)
        }
      }
    }
  }

  _onChangePrismLang = (value) => {
    if (value === 'none') {
      return;
    }
    let {block, blockProps} = this.props;
    // This is the reason we needed a higher-order function for blockRendererFn
    const { onChange, getEditorState } = blockProps;

    const data = block.getData();
    const newData = data.set('syntax', value)
      .set('selectedKey', value)
    ;

    onChange(updateDataOfBlock(getEditorState(), block, newData));
  };


};

