import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './RatingList.css';
import RatingListEntry from './RatingListEntry/RatingListEntry';
import { ProductIdContext } from '../../../context/ProductIdContext';

export default function RatingList() {
  const [reviewList, setReviewList] = useState([]);
  const productId = useContext(ProductIdContext);

  function getFirstTwoReviews() {
    return axios.get('/reviews/firstTwoReviews', {
      params: {
        productId,
      },
    });
  }

  useEffect(() => {
    getFirstTwoReviews().then((response) => {
      setReviewList(response.reviews);
    });
  }, []);

  return (
    <div className={styles.content}>
      {reviewList.map((review) => (
        <RatingListEntry key={review.review_id} review={review} />
      ))}
    </div>
  );
}
