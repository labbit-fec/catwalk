import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductIdContext from './context/ProductIdContext';
import Overview from './overview/Overview';
import QA from './q&a/QA';
import Ratings from './ratings/Ratings';
import Related from './related/Related';
import styles from './App.css';

export default function App() {
  const [productId, setProductId] = useState(61618);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);

  if (!load) {
    const getNameFromUrl = () => {
      const segments = window.location.pathname.split('/');
      return segments[2];
    };

    const productURLName = getNameFromUrl();

    if (productURLName) {
      axios
        .get('/products', {
          params: {
            name: productURLName,
          },
        })
        .then((response) => {
          setProductId(response.data.id);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Error getting product', error);
        });
    } else {
      setLoading(false);
    }

    setLoad(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>Limitless</div>
      {loading ? (
        <div className="loading">loading</div>
      ) : (
        <div className={styles.content}>
          <ProductIdContext.Provider value={{ productId, setProductId }}>
            <Overview />
            <QA />
            <Ratings />
          </ProductIdContext.Provider>
        </div>
      )}
    </div>
  );
}
