import React from 'react'
import autobind from 'class-autobind';

import shallowCompare from '../lib/shallowEqual'
import DefaultToolbarConfig from '../lib/EditorToolbarConfig';
import Autocomplete from './Autocomplete'

import {EditorState} from 'draft-js'

import slStyles from './SupportLanguagePopover.css'

type Props = {
  getEditorState: Object,
  onChange: Function,
  position: Object
};

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

const matchStateToTerm = (state, value) => {
  return (
    state.value.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

class SupportLanguagePopover extends React.Component {

  props: Props;

  constructor(props) {
    super(props);
    autobind(this);

    this.originItems = DefaultToolbarConfig.PRISM_SUPPORTED_LANGUAGES;

    this.state = {
      items: this.originItems,
      value: '',
    }
    this._value = ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillReceiveProps(newProps){
    let {block} = newProps;
    let syntax = block && block.getData().get('syntaxLabel');
    this.setState({
      value: syntax || ''
    })
  }

  render () {
    let {position} = this.props;

    const styles = {
      position: 'fixed',
      zIndex: '1000',
      left: position.left + 'px',
      top: position.top + 'px',
    };

    return (
      <div
        className='editable-prismSupportedLanguages'
        style={styles}
      >
        <Autocomplete
          value={this.state.value}
          inputProps={{
            id: 'editable-prismSupportedLangPopover-input',
            placeholder: '请选择语言'
          }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          items={DefaultToolbarConfig.PRISM_SUPPORTED_LANGUAGES}
          getItemValue={(item) => item.value}
          shouldItemRender={matchStateToTerm}
          // sortItems={sortStates}
          onChange={(event, value) => this.setState({ value })}
          onSelect={this._onChangePrismLang}
          renderMenu={children => (
            <div className={slStyles.selection}>
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className={`${slStyles.item} ${isHighlighted ? slStyles.highlighted : ''}`}
              key={item.value}
            >{item.label}</div>
          )}
        />
        {/*<InputDropdown*/}
          {/*name='support-lang'*/}
          {/*items={this.state.items}*/}
          {/*displayValue={syntax && syntax.label}*/}
          {/*onInputChange={this._onInputChange}*/}
          {/*onItemSelected={this._onChangePrismLang}*/}
          {/*placeholder='请选择语言'*/}
        {/*/>*/}
      </div>
    )
  }

  // _onInputChange(input) {
  //   const normalisedInput = input.toLowerCase();
  //
  //   const filteredArray = this.originItems.filter(item => {
  //     return item.label.toLowerCase().indexOf(normalisedInput) === 0;
  //   });
  //
  //   this.setState({ items: filteredArray });
  // }


  _onChangePrismLang = (value, item)=> {

    if (!value) {
      return;
    }

    let {getEditorState, block} = this.props

    const data = block.getData();
    const newData = data.set('syntax', value).set('syntaxLabel', item.label);

    // this.setState({
    //   value: item.label
    // })
    this.props.onChange(updateDataOfBlock(getEditorState, block, newData));
  };
};

export default SupportLanguagePopover