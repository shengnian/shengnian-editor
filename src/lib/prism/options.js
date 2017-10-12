import React from 'react'
import Prism from 'prismjs'
import Immutable from 'immutable'

/**
 Filter block to only highlight code blocks
 @param {Draft.ContentBlock}
 @return {Boolean}
 */
function defaultFilter(block) {
  return block.getType() === 'code-block';
}

/**
 Return syntax for highlighting a code block
 @param {Draft.ContentBlock}
 @return {String}
 */
function defaultGetSyntax(block) {

  if (block.getData) {
    return block.getData().get('syntax');
  }

  return null;
}

/**
 Default render for token
 @param {Object} props
 @return {React.Element}
 */
function defaultRender(props) {

  const children  = props.children;
  const eleProps = {
    className: 'prism-token token ' + props.type,
    type: props.type
  };

  return React.createElement(
    "span",
    eleProps,
    children
  );
}

const PrismOptions = Immutable.Record({
  // Default language to use
  defaultSyntax:      null,

  // Filter block before highlighting
  filter:             defaultFilter,

  // Function to get syntax for a block
  getSyntax:          defaultGetSyntax,

  // Render a decorated text for a token
  render:             defaultRender,

  // Prism module
  prism:              Prism
});

export default PrismOptions
