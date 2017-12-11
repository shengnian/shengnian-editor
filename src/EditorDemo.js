/* @flow */
import React, {Component} from 'react';
import RichTextEditor, {createEmptyValue} from './RichTextEditor';
import {convertToRaw} from 'draft-js';
import autobind from 'class-autobind';
import {Map} from 'immutable'

import ButtonGroup from './ui/ButtonGroup';
import Dropdown from './ui/Dropdown';
import IconButton from './ui/IconButton';

import type {EditorValue} from './RichTextEditor';

type Props = {};
type State = {
  value: EditorValue;
  format: string;
  readOnly: boolean;
};

export default class EditorDemo extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      value: createEmptyValue(),
      format: 'html',
      readOnly: false,
    };
  }

  render() {
    let {value, format} = this.state;

    return (
      <div className="editor-demo">
        <div className="row">
          <p>This is a demo of the <a href="https://github.com/shengnian/shengnian-editor" target="top">shengnian-editor</a> editor.</p>
        </div>
        <div className="row">
          <RichTextEditor
            value={value}
            topOffset={20}
            leftOffset={-215}
            onChange={this._onChange}
            className="shengnian-editor-demo"
            placeholder="Tell a story"
            toolbarClassName="demo-toolbar"
            editorClassName="demo-editor"
            readOnly={this.state.readOnly}
            onImageChange={(e, editorState, setImage) => {console.log('demo image change')}}
            onImageRejected={(files, evt, editorState) => {console.log('demo rejected', files[0])}}
            onImageAccepted={(files, evt, editorState, setImage) => {
              console.log('demo accepted', files[0])
              // If the image uploaded, call the setImage to insert image.
              setImage('https://shengnian.github.io/favicon.ico')
            }}
            customControls={[
              // eslint-disable-next-line no-unused-vars
              (setValue, getValue, editorState) => {
                let choices = new Map([
                  ['1', {label: '1'}],
                  ['2', {label: '2'}],
                  ['3', {label: '3'}],
                ]);
                return (
                  <ButtonGroup key={1}>
                    <Dropdown
                      choices={choices}
                      selectedKey={getValue('language-key')}
                      onChange={(value) => {
                        setValue('language-key', value)
                      }}
                    />
                  </ButtonGroup>
                );
              },
              <ButtonGroup key={2}>
                <IconButton
                  label="Remove Link"
                  iconName="unlink"
                  focusOnClick={false}
                  onClick={() => console.log('You pressed a button')}
                />
              </ButtonGroup>,
            ]}
          />
        </div>
        <div className="row">
          <label className="radio-item">
            <input
              type="radio"
              name="format"
              value="html"
              checked={format === 'html'}
              onChange={this._onChangeFormat}
            />
            <span>HTML</span>
          </label>
          <label className="radio-item">
            <input
              type="radio"
              name="format"
              value="markdown"
              checked={format === 'markdown'}
              onChange={this._onChangeFormat}
            />
            <span>Markdown</span>
          </label>
          <label className="radio-item">
            <input
              type="checkbox"
              onChange={this._onChangeReadOnly}
              checked={this.state.readOnly}
            />
            <span>Editor is read-only</span>
          </label>
        </div>
        <div className="row">
          <textarea
            className="source"
            placeholder="Editor Source"
            value={value.toString(format)}
            onChange={this._onChangeSource}
          />
        </div>
        <div className="row btn-row">
          <span className="label">Debugging:</span>
          <button className="btn" onClick={this._logState}>Log Content State</button>
          <button className="btn" onClick={this._logStateRaw}>Log Raw</button>
        </div>
      </div>
    );
  }

  _logState() {
    let editorState = this.state.value.getEditorState();
    let contentState = window.contentState = editorState.getCurrentContent().toJS();
    console.log(contentState);
  }

  _logStateRaw() {
    let editorState = this.state.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    let rawContentState = window.rawContentState = convertToRaw(contentState);
    console.log(JSON.stringify(rawContentState));
  }

  _onChange(value: EditorValue) {
    this.setState({value});
  }

  _onChangeSource(event: Object) {
    let source = event.target.value;
    let oldValue = this.state.value;
    this.setState({
      value: oldValue.setContentFromString(source, this.state.format),
    });
  }

  _onChangeFormat(event: Object) {
    this.setState({format: event.target.value});
  }

  _onChangeReadOnly(event: Object) {
    this.setState({readOnly: event.target.checked});
  }
}
