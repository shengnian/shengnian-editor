/* @flow */
import React, {Component} from 'react';
import {
  CompositeDecorator,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  Entity,
} from 'draft-js';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import changeBlockDepth from './lib/changeBlockDepth';
import changeBlockType from './lib/changeBlockType';
import getBlocksInSelection from './lib/getBlocksInSelection';
import insertBlockAfter from './lib/insertBlockAfter';
import isListItem from './lib/isListItem';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import EditorToolbar from './lib/EditorToolbar';
import EditorValue from './lib/EditorValue';
import LinkDecorator from './lib/LinkDecorator';
import ImageDecorator from './lib/ImageDecorator';
import composite from './lib/composite';
import getBlockRendererFn from './lib/getBlockRendererFn'
import cx from 'classnames';
import autobind from 'class-autobind';
import EventEmitter from 'events';
import {BLOCK_TYPE} from 'draft-js-utils';
import MultiDecorator from 'draft-js-multidecorators'
import PrismDecorator from './lib/prism'
import Prism from 'prismjs';
import 'prismjs/components/prism-vim.min';
import 'prismjs/components/prism-css.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-markup.min';
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-c.min';
import 'prismjs/components/prism-clike.min';
import 'prismjs/components/prism-csharp.min';
import 'prismjs/components/prism-cpp.min';
import 'prismjs/components/prism-go.min';
import 'prismjs/components/prism-perl.min';
import 'prismjs/components/prism-php.min';
import 'prismjs/components/prism-ruby.min';
import 'prismjs/components/prism-sass.min';
import 'prismjs/components/prism-scss.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-yaml.min';
import 'prismjs/components/prism-markdown.min';
import 'prismjs/components/prism-abap.min';
import 'prismjs/components/prism-actionscript.min';
import 'prismjs/components/prism-ada.min';
import 'prismjs/components/prism-apacheconf.min';
import 'prismjs/components/prism-apl.min';
import 'prismjs/components/prism-applescript.min';
import 'prismjs/components/prism-arduino.min';
import 'prismjs/components/prism-asciidoc.min';
import 'prismjs/components/prism-aspnet.min';
import 'prismjs/components/prism-autoit.min';
import 'prismjs/components/prism-autohotkey.min';
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-basic.min';
import 'prismjs/components/prism-batch.min';
import 'prismjs/components/prism-bison.min';
import 'prismjs/components/prism-brainfuck.min';
import 'prismjs/components/prism-bro.min';
import 'prismjs/components/prism-coffeescript.min';
import 'prismjs/components/prism-crystal.min';
// import 'prismjs/components/prism-css-extras.min';
import 'prismjs/components/prism-d.min';
import 'prismjs/components/prism-dart.min';
import 'prismjs/components/prism-diff.min';
import 'prismjs/components/prism-docker.min';
import 'prismjs/components/prism-eiffel.min';
import 'prismjs/components/prism-elixir.min';
import 'prismjs/components/prism-erlang.min';
import 'prismjs/components/prism-fsharp.min';
import 'prismjs/components/prism-fortran.min';
import 'prismjs/components/prism-gherkin.min';
import 'prismjs/components/prism-git.min';
import 'prismjs/components/prism-glsl.min';
import 'prismjs/components/prism-graphql.min';
import 'prismjs/components/prism-groovy.min';
import 'prismjs/components/prism-haml.min';
import 'prismjs/components/prism-handlebars.min';
import 'prismjs/components/prism-haskell.min';
import 'prismjs/components/prism-haxe.min';
import 'prismjs/components/prism-http.min';
import 'prismjs/components/prism-icon.min';
import 'prismjs/components/prism-inform7.min';
import 'prismjs/components/prism-ini.min';
import 'prismjs/components/prism-j.min';
import 'prismjs/components/prism-jade.min';
import 'prismjs/components/prism-jolie.min';
import 'prismjs/components/prism-julia.min';
import 'prismjs/components/prism-keyman.min';
import 'prismjs/components/prism-kotlin.min';
import 'prismjs/components/prism-latex.min';
import 'prismjs/components/prism-less.min';
import 'prismjs/components/prism-livescript.min';
import 'prismjs/components/prism-lolcode.min';
import 'prismjs/components/prism-lua.min';
import 'prismjs/components/prism-makefile.min';
import 'prismjs/components/prism-matlab.min';
import 'prismjs/components/prism-mel.min';
import 'prismjs/components/prism-mizar.min';
import 'prismjs/components/prism-monkey.min';
import 'prismjs/components/prism-n4js.min';
import 'prismjs/components/prism-nasm.min';
import 'prismjs/components/prism-nginx.min';
import 'prismjs/components/prism-nim.min';
import 'prismjs/components/prism-nix.min';
import 'prismjs/components/prism-nsis.min';
import 'prismjs/components/prism-objectivec.min';
import 'prismjs/components/prism-ocaml.min';
import 'prismjs/components/prism-opencl.min';
import 'prismjs/components/prism-oz.min';
import 'prismjs/components/prism-parigp.min';
import 'prismjs/components/prism-parser.min';
import 'prismjs/components/prism-pascal.min';
// import 'prismjs/components/prism-php-extras.min';
import 'prismjs/components/prism-powershell.min';
import 'prismjs/components/prism-processing.min';
import 'prismjs/components/prism-prolog.min';
import 'prismjs/components/prism-properties.min';
import 'prismjs/components/prism-protobuf.min';
import 'prismjs/components/prism-puppet.min';
import 'prismjs/components/prism-pure.min';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-q.min';
import 'prismjs/components/prism-qore.min';
import 'prismjs/components/prism-r.min';
import 'prismjs/components/prism-renpy.min';
import 'prismjs/components/prism-reason.min';
import 'prismjs/components/prism-rest.min';
import 'prismjs/components/prism-rip.min';
import 'prismjs/components/prism-roboconf.min';
import 'prismjs/components/prism-rust.min';
import 'prismjs/components/prism-sas.min';
import 'prismjs/components/prism-scala.min';
import 'prismjs/components/prism-scheme.min';
import 'prismjs/components/prism-smalltalk.min';
import 'prismjs/components/prism-smarty.min';
import 'prismjs/components/prism-sql.min';
import 'prismjs/components/prism-stylus.min';
import 'prismjs/components/prism-swift.min';
import 'prismjs/components/prism-tcl.min';
import 'prismjs/components/prism-textile.min';
import 'prismjs/components/prism-twig.min';
import 'prismjs/components/prism-vbnet.min';
import 'prismjs/components/prism-verilog.min';
import 'prismjs/components/prism-vhdl.min';
import 'prismjs/components/prism-wiki.min';
import 'prismjs/components/prism-xojo.min';

