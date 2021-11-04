import React, { useState, useEffect } from 'react';
import { VscCheck } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './RatingListEntry.css';
import StarGraphic from '../../../RatingSummary/Stars/StarGraphic/StarGraphic';
import RatingImages from './RatingImages/RatingImages';

export default function RatingListEntry({ review }) {
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  function handleHelpfulClick(event) {
    event.preventDefault();
    axios.put(`/api/reviews/${review.review_id}/helpful`).then(() => {
      setMarkedHelpful(true);
    });
  }

  function handleReportClick(event) {
    event.preventDefault();
    axios.put(`/api/reviews/${review.review_id}/report`).then(() => {
      setReported(true);
    });
  }

  const [helpfulForm, setHelpfulForm] = useState(
    <div className={styles.helpful}>
      <div>Helpful?</div>
      <div>
        <button
          type="button"
          className={styles.btnHelpful}
          onClick={handleHelpfulClick}
        >
          Yes
        </button>
        ({review.helpfulness})
      </div>
      <div>
        <button
          type="button"
          className={`${styles.btnHelpful} ${styles.report}`}
          onClick={handleReportClick}
        >
          Report
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (markedHelpful) {
      setHelpfulForm(
        <div className={styles.helpful}>
          <em>Thank you for marking this as helpful!</em>
        </div>
      );
    }

    if (reported) {
      setHelpfulForm(
        <div className={styles.helpful}>You have reported this review</div>
      );
    }
  }, [markedHelpful, reported]);

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
      <div className={styles.ratingBody}>
        {review.body}
        {review.photos.length > 0 && <RatingImages photos={review.photos} />}
      </div>
      {review.recommend && (
        <div className={styles.check}>
          <VscCheck /> <strong>{review.reviewer_name}</strong> &nbsp;recommends
          this product
        </div>
      )}
      {review.response && review.response.length > 0 && (
        <div className={styles.response}>
          <strong>Response:</strong>
          <p>{review.response}</p>
        </div>
      )}
      {helpfulForm}
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
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};
