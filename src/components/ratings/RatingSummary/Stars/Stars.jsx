import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Stars.css';
import StarGraphic from './StarGraphic/StarGraphic';

export default function Stars() {
  const [stars, setStars] = useState(0);

  function getStars() {
    return axios.get('/api/reviews/stars', {
      params: {
        productId: 61575,
      },
    });
  }

  useEffect(() => {
    getStars()
      .then((response) => {
        setStars(response.data.stars);
        console.log(response.data.stars);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className={styles.container}>
      <div className={styles.starCount}>{stars}</div>
      <StarGraphic stars={stars} />
    </div>
  );
}
