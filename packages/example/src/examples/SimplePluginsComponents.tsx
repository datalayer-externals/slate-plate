import { useState } from 'react'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_PARAGRAPH,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_CODE,
  Plate,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createHistoryPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  createPlateOptions
} from '@udecode/plate';
import { createPlateComponents } from '../utils/createPlateComponents';

// Quick helper to create a block element with (marked) text
export const createElement = (
  text = '',
  {
    type = ELEMENT_PARAGRAPH,
    mark,
  }: {
    type?: string;
    mark?: string;
  } = {}
) => {
  const leaf: any = { text };
  if (mark) {
    leaf[mark] = true;
  }
  return {
    type,
    children: [leaf],
  };
};

const initialValue = [
  createElement('🧱 Elements', { type: ELEMENT_H1 }),
  createElement('🔥 Basic Elements', { type: ELEMENT_H2 }),
  createElement('These are the most common elements, known as blocks:'),
  createElement('Heading 1', { type: ELEMENT_H1 }),
  createElement('Heading 2', { type: ELEMENT_H2 }),
  createElement('Heading 3', { type: ELEMENT_H3 }),
  createElement('Heading 4', { type: ELEMENT_H4 }),
  createElement('Heading 5', { type: ELEMENT_H5 }),
  createElement('Heading 6', { type: ELEMENT_H6 }),
  createElement('Blockquote', { type: ELEMENT_BLOCKQUOTE }),
  {
    type: ELEMENT_CODE_BLOCK,
    children: [
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const a = 'Hello';",
          },
        ],
      },
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const b = 'World';",
          },
        ],
      },
    ],
  },
  createElement('💅 Marks', { type: ELEMENT_H1 }),
  createElement('💧 Basic Marks', { type: ELEMENT_H2 }),
  createElement(
    'The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code.'
  ),
  createElement(
    'You can customize the type, the component and the hotkey for each of these.'
  ),
  createElement('This text is bold.', { mark: MARK_BOLD }),
  createElement('This text is italic.', { mark: MARK_ITALIC }),
  createElement('This text is underlined.', {
    mark: MARK_UNDERLINE,
  }),
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text is bold, italic and underlined.',
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
      },
    ],
  },
  createElement('This is a strikethrough text.', {
    mark: MARK_STRIKETHROUGH,
  }),
  createElement('This is an inline code.', { mark: MARK_CODE }),
]

const editableProps = {
  placeholder: 'Type…',
  style: {
    padding: '15px',
  },
};

const plugins = [
  // editor
  createReactPlugin(),          // withReact
  createHistoryPlugin(),        // withHistory
  // elements
  createParagraphPlugin(),      // paragraph element
  createBlockquotePlugin(),     // blockquote element
  createCodeBlockPlugin(),      // code block element
  createHeadingPlugin(),        // heading elements
  // marks
  createBoldPlugin(),           // bold mark
  createItalicPlugin(),         // italic mark
  createUnderlinePlugin(),      // underline mark
  createStrikethroughPlugin(),  // strikethrough mark
  createCodePlugin(),           // code mark
];

const components = createPlateComponents();
const options = createPlateOptions();

const SimplePluginsComponent = () => {
  const [debugValue, setDebugValue] = useState<any>(null);
  const onChangeDebug = (newValue: any) => {
    setDebugValue(`value ${JSON.stringify(newValue)}`);
  }
  return (
    <Plate
      components={components}
      editableProps={editableProps}
      id="1"
      initialValue={initialValue}
      onChange={onChangeDebug}
      options={options}
      plugins={plugins}
    >
      {debugValue}
    </Plate>
  );
}

export default SimplePluginsComponent;
