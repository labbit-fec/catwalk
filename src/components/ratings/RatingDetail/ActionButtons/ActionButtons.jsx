import React from 'react';
import { VscAdd } from 'react-icons/vsc';
import styles from './ActionButtons.css';

export default function ActionButtons() {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.actionButton}>
        More reviews
      </button>
      <button
        type="button"
        className={`${styles.actionButton} ${styles.addReviewButton}`}
      >
        <VscAdd />
        &nbsp;Add a review
      </button>
    </div>
  );
}
