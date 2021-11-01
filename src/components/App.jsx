import React from 'react';
import Overview from './overview/Overview';
import QA from './q&a/QA';
import Ratings from './ratings/Ratings';
import Related from './related/Related';
import styles from './App.css';

const App = () => (
  <div className={styles.container}>
    App Container
    <div className={styles.content}>
      Main Content
      <Overview />
      <Related />
      <QA />
      <Ratings />
    </div>
  </div>
);

export default App;
