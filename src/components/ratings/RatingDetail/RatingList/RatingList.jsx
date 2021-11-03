import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './RatingList.css';
import RatingListEntry from './RatingListEntry/RatingListEntry';
import { ProductIdContext } from '../../../context/ProductIdContext';
import ActionButtons from './ActionButtons/ActionButtons';

export default function RatingList({ sortBy }) {
  const [reviewList, setReviewList] = useState([]);
  const [lastPageLoaded, setLastPageLoaded] = useState(0); // represents the last page that was
  const [moreReviews, setMoreReviews] = useState(false);
  const { productId } = useContext(ProductIdContext);

  function getMoreReviews(page, count, update) {
    if (update) setLastPageLoaded(page);
    return axios.get('/api/reviews', {
      params: {
        productId,
        page,
        sort: sortBy,
        count,
      },
    });
  }

  // When the component mounts, and any time productId changes, need to load the first two reviews, starting at page 1
  useEffect(() => {
    getMoreReviews(1, 2, true).then((response) => {
      setReviewList(response.data.reviews);
    });
  }, [productId]);

  // Whenever the reviewList changes, check if there are more reviews, in order to activate/deactive more reviews button
  // Manage state with moreReviews
  // But, do not update reviewList - pass false for update
  useEffect(() => {
    getMoreReviews(lastPageLoaded + 1, 2, false).then((response) => {
      setMoreReviews(response.data.reviews.length > 0);
    });
  }, [reviewList]);

  // Whenever sortBy changes, build the same review list, sorted via the new sortBy
  useEffect(() => {
    if (lastPageLoaded === 0) return; // DO NOT use this effect on component mount
    const count = lastPageLoaded * 2;
    getMoreReviews(1, count, true).then((response) => {
      setReviewList(response.data.reviews);
    });
  }, [sortBy]);

  // When the more reviews button is clicked
  const moreClickHandler = useCallback(() => {
    getMoreReviews(lastPageLoaded + 1, 2, true).then((response) => {
      setReviewList([...reviewList, ...response.data.reviews]);
      const reviewContainer = document.getElementById('review-container');
      reviewContainer.scrollTop = reviewContainer.scrollHeight;
    });
  }, [getMoreReviews]);

  return (
    <div className={styles.container}>
      <div id="review-container" className={styles.content}>
        {reviewList.map((review) => (
          <RatingListEntry key={review.review_id} review={review} />
        ))}
      </div>
      <div className={styles.actionButtons}>
        <ActionButtons
          moreReviews={moreReviews}
          moreClickHandler={moreClickHandler}
        />
      </div>
    </div>
  );
}

RatingList.propTypes = {
  sortBy: PropTypes.string.isRequired,
};
