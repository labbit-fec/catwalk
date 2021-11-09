import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './RatingList.css';
import RatingListEntry from './RatingListEntry/RatingListEntry';
import ProductIdContext from '../../../context/ProductIdContext';
import StarFilterContext from '../../context/StarFilterContext';
import ActionButtons from './ActionButtons/ActionButtons';
import ModalForm from './ModalForm/ModalForm';

export default function RatingList({ sortBy }) {
  const [reviewList, setReviewList] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [visibleReviewList, setVisibleReviewList] = useState([]);
  // const [lastPageLoaded, setLastPageLoaded] = useState(0); // represents the last page that was
  // const [moreReviews, setMoreReviews] = useState(false);
  const { productId } = useContext(ProductIdContext);
  const { starFilter, setStarFilter } = useContext(StarFilterContext);
  const [showModal, setShowModal] = useState(false);
  const [showAddReviews, setShowAddReviews] = useState(true);

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

  // When the component is mounted, and whenver productId changes, load the first two reviews
  useEffect(async () => {
    let reviewsLoadedFromLastPage = 100;
    let lastPage = 0;
    let newReviews = [];
    let response;

    while (reviewsLoadedFromLastPage === 100) {
      // eslint-disable-next-line no-await-in-loop
      response = await getMoreReviews(lastPage + 1, sortBy, 100);
      newReviews = [...newReviews, ...response.data.reviews];
      reviewsLoadedFromLastPage = response.data.reviews.length;
      lastPage += 1;
    }
    setReviewList(newReviews);

    if (showAll) {
      setVisibleReviewList(newReviews);
    } else {
      setVisibleReviewList(newReviews.slice(0, 2));
    }

    // setVisibleReviewList(newReviews.slice(0, 2));
  }, [productId, sortBy]);

  const moreClickHandler = useCallback(() => {
    setShowAll(true);
    setVisibleReviewList(reviewList);
  }, [reviewList]);

  const addClickHandler = useCallback(() => {
    setShowAddReviews(false);
    setShowModal(true);
  }, []);

  const closeModalClickHandler = useCallback(() => {
    setShowModal(false);
    setShowAddReviews(true);
  }, []);

  return (
    <div className={styles.container}>
      <div id="review-container" className={styles.content}>
        {starFilter && <div>Star filter set to: {starFilter.toString()}</div>}
        {visibleReviewList.map((review) => (
          <RatingListEntry key={review.review_id} review={review} />
        ))}
      </div>
      <div className={styles.actionButtons}>
        <ActionButtons
          showMoreReviews={!showAll}
          showAddReviews={showAddReviews}
          moreClickHandler={moreClickHandler}
          addClickHandler={addClickHandler}
        />
      </div>
      {showModal && (
        <ModalForm closeModalClickHandler={closeModalClickHandler} />
      )}
    </div>
  );
}

RatingList.propTypes = {
  sortBy: PropTypes.string.isRequired,
};
