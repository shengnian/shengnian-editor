import Immutable from 'immutable'

import PrismOptions from './options'

export default class PrismDecorator {
  constructor(options) {
    this.options = PrismOptions(options || {});
    this.highlighted = {};
  }

  /**
   * Return list of decoration IDs per character
   *
   * @param {ContentBlock}
   * @return {List<String>}
   */
  getDecorations = (block) => {
    let tokens, token, tokenId, resultId, offset = 0, tokenCount = 0;
    let filter = this.options.get('filter');
    let getSyntax = this.options.get('getSyntax');
    let blockKey = block.getKey();
    let blockText = block.getText();
    let decorations = Array(blockText.length).fill(null);
    let Prism = this.options.get('prism');
    let highlighted = this.highlighted;

    highlighted[blockKey] = {};

    if (!filter(block)) {
      return Immutable.List(decorations);
    }

    let syntax = getSyntax(block) || this.options.get('defaultSyntax');

    // Allow for no syntax highlighting
    if (syntax == null) {
      return Immutable.List(decorations);
    }

    // Parse text using Prism
    let grammar = Prism.languages[syntax];
    tokens = Prism.tokenize(blockText, grammar);

    const _this = this


    function processToken(decorations, token, offset) {
      if (typeof token === 'string') {
        return
      }
      //First write this tokens full length
      tokenId = 'tok'+(tokenCount++);
      resultId = blockKey + '-' + tokenId;
      highlighted[blockKey][tokenId] = token;
      _this._occupySlice(decorations, offset, offset + token.length, resultId);
      //Then recurse through the child tokens, overwriting the parent
      let childOffset = offset;
      for (let i =0; i < token.content.length; i++) {
        let childToken = token.content[i];
        processToken(decorations, childToken, childOffset);
        childOffset += childToken.length;
      }
    }

    for (let i =0; i < tokens.length; i++) {
      token = tokens[i];
      processToken(decorations, token, offset);
      offset += token.length;
    }

    return Immutable.List(decorations);
  }

  /**
   * Return component to render a decoration
   *
   * @param {String}
   * @return {Function}
   */
  getComponentForKey = (key) => {
    return this.options.get('render');
  }

  /**
   * Return props to render a decoration
   *
   * @param {String}
   * @return {Object}
   */
  getPropsForKey = (key) => {
    let parts = key.split('-');
    let blockKey = parts[0];
    let tokId = parts[1];
    let token = this.highlighted[blockKey][tokId];

    return {
      type: token.type
    }
  }

  _occupySlice = (targetArr, start, end, componentKey) => {
    for (let ii = start; ii < end; ii++) {
      targetArr[ii] = componentKey;
    }
  }
}


