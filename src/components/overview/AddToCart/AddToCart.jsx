import React, { useState, useContext, useEffect } from 'react';
import styles from './AddToCart.css';
import selectedStyleContext from '../context/SelectedStyleContext';
import styleDataContext from '../context/StyleDataContext';

const AddToCart = () => {
  const { styleData } = useContext(styleDataContext);
  const { selectedStyleIndex } = useContext(selectedStyleContext);
  const [sizeOptions, setSizeOptions] = useState([]);

  useEffect(() => {
    const newSizeOptions = [];
    if (styleData[selectedStyleIndex] !== undefined) {
      const { skus } = styleData[selectedStyleIndex];
      const skusKeys = Object.keys(skus);
      skusKeys.forEach((sku) => {
        if (skus[sku].quantity > 0) {
          newSizeOptions.push(<option value="small">{skus[sku].size}</option>);
        }
      });
      if (newSizeOptions.length === 0) {
        newSizeOptions.push(<option value="Out of Stock">Out of Stock</option>);
      } else {
        newSizeOptions.unshift(
          <option value="select size">SELECT SIZE</option>
        );
      }
    }
    setSizeOptions(newSizeOptions);
  }, [styleData, selectedStyleIndex]);

  return (
    <div className={styles.container}>
      Add To Cart
      <form>
        <div className={styles.row}>
          <select name="size">{sizeOptions}</select>
          <select name="quantity">
            <option value="">-</option>
          </select>
        </div>
        <button type="button">Add to Bag</button>
      </form>
    </div>
  );
};

export default AddToCart;
