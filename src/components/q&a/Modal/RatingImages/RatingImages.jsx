import React from 'react';
import PropTypes from 'prop-types';
import styles from './RatingImages.css';

export default function RatingImages({ photos }) {
  return (
    <div className={styles.reviewImages}>
      {photos.map((photo) => (
        <div className={styles.reviewImage}>
          <img src={photo.url} alt="review" />
        </div>
      ))}
    </div>
  );
}

RatingImages.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })
  ).isRequired,
};