import './Draft.global.css';
import styles from './RichTextEditor.css';
import 'prismjs/themes/prism.css';

import type {ContentBlock} from 'draft-js';
import type {ToolbarConfig, CustomControl} from './lib/EditorToolbarConfig';
import type {ImportOptions} from './lib/EditorValue';

import ButtonGroup from './ui/ButtonGroup';
import Button from './ui/Button';
import Dropdown from './ui/Dropdown';

const MAX_LIST_DEPTH = 2;

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

type ChangeHandler = (value: EditorValue) => any;

type Props = {
  className?: string;
  toolbarClassName?: string;
  editorClassName?: string;
  value: EditorValue;
  onChange?: ChangeHandler;
  placeholder?: string;
  customStyleMap?: {[style: string]: {[key: string]: any}};
  handleReturn?: (event: Object) => boolean;
  customControls?: Array<CustomControl>;
  readOnly?: boolean;
  disabled?: boolean; // Alias of readOnly
  toolbarConfig?: ToolbarConfig;
  blockStyleFn?: (block: ContentBlock) => ?string;
  autoFocus?: boolean;
  keyBindingFn?: (event: Object) => ?string;
  rootStyle?: Object;
  editorStyle?: Object;
  toolbarStyle?: Object;
};


export default class RichTextEditor extends Component {
  props: Props;
  _keyEmitter: EventEmitter;

  constructor() {
    super(...arguments);
    this._keyEmitter = new EventEmitter();
    autobind(this);

    this.getEditorState = () => this.props.value.getEditorState();

    this.blockRendererFn = getBlockRendererFn(this.getEditorState, this._onChange);

    // this.blockRenderMap = Immutable.Map({
    //   'code-block': {
    //     element: 'pre',
    //     wrapper: <CodeBlockRender />,
    //   },
    // }).merge(DefaultDraftBlockRenderMap);
  }

  componentDidMount() {
    const {autoFocus} = this.props;

    if (!autoFocus) {
      return;
    }

    this._focus();
  }

