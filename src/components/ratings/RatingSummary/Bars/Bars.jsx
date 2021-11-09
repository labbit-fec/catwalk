import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import styles from './Bars.css';
import Slider from './Bar/Bar';
import ProductIdContext from '../../../context/ProductIdContext';
import StarFilterContext from '../../context/StarFilterContext';

export default function Sliders() {
  const { productId } = useContext(ProductIdContext);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    function getRatings() {
      return axios.get('/api/reviews/meta/ratings', {
        params: {
          productId: productId,
        },
      });
    }

    getRatings().then((response) => {
      setRatings(response.data.ratings);
    });
  }, [productId]);

  return (
    <div className={styles.container}>
      {ratings.reduce((memo, rating) => memo + rating.count, 0) > 0 &&
        ratings.map(({ rating, count, percent }) => (
          <Slider rating={rating} count={count} percent={percent} />
        ))}
    </div>
  );
}
