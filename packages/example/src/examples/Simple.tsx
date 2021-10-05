import { useState } from 'react'
import { Plate } from '@udecode/plate'

const editableProps = {
  placeholder: 'Type a cool text...',
  style: {
    padding: '15px',
  },
};

const initialValue: any= [
  {
    children: [
      {
        text:
          'This is editable plain text with react and history plugins, just like a <textarea>!',
      },
    ],
  },
];

const Simple = () => {
  const [debugValue, setDebugValue] = useState<any>(null);
  const onChangeDebug = (newValue: any) => {
    setDebugValue(`value ${JSON.stringify(newValue)}`);
  }
  return (
    <Plate
      id="1"
      editableProps={editableProps}
      initialValue={initialValue}
      onChange={onChangeDebug}
    >
      {debugValue}
    </Plate>
  );
}

export default Simple;
