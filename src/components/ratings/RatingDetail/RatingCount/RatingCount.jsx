import React from 'react';
import styles from './RatingCount.css';

export default function RatingCount({ sortBy, handleChange }) {
  return (
    <div className={styles.container}>
      <p>
        <strong>
          <label htmlFor="sort-select">
            248 reviews, sorted by
            <select value={sortBy} id="sort-select" onChange={handleChange}>
              <option value="newest">Newest</option>
              <option value="helpful">Most helpful</option>
              <option value="relevent">Most relevant</option>
            </select>
          </label>
        </strong>
      </p>
    </div>
  );
}
