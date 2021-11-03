import React from 'react';
import styles from './ImageGallery.css';

const ImageGallery = () => (
  <div className={styles.container}>
    Image Gallery
    <img
        className={styles.img}
        src="https://images.unsplash.com/photo-1613758479550-c3fe095bd333?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
        alt="Corgi Wearing Warm Coat in a Snowy Forest"
      />
  </div>
);

export default ImageGallery;
