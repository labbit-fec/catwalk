import React, { useState, useCallback } from 'react';
import styles from './RatingDetail.css';
import RatingCount from './RatingCount/RatingCount';
import RatingList from './RatingList/RatingList';

export default function RatingDetail() {
  const [sortBy, setSortBy] = useState('newest');

  const handleChange = useCallback(
    (event) => {
      event.preventDefault();
      setSortBy(event.target.value);
    },
    [sortBy]
  );

  return (
    <div className={styles.content}>
      <RatingCount sortBy={sortBy} handleChange={handleChange} />
      <RatingList sortBy={sortBy} />
    </div>
  );
}
