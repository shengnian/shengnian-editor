import React from 'react';
import {getVisibleSelectionRect, EditorState} from 'draft-js'
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

export default class CodeBlockRender extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
      position: {
        left: '-1180px',
        top: '-999px'
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
    // const checked = (data.has('syntax') && data.get('syntax') === true);
    const newData = data.set('syntax', value);

    onChange(updateDataOfBlock(getEditorState(), block, newData));


  };

  render() {
    return (
      <div
        onMouseOver={(e) => {
          // const offsetLeft = e.currentTarget.offsetWidth
          // const offsetTop = e.currentTarget.offsetHeight
          const targetRect = getVisibleSelectionRect(window)
          this.setState({
            position: {
              // left: offsetLeft !== 0 ? (offsetLeft) : -1180,
              left: targetRect ? targetRect.left : -1180,
              top: targetRect ? targetRect.top + 30 : -999
            }
          })
        }}
      >
        {this.props.children}
        <SupportLanguagePopover
          position={this.state.position}
          selectedKey={this.state.selectedKey}
          onChange={this._onChangePrismLang}
        />
      </div>
    );

  };
};