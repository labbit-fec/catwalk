import React from 'react';
import { VscAdd } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import styles from './ActionButtons.css';

export default function ActionButtons({ moreReviews, moreClickHandler }) {
  return (
    <div className={styles.container}>
      {moreReviews && (
        <button
          type="button"
          className={styles.actionButton}
          onClick={moreClickHandler}
        >
          More reviews
        </button>
      )}
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

ActionButtons.propTypes = {
  moreClickHandler: PropTypes.func.isRequired,
  moreReviews: PropTypes.bool.isRequired,
};
