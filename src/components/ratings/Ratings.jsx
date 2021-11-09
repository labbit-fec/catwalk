import React, { useState, createContext } from 'react';
import styles from './Ratings.css';
import RatingSummary from './RatingSummary/RatingSummary';
import RatingDetail from './RatingDetail/RatingDetail';

import StarFilterContext from './context/StarFilterContext';

export default function Ratings() {
  const [starFilter, setStarFilter] = useState({
    starsToShow: { 1: false, 2: false, 3: false, 4: false, 5: false },
    filtering: false,
  });

  return (
    <div className={styles.container}>
      <h3>Ratings & Reviews</h3>
      <div className={styles.content}>
        <StarFilterContext.Provider value={{ ...starFilter, setStarFilter }}>
          <RatingSummary />
          <RatingDetail />
        </StarFilterContext.Provider>
      </div>
    </div>
  );
}
