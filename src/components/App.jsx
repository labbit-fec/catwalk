import React from 'react';
import Overview from './overview/Overview.jsx';
import QA from './q&a/QA.jsx';
import Ratings from './ratings/Ratings.jsx';
import Related from './related/Related.jsx';

const App = () => (
  <div>
    <Overview />
    <QA />
    <Ratings />
    <Related />
  </div>
);

export default App;