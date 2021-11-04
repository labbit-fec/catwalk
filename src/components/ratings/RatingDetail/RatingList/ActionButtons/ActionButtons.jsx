import React from 'react';
import { VscAdd } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import styles from './ActionButtons.css';

export default function ActionButtons({
  moreReviews,
  moreClickHandler,
  addClickHandler,
  showAddReviews,
}) {
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
      {showAddReviews && (
        <button
          type="button"
          className={`${styles.actionButton} ${styles.addReviewButton}`}
          onClick={addClickHandler}
        >
          <VscAdd />
          &nbsp;Add a review
        </button>
      )}
    </div>
  );
}

ActionButtons.propTypes = {
  moreClickHandler: PropTypes.func.isRequired,
  moreReviews: PropTypes.bool.isRequired,
  addClickHandler: PropTypes.func.isRequired,
  showAddReviews: PropTypes.bool.isRequired,
};
