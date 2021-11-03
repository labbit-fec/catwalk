import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { worker } = require('../mocks/front/browser');
  worker.start();
}

ReactDOM.render(<App />, document.getElementById('root'));
