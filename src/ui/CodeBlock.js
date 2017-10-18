import React from 'react';
import {EditorBlock, EditorState} from 'draft-js'

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
  }

  componentDidMount () {
    // this._popoverEle = document.querySelector('div.editable-prismSupportedLanguages');
    this._bindOrRmoveMouseOver(true);
  }

  componentWillUnmount() {
    this._bindOrRmoveMouseOver(false)
  }

  render() {
    return (
      <EditorBlock
        key='editor-block-editor'
        {...this.props}
      />
    );

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

    const { block, blockProps } = this.props
    const { topOffset, leftOffset, setSupportedLang, getEditorState, onChange } = blockProps

    const currTarget = e.currentTarget;
    let width = currTarget.offsetWidth;
    // let {top, left} = this._getPoint(e.currentTarget)
    let clientRect = currTarget.getBoundingClientRect();

    let left = clientRect.left + clientRect.width + leftOffset;
    let top = clientRect.top + topOffset;

    setSupportedLang({
      position: {
        left: left,
        top: top,
      },
      block: block,
    })
  }

  _hideLanguages = (e) => {
    const toElem = e.toElement || e.relatedTarget;
    if (toElem && toElem.tagName.toLowerCase() === 'input') {
      return;
    }
    const { block, blockProps } = this.props
    const { setSupportedLang } = blockProps
    // const data = block.getData();

    this._hideLanguagesTimeout = setTimeout(() => {
      setSupportedLang({
        position: {
          left: -1180,
          top: -999
        }
      })
    }, 10)
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

};

