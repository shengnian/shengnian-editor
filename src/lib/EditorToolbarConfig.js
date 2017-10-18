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

export type GroupName = 'INLINE_STYLE_BUTTONS' | 'BLOCK_TYPE_BUTTONS' | 'CODE_BLOCK_BUTTON' | 'LINK_BUTTONS' | 'BLOCK_TYPE_DROPDOWN' | 'HISTORY_BUTTONS' | 'IMAGE_BUTTON';

export type PrismLangConfig = {
  label: string;
  value: string;
}

export type PrismLangConfigList = Array<PrismLangConfig>;

export type ToolbarConfig = {
  display: Array<GroupName>;
  extraProps?: Object;
  INLINE_STYLE_BUTTONS: StyleConfigList;
  BLOCK_TYPE_DROPDOWN: StyleConfigList;
  BLOCK_TYPE_BUTTONS: StyleConfigList;
  PRISM_SUPPORTED_LANGUAGES: PrismLangConfigList;
};

export const INLINE_STYLE_BUTTONS: StyleConfigList = [
  {label: '加粗(ctrl+b)', style: 'BOLD'},
  {label: '斜体(ctrl+i)', style: 'ITALIC'},
  {label: '删除线', style: 'STRIKETHROUGH'},
  // {label: '代码', style: 'CODE'},
  {label: '下划线(ctrl+u)', style: 'UNDERLINE'},
];

export const BLOCK_TYPE_DROPDOWN: StyleConfigList = [
  {label: '正文', style: 'unstyled'},
  {label: '一级标题', style: 'header-one'},
  {label: '二级标题', style: 'header-two'},
  {label: '三级标题', style: 'header-three'},
  // {label: '代码块', style: 'code-block'},
];
export const BLOCK_TYPE_BUTTONS: StyleConfigList = [
  {label: '无序列表', style: 'unordered-list-item'},
  {label: '有序列表', style: 'ordered-list-item'},
  {label: '引用块', style: 'blockquote'},
  // {label: '代码块', style: 'code-block'},
];

