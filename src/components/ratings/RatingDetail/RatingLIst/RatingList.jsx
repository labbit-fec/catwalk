import React from 'react';
import styles from './RatingList.css';
import RatingListEntry from './RatingListEntry/RatingListEntry';

export default function RatingList() {
  return (
    <div className={styles.content}>
      <RatingListEntry />
      <RatingListEntry />
    </div>
  );
}
