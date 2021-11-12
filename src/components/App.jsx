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

  useEffect(() => {
    const getNameFromUrl = () => {
      const segments = window.location.pathname.split('/');
      return segments[2];
    };

    const productURLName = getNameFromUrl();

    axios
      .get('/products', {
        params: {
          name: productURLName,
        },
      })
      .then((response) => {
        setProductId(response.data.id);
      })
      .catch((error) => {
        console.log('Error getting product', error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>Limitless</div>
      <div className={styles.content}>
        {/* <div id="style-guide">
          <button type="button" className="btn btn-primary">
            Button
          </button>
          <button type="button" className="btn btn-secondary">
            Button
          </button>
        </div> */}
        {/* Main Content of {productId} */}
        <ProductIdContext.Provider value={{ productId, setProductId }}>
          <Overview />
          {/* <Related /> */}
          <QA />
          <Ratings />
        </ProductIdContext.Provider>
      </div>
      {/*       <div className="bg-modal">
        <div className="modal-content">Hello</div>
      </div> */}
    </div>
  );
}
