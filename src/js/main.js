import 'material-design-lite/material.css';
import 'material-design-lite/material.js';
import '../css/main.scss';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';

// can be removed after react 1.0
injectTapEventPlugin();

React.render(<App />, document.getElementById('root'));
