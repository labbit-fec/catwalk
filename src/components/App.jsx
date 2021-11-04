import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductIdContext } from './context/ProductIdContext';
import Overview from './overview/Overview';
import QA from './q&a/QA';
import Ratings from './ratings/Ratings';
import Related from './related/Related';
import styles from './App.css';

export default function App() {
  const [productId, setProductId] = useState(61575);

  useEffect(() => {
    const getNameFromUrl = () => {
      const segments = window.location.pathname.split('/');
      return segments[0];
    };

    const productURLName = getNameFromUrl();

    axios
      .get('/product', {
        params: {
          name: productURLName,
        },
      })
      .then((response) => {
        setProductId(response.data.Product.id);
      })
      .catch((error) => {
        console.log('Error getting product', error);
      });
  }, []);

  return (
    <div className={styles.container}>
      App Container
      <div className={styles.content}>
        Main Content of {productId}
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
