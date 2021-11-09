import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './Stars.css';
import StarGraphic from './StarGraphic/StarGraphic';
import ProductIdContext from '../../../context/ProductIdContext';

export default function Stars() {
  const [stars, setStars] = useState(null);
  const { productId } = useContext(ProductIdContext);

  useEffect(() => {
    function getStars() {
      return axios.get('/api/reviews/meta/stars', {
        params: {
          productId: productId,
        },
      });
    }

    getStars().then((response) => {
      setStars(response.data.stars);
    });
  }, [productId]);

  return (
    <div className={styles.container}>
      {stars ? (
        <>
          <div className={styles.starCount}>{stars.toFixed(1)}</div>
          <StarGraphic stars={stars || 0} />
        </>
      ) : (
        <div>This product has no ratings yet.</div>
      )}
    </div>
  );
}
