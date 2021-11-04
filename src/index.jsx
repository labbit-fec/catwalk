import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import worker from '../mocks/front/browser';

// if (process.env.NODE_ENV === 'development') {
//   debugger;
//   worker.start();
//   console.log(worker);
// }

ReactDOM.render(<App />, document.getElementById('root'));
