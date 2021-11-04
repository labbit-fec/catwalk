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
  const [showModal, setShowModal] = useState(false);
  const { showAddReviews, setShowAddReviews } = useState(true);

  function getMoreReviews(page, sort, count) {
    return axios.get('/api/reviews', {
      params: {
        productId,
        page,
        sort,
        count,
      },
    });
  }

  function createReview() {
    /* ... */
  }

  // When the component is mounted, and whenver productId changes, load the first two reviews
  useEffect(() => {
    getMoreReviews(1, sortBy, 2).then((response) => {
      setReviewList(response.data.reviews);
      setLastPageLoaded(lastPageLoaded + 1);
    });
  }, [productId]);

  // Check if there are more reviews
  useEffect(() => {
    getMoreReviews(lastPageLoaded + 1, sortBy, 2).then((response) => {
      setMoreReviews(response.data.reviews.length > 0);
    });
  }, [lastPageLoaded]);

  const moreClickHandler = useCallback(() => {
    getMoreReviews(lastPageLoaded + 1, sortBy, 2).then((response) => {
      setReviewList([...reviewList, ...response.data.reviews]);
      setLastPageLoaded(lastPageLoaded + 1);
      const reviewContainer = document.getElementById('review-container');
      reviewContainer.scrollTop = reviewContainer.scrollHeight;
    });
  }, [getMoreReviews]);

  const addClickHandler = useCallback(() => {}, []);

  useEffect(() => {
    const promises = [];
    for (let page = 1; page <= lastPageLoaded; page += 1) {
      promises.push(getMoreReviews(page, sortBy, 2));
    }
    Promise.all(promises)
      .then((responses) =>
        responses.reduce(
          (memo, response) => [...memo, ...response.data.reviews],
          []
        )
      )
      .then((reviews) => setReviewList(reviews));
  }, [sortBy]);

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
          showAddReviews={showAddReviews}
          moreClickHandler={moreClickHandler}
          addClickHandler={addClickHandler}
        />
      </div>
    </div>
  );
}

RatingList.propTypes = {
  sortBy: PropTypes.string.isRequired,
};
