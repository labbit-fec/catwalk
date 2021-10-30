import React from 'react';
import styles from './Ratings.css';
import RatingSummary from './RatingSummary/RatingSummary';
import RatingDetail from './RatingDetail/RatingDetail';

export default function Ratings() {
  return (
    <div className={styles.container}>
      <h3>Ratings & Reviews</h3>
      <div className={styles.content}>
        <RatingSummary />
        <RatingDetail />
      </div>
    </div>
  );
}
