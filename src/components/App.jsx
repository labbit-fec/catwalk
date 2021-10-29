import React from 'react';
import Overview from './overview/Overview';
import QA from './q&a/QA';
import Ratings from './ratings/Ratings';
import Related from './related/Related';

const App = () => (
  <div>
    <Overview />
    <QA />
    <Ratings />
    <Related />
  </div>
);

export default App;
