/* @flow */
import codeBlockComponent from '../ui/CodeBlock';
import {ENTITY_TYPE} from 'draft-js-utils';

import type {ContentBlock, ContentState} from 'draft-js';

type EntityRangeCallback = (start: number, end: number) => void;

export default class CodeBlockDecorator {
  constructor(config) {
    const {
      editorState
    } = config

    console.log(editorState)

    this.config = {
      editorState
    }
  }

  findCodeBlockEntities = (contentBlock: ContentBlock, callback: EntityRangeCallback) => {

    console.log(contentBlock)

    console.log('kkkkkkk', this.config.editorState)

    if(this.config.editorState) {
      const {editorState} = this.config
      const selection = editorState.getSelection();
      if (selection.get('anchorKey') === contentBlock.get('key') &&
        selection.get('anchorKey') === selection.get('focusKey')) {
        let text = contentBlock.getText() || ' ';
        text = text && text.substr(
          0,
          selection.get('focusOffset') === text.length - 1
            ? text.length
            : selection.get('focusOffset') + 1,
        );
      }

      callback(0, 0);

      // let selection = editorState.getSelection();
      // let currentBlockType = editorState
      //   .getCurrentContent()
      //   .getBlockForKey(selection.getStartKey())
      //   .getType();
      //
      // console.log('block-type:', currentBlockType)
      // return currentBlockType === 'code-block'
    }

    // contentBlock.findEntityRanges((character) => {
    //   if(this.config.editorState) {
    //     const {editorState} = this.config
    //     let selection = editorState.getSelection();
    //     let currentBlockType = editorState
    //       .getCurrentContent()
    //       .getBlockForKey(selection.getStartKey())
    //       .getType();
    //
    //     console.log('block-type:', currentBlockType)
    //     return currentBlockType === 'code-block'
    //   }
    //   return false;
    // }, callback);
  }

  codeBlockComponent = codeBlockComponent.bind(this)

  codeBlockDecorator = () => ({
    strategy: this.findCodeBlockEntities,
    component: this.codeBlockComponent(),
  })
}



// export default {
//   strategy: findCodeBlockEntities,
//   component: CodeBlock,
// };