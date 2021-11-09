import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Recommendations.css';
import ProductIdContext from '../../../context/ProductIdContext';

export default function Recommendations() {
  const { productId } = useContext(ProductIdContext);
  const [recommendations, setRecommendations] = useState(0);

  useEffect(() => {
    function getRecommendations() {
      return axios.get('/api/reviews/meta/recommended', {
        params: {
          productId: productId,
        },
      });
    }

    getRecommendations().then((response) => {
      setRecommendations(response.data.recommended);
    });
  }, [productId]);

  return (
    <div className={styles.container}>
      <div>
        {recommendations === null
          ? 'This product has no recommendations yet.'
          : `${parseFloat(
              recommendations * 100
            ).toFixed()}% of reviews recommend this product.`}
      </div>
    </div>
  );
}
