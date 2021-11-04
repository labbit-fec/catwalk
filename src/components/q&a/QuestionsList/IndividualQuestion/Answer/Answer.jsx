import React from 'react';
import PropTypes from 'prop-types';
import Images from './Images/Images';
import styles from './Answer.css';

const Answer = function ({ body, helpfulness, date, name, photos }) {
  const formatDate = () => {
    const tempDate = date.split('T')[0].split('-');
    return `${tempDate[1]}-${tempDate[2]}-${tempDate[0]}`;
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
          <span> Helpful? </span>
          <span className={styles.helpful_button}> Yes</span>
          <span> ({helpfulness}) </span>|
          <span className={styles.report}>Report </span>
        </div>
      </div>
    </div>
  );
};

export default Answer;

Answer.propTypes = {
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
};