  render() {
    let {
      value,
      className,
      toolbarClassName,
      editorClassName,
      placeholder,
      customStyleMap,
      readOnly,
      disabled,
      toolbarConfig,
      blockStyleFn,
      customControls,
      keyBindingFn,
      rootStyle,
      toolbarStyle,
      editorStyle,
      ...otherProps // eslint-disable-line comma-dangle
    } = this.props;
    let editorState = value.getEditorState();
    customStyleMap = customStyleMap ? {...styleMap, ...customStyleMap} : styleMap;

    // If the user changes block type before entering any text, we can either
    // style the placeholder or hide it. Let's just hide it for now.
    let combinedEditorClassName = cx({
      [styles.editor]: true,
      [styles.hidePlaceholder]: this._shouldHidePlaceholder(),
    }, editorClassName);
    if (readOnly == null) {
      readOnly = disabled;
    }
    let editorToolbar;
    if (!readOnly) {
      editorToolbar = (
        <EditorToolbar
          rootStyle={toolbarStyle}
          className={toolbarClassName}
          keyEmitter={this._keyEmitter}
          editorState={editorState}
          onChange={this._onChange}
          focusEditor={this._focus}
          toolbarConfig={toolbarConfig}
          customControls={customControls}
        />
      );
    }
    return (
      <div className={cx(styles.root, className)} style={rootStyle}>
        {editorToolbar}
        <div onClick={() => {
          this._focus()
        }} className={combinedEditorClassName} style={editorStyle}>
          <Editor
            {...otherProps}
            blockStyleFn={composite(defaultBlockStyleFn, blockStyleFn)}
            customStyleMap={customStyleMap}
            editorState={editorState}
            handleReturn={this._handleReturn}
            keyBindingFn={keyBindingFn || this._customKeyHandler}
            handleKeyCommand={this._handleKeyCommand}
            onTab={this._onTab}
            onChange={this._onChange}
            placeholder={placeholder}
            ref="editor"
            spellCheck={true}
            readOnly={readOnly}
            blockRendererFn={this.blockRendererFn}
            // blockRenderMap={this.blockRenderMap}
          />
        </div>
      </div>
    );
  }

  _shouldHidePlaceholder(): boolean {
    let editorState = this.props.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        return true;
      }
    }
    return false;
  }

  _handleReturn(event: Object): boolean {
    let {handleReturn} = this.props;
    if (handleReturn != null && handleReturn(event)) {
      return true;
    }
    if (this._handleReturnSoftNewline(event)) {
      return true;
    }
    if (this._handleReturnEmptyListItem()) {
      return true;
    }
    if (this._handleReturnSpecialBlock()) {
      return true;
    }
    return false;
  }

  // `shift + return` should insert a soft newline.
  _handleReturnSoftNewline(event: Object): boolean {
    let editorState = this.props.value.getEditorState();
    if (isSoftNewlineEvent(event)) {
      let selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        this._onChange(RichUtils.insertSoftNewline(editorState));
      } else {
        let content = editorState.getCurrentContent();
        let newContent = Modifier.removeRange(content, selection, 'forward');
        let newSelection = newContent.getSelectionAfter();
        let block = newContent.getBlockForKey(newSelection.getStartKey());
        newContent = Modifier.insertText(
          newContent,
          newSelection,
          '\n',
          block.getInlineStyleAt(newSelection.getStartOffset()),
          null,
        );
        this._onChange(
          EditorState.push(editorState, newContent, 'insert-fragment')
        );
      }
      return true;
    }
    return false;
  }

  // If the cursor is in an empty list item when return is pressed, then the
  // block type should change to normal (end the list).
  _handleReturnEmptyListItem(): boolean {
    let editorState = this.props.value.getEditorState();
    let selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      let contentState = editorState.getCurrentContent();
      let blockKey = selection.getStartKey();
      let block = contentState.getBlockForKey(blockKey);
      if (isListItem(block) && block.getLength() === 0) {
        let depth = block.getDepth();
        let newState = (depth === 0) ?
          changeBlockType(editorState, blockKey, BLOCK_TYPE.UNSTYLED) :
          changeBlockDepth(editorState, blockKey, depth - 1);
        this._onChange(newState);
        return true;
      }
    }
    return false;
  }

  // If the cursor is at the end of a special block (any block type other than
  // normal or list item) when return is pressed, new block should be normal.
  _handleReturnSpecialBlock(): boolean {
    let editorState = this.props.value.getEditorState();
    let selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      let contentState = editorState.getCurrentContent();
      let blockKey = selection.getStartKey();
      let block = contentState.getBlockForKey(blockKey);
      if (!isListItem(block) && block.getType() !== BLOCK_TYPE.UNSTYLED) {
        // If cursor is at end.
        if (block.getLength() === selection.getStartOffset()) {
          let newEditorState = insertBlockAfter(
            editorState,
            blockKey,
            BLOCK_TYPE.UNSTYLED
          );
          this._onChange(newEditorState);
          return true;
        }
      }
    }
    return false;
  }

  _onTab(event: Object): ?string {
    let editorState = this.props.value.getEditorState();
    let newEditorState = RichUtils.onTab(event, editorState, MAX_LIST_DEPTH);
    if (newEditorState !== editorState) {
      this._onChange(newEditorState);
    }
  }

  _customKeyHandler(event: Object): ?string {
    // Allow toolbar to catch key combinations.
    let eventFlags = {};
    this._keyEmitter.emit('keypress', event, eventFlags);
    if (eventFlags.wasHandled) {
      return null;
    } else {
      return getDefaultKeyBinding(event);
    }
  }

  _handleKeyCommand(command: string): boolean {
    let editorState = this.props.value.getEditorState();
    let newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      this._onChange(newEditorState);
      return true;
    } else {
      return false;
    }
  }

  _onChange(editorState: EditorState) {
    let {onChange, value} = this.props;
    if (onChange == null) {
      return;
    }
    let newValue = value.setEditorState(editorState);
    let newEditorState = newValue.getEditorState();
    this._handleInlineImageSelection(newEditorState);
    onChange(newValue);
  }

  _handleInlineImageSelection(editorState: EditorState) {
    let selection = editorState.getSelection();
    let blocks = getBlocksInSelection(editorState);

    const selectImage = (block, offset) => {
      const imageKey = block.getEntityAt(offset);
      Entity.mergeData(imageKey, {selected: true});
    };

    let isInMiddleBlock = (index) => index > 0 && index < blocks.size - 1;
    let isWithinStartBlockSelection = (offset, index) => (
      index === 0 && offset > selection.getStartOffset()
    );
    let isWithinEndBlockSelection = (offset, index) => (
      index === blocks.size - 1 && offset < selection.getEndOffset()
    );

    blocks.toIndexedSeq().forEach((block, index) => {
      ImageDecorator.strategy(
        block,
        (offset) => {
          if (isWithinStartBlockSelection(offset, index) ||
              isInMiddleBlock(index) ||
              isWithinEndBlockSelection(offset, index)) {
            selectImage(block, offset);
          }
        });
    });
  }

  _focus() {
    this.refs.editor.focus();
  }
}

