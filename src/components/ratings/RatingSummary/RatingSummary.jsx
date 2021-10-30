import React from 'react';
import styles from './RatingSummary.css';
import Stars from './Stars/Stars';
import Recommendations from './Recommendations/Recommendations';
import Sliders from './Sliders/Sliders';

export default function RatingSummary() {
  return (
    <div className={styles.container}>
      <h3>RatingSummary</h3>
      <div className={styles.content}>
        <Stars />
        <Recommendations />
        <Sliders />
      </div>
    </div>
  );
}
