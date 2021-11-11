import React from 'react';
import { VscAdd } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import styles from './ActionButtons.css';

export default function ActionButtons({
  showMoreReviews,
  moreClickHandler,
  addClickHandler,
  showAddReviews,
}) {
  return (
    <div className={styles.container}>
      {showMoreReviews && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={moreClickHandler}
        >
          More reviews
        </button>
      )}
      {showAddReviews && (
        <button
          type="button"
          className="btn btn-primary"
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
  showMoreReviews: PropTypes.bool.isRequired,
  addClickHandler: PropTypes.func.isRequired,
  showAddReviews: PropTypes.bool.isRequired,
};
