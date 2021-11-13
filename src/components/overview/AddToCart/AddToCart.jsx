import React, { useState, useContext, useEffect } from 'react';
import styles from './AddToCart.css';
import selectedStyleContext from '../context/SelectedStyleContext';
import styleDataContext from '../context/StyleDataContext';

const AddToCart = () => {
  const { styleData } = useContext(styleDataContext);
  const { selectedStyleIndex } = useContext(selectedStyleContext);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [quantityOptions, setQuanitityOptions] = useState([]);

  useEffect(() => {
    const newSizeOptions = [];
    if (styleData[selectedStyleIndex] !== undefined) {
      const { skus } = styleData[selectedStyleIndex];
      const skusKeys = Object.keys(skus);
      skusKeys.forEach((sku) => {
        if (skus[sku].quantity > 0) {
          newSizeOptions.push(<option value={sku}>{skus[sku].size}</option>);
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
    setQuanitityOptions([<option value="">-</option>]);
  }, [styleData, selectedStyleIndex]);

  const onSizeSelect = (e) => {
    const newQuantityOptions = [];
    const { quantity } = styleData[selectedStyleIndex].skus[e.target.value];
    for (let index = 1; index < 16 && index < quantity; index += 1) {
      newQuantityOptions.push(<option value={index}>{index}</option>);
    }
    setQuanitityOptions(newQuantityOptions);
  };

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.row}>
          <select name="size" onChange={onSizeSelect}>
            {sizeOptions}
          </select>
          <select name="quantity">{quantityOptions}</select>
        </div>
        <div className={styles.add}>
          <button type="button" className="btn btn-primary">
            Add to Bag
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddToCart;
