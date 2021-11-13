import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './RatingList.css';
import RatingListEntry from './RatingListEntry/RatingListEntry';
import ProductIdContext from '../../../context/ProductIdContext';
import StarFilterContext from '../../context/StarFilterContext';
import ActionButtons from './ActionButtons/ActionButtons';
import ModalForm from './ModalForm/ModalForm';

export default function RatingList({ sortBy, setReviewCount }) {
  const [showAll, setShowAll] = useState(false);
  const [filteredReviewList, setFilteredReviewList] = useState([]);
  const [visibleReviewList, setVisibleReviewList] = useState([]);
  // const [lastPageLoaded, setLastPageLoaded] = useState(0); // represents the last page that was
  // const [moreReviews, setMoreReviews] = useState(false);
  const { productId } = useContext(ProductIdContext);
  const [showModal, setShowModal] = useState(false);
  const [showAddReviews, setShowAddReviews] = useState(true);

  const { starsToShow, filtering } = useContext(StarFilterContext);

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
    setFilteredReviewList(newReviews);
    setReviewCount(newReviews.length);

    if (filtering) {
      newReviews = newReviews.filter((review) => starsToShow[review.rating]);
    }

    setFilteredReviewList(newReviews);

    if (!showAll) {
      newReviews = newReviews.slice(0, 2);
    }

    setVisibleReviewList(newReviews);
  }, [productId, sortBy, starsToShow, filtering]);

  const moreClickHandler = useCallback(() => {
    setShowAll(true);
    setVisibleReviewList(filteredReviewList);
  }, [filteredReviewList]);

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
        {visibleReviewList.map((review) => (
          <RatingListEntry key={review.review_id} review={review} />
        ))}
        {visibleReviewList.length === 0 && 'No reviews to show'}
      </div>
      <div className={styles.actionButtons}>
        <ActionButtons
          showMoreReviews={
            !showAll && visibleReviewList.length < filteredReviewList.length
          }
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
  setReviewCount: PropTypes.func.isRequired,
};
