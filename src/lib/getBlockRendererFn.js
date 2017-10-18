import CodeBlock from '../ui/CodeBlock'

/*
A higher-order function.
*/
const getBlockRendererFn = (
  getEditorState,
  onChange,
  topOffset,
  leftOffset,
  setSupportedLang,
) => (block) => {
  const type = block.getType();

  switch(type) {
    case 'code-block':
      return {
        component: CodeBlock,
        props: {
          onChange,
          getEditorState,
          topOffset,
          leftOffset,
          setSupportedLang,
        },
      };
    default:
      return null;
  }
};

export default getBlockRendererFn
