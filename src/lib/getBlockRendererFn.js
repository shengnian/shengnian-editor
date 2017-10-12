import CodeBlock from '../ui/CodeBlock'

/*
A higher-order function.
*/
const getBlockRendererFn = (
  getEditorState,
  onChange,
  setPrismLangPosition,
  topOffset,
  leftOffset,
) => (block) => {
  const type = block.getType();

  switch(type) {
    case 'code-block':
      return {
        component: CodeBlock,
        props: {
          onChange,
          getEditorState,
          setPrismLangPosition,
          topOffset,
          leftOffset,
        },
      };
    case 'image': {
      console.log('image...')
    }
    default:
      return null;
  }
};

export default getBlockRendererFn
