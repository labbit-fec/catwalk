import React, { useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Images from './Images/Images';
import styles from './Answer.css';
import { ProductIdContext } from '../../../../context/ProductIdContext';

const Answer = function ({
  body,
  helpfulness,
  date,
  name,
  photos,
  id,
  answers,
  setAnswers,
}) {
  const { productId } = useContext(ProductIdContext);
  const [upvoted, setUpvoted] = useState(false);
  const [reported, setReported] = useState(false);

  const formatDate = () => {
    const tempDate = date.split('T')[0].split('-');
    return `${tempDate[1]}-${tempDate[2]}-${tempDate[0]}`;
  };

  const handleHelpfulSuccess = () => {
    const copy = answers.slice();

    copy.forEach((answer) => {
      if (answer.answer_id === id) {
        // eslint-disable-next-line no-param-reassign
        answer.helpfulness += 1;
      }
    });

    setUpvoted(true);
    setAnswers(copy);
  };

  const handleHelpful = () => {
    axios
      .put(`/api/qa/answers/${id}/helpful`, {
        params: {
          productId: productId,
        },
      })
      .then(() => {
        handleHelpfulSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReportSuccess = () => {
    setReported(true);
  };

  const handleReport = () => {
    axios
      .put(`/api/qa/answers/${id}/report`, {
        params: {
          productId: productId,
        },
      })
      .then(() => {
        handleReportSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <span className={styles.answer_text}>
        <h4 className={styles.A}>A: </h4>
        <span className={styles.answer_body}>{body}</span>
      </span>
      <Images photos={photos} />
      <div className={styles.answer_bar}>
        <span className={styles.info}>
          by
          {name === 'Seller' ? (
            <span className={styles.seller}> Seller</span>
          ) : (
            <span className="name"> {name}</span>
          )}
          , {formatDate(date)}
        </span>
        |
        <div className={styles.answer_buttons}>
          {upvoted ? (
            <span>
              <span className={styles.upvoted}>
                Answer was marked as helpful!
              </span>
              |
            </span>
          ) : (
            <span>
              <span> Helpful? </span>
              <span
                className={styles.helpful_button}
                onClick={handleHelpful}
                onKeyPress={handleHelpful}
                role="button"
                tabIndex={0}
              >
                Yes
              </span>
              <span> ({helpfulness}) </span> |
            </span>
          )}
          {reported ? (
            <span className={styles.reported}>Answer was reported!</span>
          ) : (
            <span
              className={styles.report}
              onClick={handleReport}
              onKeyPress={handleReport}
              role="button"
              tabIndex={0}
            >
              Report
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Answer;

Answer.propTypes = {
  id: PropTypes.number.isRequired,
  helpfulness: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      answer_id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      answerer_name: PropTypes.string.isRequired,
      helpfulness: PropTypes.number.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired
  ).isRequired,
  setAnswers: PropTypes.func.isRequired,
};
