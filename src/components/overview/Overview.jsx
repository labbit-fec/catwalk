import React from 'react';
import styles from './Overview.css';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';

const Overview = () => (
  <div className={styles.container}>
    Product Overview
    <ImageGallery />
    <AddToCart />
  </div>
);

export default Overview;
