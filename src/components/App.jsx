import React, { useState } from 'react';
import { ProductIdContext } from './context/ProductIdContext';
import Overview from './overview/Overview';
import QA from './q&a/QA';
import Ratings from './ratings/Ratings';
import Related from './related/Related';
import styles from './App.css';

export default function App() {
  const [productId, setProductId] = useState(61576);
  return (
    <div className={styles.container}>
      App Container
      <div className={styles.content}>
        Main Content
        <ProductIdContext.Provider value={{ productId, setProductId }}>
          <Overview />
          <Related />
          <QA />
          <Ratings />
        </ProductIdContext.Provider>
      </div>
    </div>
  );
}
