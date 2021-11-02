import React from 'react';
import { VscCheck } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import styles from './RatingListEntry.css';
import StarGraphic from '../../../RatingSummary/Stars/StarGraphic/StarGraphic';

export default function RatingListEntry({ review }) {
  return (
    <div className={styles.content}>
      <div className={styles.ratingHeader}>
        <StarGraphic stars={review.rating} />
        <div>{`${review.reviewer_name}, ${new Date(
          review.date
        ).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}`}</div>
      </div>
      <div className={styles.ratingTitle}>{review.summary}</div>
      <div className={styles.ratingBody}>{review.body}</div>
      {review.recommend && (
        <div className={styles.check}>
          <VscCheck /> I recommend this product
        </div>
      )}
      {review.response.length > 0 && (
        <div className={styles.response}>
          <strong>Response:</strong>
          <p>{review.response}</p>
        </div>
      )}
      <div className={styles.helpful}>
        <div>Helpful?</div>
        <div>
          <button type="button" className={styles.btnHelpful}>
            Yes
          </button>
          ({review.helpfulness})
        </div>
        <div>
          <button
            type="button"
            className={`${styles.btnHelpful} ${styles.report}`}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

RatingListEntry.propTypes = {
  review: PropTypes.shape({
    review_id: PropTypes.number,
    rating: PropTypes.number,
    summary: PropTypes.string,
    recommend: PropTypes.bool,
    response: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    reviewer_name: PropTypes.string,
    helpfulness: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
