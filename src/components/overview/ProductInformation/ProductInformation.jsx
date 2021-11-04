import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductInformation.css';
import StarGraphic from '../../ratings/RatingSummary/Stars/StarGraphic/StarGraphic';


const ProductInformation = () => {
  const [productTitle, setProductTitle] = useState('Placeholder Title');

  useEffect(() => {
    axios
      .get('/product')
      .then((response) => {
        setProductTitle(response.data.Product.title);
      })
      .catch((error) => {
        console.log('Error getting product', error);
      });
  }, []);

  return (
  <div className={styles.container}>
    Product Information
    <StarGraphic stars={4} />
    <div className={styles.category}>Category</div>
    <h1 className={styles.title}>{productTitle}</h1>
    <div className={styles.price}>$395</div>
  </div>
  );
};

export default ProductInformation;
