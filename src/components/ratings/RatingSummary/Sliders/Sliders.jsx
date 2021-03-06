import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Slider from './Slider/Slider';
import styles from './Sliders.css';
import ProductIdContext from '../../../context/ProductIdContext';

export default function Sliders() {
  const [characteristics, setCharacteristics] = useState({});
  const { productId } = useContext(ProductIdContext);

  useEffect(() => {
    function getCharacteristics() {
      return axios.get('/api/reviews/meta/characteristics', {
        params: {
          productId: productId,
        },
      });
    }

    getCharacteristics().then((response) => {
      setCharacteristics(response.data.characteristics);
    });
  }, [productId]);

  return (
    <div className={styles.container}>
      {Object.keys(characteristics).reduce(
        (memo, char) => memo + characteristics[char].value,
        0
      ) > 0 &&
        Object.keys(characteristics).map((characteristic) => (
          <Slider
            characteristic={characteristic}
            legend={characteristics[characteristic].legend}
            average={characteristics[characteristic].value}
          />
        ))}
    </div>
  );
}
