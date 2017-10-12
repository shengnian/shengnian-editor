import CodeBlock from '../ui/CodeBlock'

/*
A higher-order function.
*/
const getBlockRendererFn = (getEditorState, onChange) => (block) => {
  const type = block.getType();
  switch(type) {
    case 'code-block':
      return {
        component: CodeBlock,
        props: {
          onChange,
          getEditorState,
        },
      };
    default:
      return null;
  }
};

export default getBlockRendererFn
