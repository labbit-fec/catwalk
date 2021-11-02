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
        <div>{`${review.reviewer_name}, ${review.date}`}</div>
      </div>
      <div className={styles.ratingTitle}>Donut chocolate bar pudding.</div>
      <div className={styles.ratingBody}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu dolor
        nibh. Curabitur non vestibulum massa. Curabitur erat purus, consequat
        sit amet sem laoreet, lacinia gravida dolor. Pellentesque faucibus odio
        ut ex facilisis rutrum. Quisque sed arcu a massa suscipit euismod.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas.
      </div>
      <div className={styles.check}>
        <VscCheck /> I recommend this product
      </div>
      <div className={styles.response}>
        <strong>Response:</strong>
        <p>
          Marzipan danish jelly beans gummi bears apple pie cheesecake topping
          biscuit sesame snaps.
        </p>
      </div>
      <div className={styles.helpful}>
        <div>Helpful?</div>
        <div>
          <button type="button" className={styles.btnHelpful}>
            Yes
          </button>
          (10)
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
