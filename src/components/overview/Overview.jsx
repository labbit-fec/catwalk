import React from 'react';
import styles from './Overview.css';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';
import ProductInformation from './ProductInformation/ProductInformation';
import StyleSelector from './StyleSelector/StyleSelector';
import ProductTextOverview from './ProductTextOverview/ProductTextOverview';

const Overview = () => (
  <div className={styles.container}>
    Product Overview
    <ImageGallery />
    <ProductInformation />
    <StyleSelector />
    <AddToCart />
    <ProductTextOverview />
  </div>
);

export default Overview;
