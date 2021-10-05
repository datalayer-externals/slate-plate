import { render } from 'react-dom';
import Example from './examples/SimplePluginsComponents';

import 'tippy.js/dist/tippy.css';

import './index.css';

render(
  <Example />,
  document.getElementById('root'),
);
