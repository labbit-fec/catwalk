import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './Stars.css';
import StarGraphic from './StarGraphic/StarGraphic';
import { ProductIdContext } from '../../../context/ProductIdContext';

export default function Stars() {
  const [stars, setStars] = useState(0);
  const { productId } = useContext(ProductIdContext);

  function getStars() {
    return axios.get('/api/reviews/stars', {
      params: {
        productId: productId,
      },
    });
  }

  useEffect(() => {
    getStars().then((response) => {
      setStars(response.data.stars);
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.starCount}>{stars.toFixed(1)}</div>
      <StarGraphic stars={stars} />
    </div>
  );
}
