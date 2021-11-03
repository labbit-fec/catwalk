import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './RatingList.css';
import RatingListEntry from './RatingListEntry/RatingListEntry';
import { ProductIdContext } from '../../../context/ProductIdContext';
import ActionButtons from './ActionButtons/ActionButtons';

export default function RatingList({ sortBy }) {
  const [reviewList, setReviewList] = useState([]);
  const [lastPageLoaded, setLastPageLoaded] = useState(0); // represents the last page that was
  const { productId } = useContext(ProductIdContext);

  function getNextTwoReviews(pageToLoad) {
    setLastPageLoaded(pageToLoad);
    return axios.get('/api/reviews', {
      params: {
        productId,
        page: pageToLoad,
        sort: sortBy,
        count: 2,
      },
    });
  }

  // When the component mounts, and any time productId changes, need to load the first two reviews, starting at page 1
  useEffect(() => {
    getNextTwoReviews(1).then((response) => {
      setReviewList(response.data.reviews);
    });
  }, [productId]);

  // When the more reviews button is clicked
  const moreClickHandler = useCallback(() => {
    getNextTwoReviews(lastPageLoaded + 1).then((response) => {
      setReviewList([...reviewList, ...response.data.reviews]);
    });
  }, [getNextTwoReviews]);

  return (
    <div className={styles.content}>
      {reviewList.map((review) => (
        <RatingListEntry key={review.review_id} review={review} />
      ))}
      <ActionButtons moreClickHandler={moreClickHandler} />
    </div>
  );
}

RatingList.propTypes = {
  sortBy: PropTypes.string.isRequired,
};