function defaultBlockStyleFn(block: ContentBlock): string {
  let result = styles.block;
  switch (block.getType()) {
    case 'unstyled':
      return cx('editable-unstyled', result, styles.paragraph);
    case 'blockquote':
      return cx('editable-styled', result, styles.blockquote);
    case 'code-block':
      return cx('editable-styled', result, styles.codeBlock);
    default:
      return result;
  }
}


// const blockRenderMap = Immutable.Map({
//   'code-block': {
//     // element is used during paste or html conversion to auto match your component;
//     // it is also retained as part of this.props.children and not stripped out
//     element: 'pre',
//     wrapper: <CodeBlock />,
//   },
// });
//
// const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

// const ImgComponent = (props) => {
//   return (
//     <img
//       style={{height: '300px', width: 'auto'}}
//       src={props.blockProps.src}
//       alt="图片"/>
//   )
// }
//
// function extendedBlockRenderFn(contentBlock: ContentBlock) {
//
//   const type = contentBlock.getType();
//
//   if(type == 'code-block') {
//     console.log('type', type)
//     return {
//       component: CodeBlockCom,  // 指定组件
//       editable: true,  // 这里设置自定义的组件可不可以编辑，因为是图片，这里选择不可编辑
//       // 这里的props在自定义的组件中需要用this.props.blockProps来访问
//       props: {
//         text: contentBlock
//       }
//     }
//   }
//
//   // 获取到contentBlock的文本信息，可以用contentBlock提供的其它方法获取到想要使用的信息
//   const text = contentBlock.getText();
//   // 我们假定这里图片的文本格式为![图片名称](htt://....)
//   let matches = text.match(/\!\[(.*)\]\((http.*)\)/);
//   console.log(matches)
//   if (matches) {
//     return {
//       component: ImgComponent,  // 指定组件
//       editable: false,  // 这里设置自定义的组件可不可以编辑，因为是图片，这里选择不可编辑
//       // 这里的props在自定义的组件中需要用this.props.blockProps来访问
//       props: {
//         src: matches[2]
//     }
//   };
//   }
// }

const decorator = new MultiDecorator([
  new PrismDecorator({
    // Provide your own instance of PrismJS
    prism: Prism,
  }),
  new CompositeDecorator([LinkDecorator, ImageDecorator])
]);

function createEmptyValue(): EditorValue {
  return EditorValue.createEmpty(decorator);
}

function createValueFromString(markup: string, format: string, options?: ImportOptions): EditorValue {
  return EditorValue.createFromString(markup, format, decorator, options);
}

// $FlowIssue - This should probably not be done this way.
Object.assign(RichTextEditor, {
  EditorValue,
  decorator,
  createEmptyValue,
  createValueFromString,
  ButtonGroup,
  Button,
  Dropdown,
});

export {
  EditorValue,
  decorator,
  createEmptyValue,
  createValueFromString,
  ButtonGroup,
  Button,
  Dropdown,
};
