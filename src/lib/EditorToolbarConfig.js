/* @flow */
import type {EditorState} from 'draft-js';

export type StyleConfig = {
  label: string;
  style: string;
  className?: string;
};

type GetControlState = (key: string) => ?string;
type SetControlState = (key: string, value: string) => void;

export type CustomControl = ReactNode | (set: SetControlState, get: GetControlState, state: EditorState) => ReactNode;
export type CustomControlList = Array<CustomControl>;

export type StyleConfigList = Array<StyleConfig>;

export type GroupName = 'INLINE_STYLE_BUTTONS' | 'BLOCK_TYPE_BUTTONS' | 'LINK_BUTTONS' | 'BLOCK_TYPE_DROPDOWN' | 'HISTORY_BUTTONS' | 'IMAGE_BUTTON';

export type ToolbarConfig = {
  display: Array<GroupName>;
  extraProps?: Object;
  INLINE_STYLE_BUTTONS: StyleConfigList;
  BLOCK_TYPE_DROPDOWN: StyleConfigList;
  BLOCK_TYPE_BUTTONS: StyleConfigList;
};

export const INLINE_STYLE_BUTTONS: StyleConfigList = [
  {label: '加粗(ctrl+b)', style: 'BOLD'},
  {label: '斜体(ctrl+i)', style: 'ITALIC'},
  {label: '删除线', style: 'STRIKETHROUGH'},
  {label: '代码', style: 'CODE'},
  {label: '下划线(ctrl+u)', style: 'UNDERLINE'},
];

export const BLOCK_TYPE_DROPDOWN: StyleConfigList = [
  {label: '正文', style: 'unstyled'},
  {label: '一级标题', style: 'header-one'},
  {label: '二级标题', style: 'header-two'},
  {label: '三级标题', style: 'header-three'},
  {label: '代码块', style: 'code-block'},
];
export const BLOCK_TYPE_BUTTONS: StyleConfigList = [
  {label: '无序列表', style: 'unordered-list-item'},
  {label: '有序列表', style: 'ordered-list-item'},
  {label: '引用块', style: 'blockquote'},
];

let EditorToolbarConfig: ToolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'IMAGE_BUTTON', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS,
  BLOCK_TYPE_DROPDOWN,
  BLOCK_TYPE_BUTTONS,
};

export default EditorToolbarConfig;
