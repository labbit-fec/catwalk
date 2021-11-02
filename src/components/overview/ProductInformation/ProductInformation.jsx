import React from 'react';
import styles from './ProductInformation.css';
import StarGraphic from '../../ratings/RatingSummary/Stars/StarGraphic/StarGraphic';

const ProductInformation = () => (
  <div className={styles.container}>
    Product Information
    <StarGraphic stars={4} />
    <div className={styles.category}>Category</div>
    <h1 className={styles.title}>Product Title</h1>
    <div className={styles.price}>$395</div>
  </div>
);

export default ProductInformation;
