import React from 'react';
import styles from './RatingCount.css';

export default function RatingCount() {
  return (
    <div className={styles.container}>
      <p>
        <strong>
          248 reviews, sorted by
          <button type="button" className={styles.btnSortBy}>
            relevance ⌄
          </button>
        </strong>
      </p>
    </div>
  );
}
