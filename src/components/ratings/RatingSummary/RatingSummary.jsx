import React from 'react';
import styles from './RatingSummary.css';
import Stars from './Stars/Stars';
import Recommendations from './Recommendations/Recommendations';
import Bars from './Bars/Bars';
import Sliders from './Sliders/Sliders';

export default function RatingSummary() {
  return (
    <div className={styles.container}>
      <Stars />
      <Recommendations />
      <Bars />
      <Sliders />
    </div>
  );
}
