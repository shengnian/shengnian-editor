import React from 'react';
import {EditorBlock} from 'draft-js'

/**
 * For unstyled hide supported lang popover
 */
export default class Unstyled extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    let codeBlocks = document.querySelectorAll('pre.public-DraftStyleDefault-pre');
    if (codeBlocks.length <= 0) {
      const { blockProps } = this.props
      const { setSupportedLang } = blockProps

      setSupportedLang({
        position: {
          left: -1180,
          top: -999
        }
      });
    }
  }

  render() {
    return (
      <EditorBlock
        key='editor-unstyled-editor'
        {...this.props}
      />
    );
  };
};

