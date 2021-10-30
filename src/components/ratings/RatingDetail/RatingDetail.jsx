import React from 'react';
import styles from './RatingDetail.css';
import RatingCount from './RatingCount/RatingCount';
import RatingList from './RatingList/RatingList';

export default function RatingDetail() {
  return (
    <div className={styles.container}>
      <h3>RatingDetail</h3>
      <div className={styles.content}>
        <RatingCount />
        <RatingList />
      </div>
    </div>
  );
}