export const PRISM_SUPPORTED_LANGUAGES: PrismLangConfigList = [
  { label: 'vim', value: 'vim' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'React JSX', value: 'jsx' },
  { label: 'JSON', value: 'json' },
  { label: 'Markup', value: 'markup' },
  { label: 'Java', value: 'java' },
  { label: 'C', value: 'c' },
  { label: 'C-like', value: 'clike' },
  { label: 'C#', value: 'csharp' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Perl', value: 'perl' },
  { label: 'PHP', value: 'php' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Sass (Sass)', value: 'sass' },
  { label: 'Sass (Scss)', value: 'scss' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'ABAP', value: 'abap' },
  { label: 'ActionScript', value: 'actionscript' },
  { label: 'Ada', value: 'ada' },
  { label: 'Apache Configuration', value: 'apacheconf' },
  { label: 'APL', value: 'apl' },
  { label: 'AppleScript', value: 'applescript' },
  { label: 'Arduino', value: 'arduino' },
  { label: 'AsciiDoc', value: 'asciidoc' },
  { label: 'ASP.NET (C#)', value: 'aspnet' },
  { label: 'AutoIt', value: 'autoit' },
  { label: 'AutoHotkey', value: 'autohotkey' },
  { label: 'Bash', value: 'bash' },
  { label: 'BASIC', value: 'basic' },
  { label: 'Batch', value: 'batch' },
  { label: 'Bison', value: 'bison' },
  { label: 'Brainfuck', value: 'brainfuck' },
  { label: 'Bro', value: 'bro' },
  { label: 'CoffeeScript', value: 'coffeescript' },
  { label: 'Crystal', value: 'crystal' },
  // { label: 'CSS Extras', value: 'css-extras' },
  { label: 'D', value: 'd' },
  { label: 'Dart', value: 'dart' },
  // { label: 'Django/Jinja2', value: 'django' },
  { label: 'Diff', value: 'diff' },
  { label: 'Docker', value: 'docker' },
  { label: 'Eiffel', value: 'eiffel' },
  { label: 'Elixir', value: 'elixir' },
  { label: 'Erlang', value: 'erlang' },
  { label: 'F#', value: 'fsharp' },
  { label: 'Fortran', value: 'fortran' },
  { label: 'Gherkin', value: 'gherkin' },
  { label: 'Git', value: 'git' },
  { label: 'GLSL', value: 'glsl' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'Groovy', value: 'groovy' },
  { label: 'Haml', value: 'haml' },
  { label: 'Handlebars', value: 'handlebars' },
  { label: 'Haskell', value: 'haskell' },
  { label: 'Haxe', value: 'haxe' },
  { label: 'HTTP', value: 'http' },
  { label: 'Icon', value: 'icon' },
  { label: 'Inform 7', value: 'inform7' },
  { label: 'Ini', value: 'ini' },
  { label: 'J', value: 'j' },
  { label: 'Jade', value: 'jade' },
  { label: 'Jolie', value: 'jolie' },
  { label: 'Julia', value: 'julia' },
  { label: 'Keyman', value: 'keyman' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'LaTeX', value: 'latex' },
  { label: 'Less', value: 'less' },
  { label: 'LiveScript', value: 'livescript' },
  { label: 'LOLCODE', value: 'lolcode' },
  { label: 'Lua', value: 'lua' },
  { label: 'Makefile', value: 'makefile' },
  { label: 'MATLAB', value: 'matlab' },
  { label: 'MEL', value: 'mel' },
  { label: 'Mizar', value: 'mizar' },
  { label: 'Monkey', value: 'monkey' },
  { label: 'N4JS', value: 'n4js' },
  { label: 'NASM', value: 'nasm' },
  { label: 'nginx', value: 'nginx' },
  { label: 'Nim', value: 'nim' },
  { label: 'Nix', value: 'nix' },
  { label: 'NSIS', value: 'nsis' },
  { label: 'Objective-C', value: 'objectivec' },
  { label: 'OCaml', value: 'ocaml' },
  { label: 'OpenCL', value: 'opencl' },
  { label: 'Oz', value: 'oz' },
  { label: 'PARI/GP', value: 'parigp' },
  { label: 'Parser', value: 'parser' },
  { label: 'Pascal', value: 'pascal' },
  // { label: 'PHP Extras', value: 'php-extras' },
  { label: 'PowerShell', value: 'powershell' },
  { label: 'Processing', value: 'processing' },
  { label: 'Prolog', value: 'prolog' },
  { label: '.properties', value: 'properties' },
  { label: 'Protocol Buffers', value: 'protobuf' },
  { label: 'Puppet', value: 'puppet' },
  { label: 'Pure', value: 'pure' },
  { label: 'Python', value: 'python' },
  { label: 'Q', value: 'q' },
  { label: 'Qore', value: 'qore' },
  { label: 'R', value: 'r' },
  { label: 'Ren\'py', value: 'renpy' },
  { label: 'Reason', value: 'reason' },
  { label: 'reST (reStructuredText)', value: 'rest' },
  { label: 'Rip', value: 'rip' },
  { label: 'Roboconf', value: 'roboconf' },
  { label: 'Rust', value: 'rust' },
  { label: 'SAS', value: 'sas' },
  { label: 'Scala', value: 'scala' },
  { label: 'Scheme', value: 'scheme' },
  { label: 'Smalltalk', value: 'smalltalk' },
  { label: 'Smarty', value: 'smarty' },
  { label: 'SQL', value: 'sql' },
  { label: 'Stylus', value: 'stylus' },
  { label: 'Swift', value: 'swift' },
  { label: 'Tcl', value: 'tcl' },
  { label: 'Textile', value: 'textile' },
  { label: 'Twig', value: 'twig' },
  { label: 'VB.Net', value: 'vbnet' },
  { label: 'Verilog', value: 'verilog' },
  { label: 'VHDL', value: 'vhdl' },
  { label: 'Wiki markup', value: 'wiki' },
  { label: 'Xojo (REALbasic)', value: 'xojo' },
]

let EditorToolbarConfig: ToolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'CODE_BLOCK_BUTTON', 'LINK_BUTTONS', 'IMAGE_BUTTON', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS,
  BLOCK_TYPE_DROPDOWN,
  BLOCK_TYPE_BUTTONS,
  PRISM_SUPPORTED_LANGUAGES
};

export default EditorToolbarConfig;
