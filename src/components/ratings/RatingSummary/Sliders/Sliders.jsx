import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Slider from './Slider/Slider';
import styles from './Sliders.css';
import { ProductIdContext } from '../../../context/ProductIdContext';

export default function Sliders() {
  const [characteristics, setCharacteristics] = useState({});
  const { productId } = useContext(ProductIdContext);

  function getCharacteristics() {
    return axios.get('/api/reviews/meta/characteristics', {
      params: {
        productId: productId,
      },
    });
  }

  useEffect(() => {
    console.log('use effect: sliders');
    getCharacteristics().then((response) => {
      setCharacteristics(response.data.characteristics);
    });
  }, []);

  return (
    <div className={styles.container}>
      {Object.keys(characteristics).map((characteristic) => (
        <Slider
          characteristic={characteristic}
          average={characteristics[characteristic].value}
        />
      ))}
    </div>
  );
}
