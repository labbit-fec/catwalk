import React, { useState, useCallback } from 'react';
import styles from './RatingDetail.css';
import RatingCount from './RatingCount/RatingCount';
import RatingList from './RatingList/RatingList';

export default function RatingDetail() {
  const [sortBy, setSortBy] = useState('newest');

  const handleChange = (event) => {
    event.preventDefault();
    setSortBy(event.target.value);
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.scrollTop = 0;
  };

  return (
    <div className={styles.content}>
      <RatingCount sortBy={sortBy} handleChange={handleChange} />
      <RatingList sortBy={sortBy} />
    </div>
  );
}
