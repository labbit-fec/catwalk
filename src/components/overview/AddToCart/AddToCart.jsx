import React from 'react';
import styles from './AddToCart.css';

const AddToCart = () => (
  <div className={styles.container}>
    Add To Cart
    <div className={styles.row}>
      <select name="Size" id="pet-select">
        <option value="">SELECT SIZE</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <select name="Quantity" id="pet-select">
        <option value="">1</option>
        <option value="small">2</option>
        <option value="medium">3</option>
        <option value="large">4</option>
      </select>
    </div>
    <button type="button">Add to Bag</button>
  </div>
);

export default AddToCart;
