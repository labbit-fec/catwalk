import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import styles from './Bars.css';
import Slider from './Bar/Bar';
import { ProductIdContext } from '../../../context/ProductIdContext';

export default function Sliders() {
  const { productId } = useContext(ProductIdContext);
  const [ratings, setRatings] = useState([]);

  function getRatings() {
    return axios.get('/api/reviews/meta/ratings', {
      params: {
        productId: productId,
      },
    });
  }

  useEffect(() => {
    getRatings().then((response) => {
      setRatings(response.data.ratings);
    });
  }, []);

  return (
    <div className={styles.container}>
      {ratings.map(({ rating, count, percent }) => (
        <Slider rating={rating} count={count} percent={percent} />
      ))}
    </div>
  );
}
