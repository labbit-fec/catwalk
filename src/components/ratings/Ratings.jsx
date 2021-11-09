import React, { useState, useContext } from 'react';
import styles from './Ratings.css';
import RatingSummary from './RatingSummary/RatingSummary';
import RatingDetail from './RatingDetail/RatingDetail';
import StarFilterContext from './context/StarFilterContext';

export default function Ratings() {
  const [starFilter, setStarFilter] = useState(null);

  return (
    <div className={styles.container}>
      <h3>Ratings & Reviews</h3>
      <div className={styles.content}>
        <StarFilterContext.Provider value={{ starFilter, setStarFilter }}>
          <RatingSummary />
          <RatingDetail />
        </StarFilterContext.Provider>
      </div>
    </div>
  );
}
