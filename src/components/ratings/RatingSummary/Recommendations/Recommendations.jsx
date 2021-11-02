import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Recommendations.css';
import { ProductIdContext } from '../../../context/ProductIdContext';

export default function Recommendations() {
  const { productId } = useContext(ProductIdContext);
  const [recommendations, setRecommendations] = useState(0);

  function getRecommendations() {
    return axios.get('/api/reviews/meta/recommended', {
      params: {
        productId: productId,
      },
    });
  }

  useEffect(() => {
    console.log('use effect: stars');
    getRecommendations().then((response) => {
      setRecommendations(response.data.recommended);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div>
        {`${parseFloat(recommendations * 100).toFixed()}%`} of reviews recommend
        this product
      </div>
    </div>
  );
}
