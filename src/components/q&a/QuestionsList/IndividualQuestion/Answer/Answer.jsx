import React from 'react';
import PropTypes from 'prop-types';
import Images from './Images/Images';
import styles from './Answer.css';

const Answer = function ({ body, key, helpfulness, date, name, photos }) {
  return (
    <div className={styles.container}>
      <span className={styles.answer_text}>
        <h4 className={styles.A}>A: </h4>
        <span className={styles.answer_body}>{body}</span>
      </span>
      <Images />
      <div className={styles.answer_bar}>
        <span className={styles.info}> by User1234, May 1, 2019 </span>|
        <div className={styles.answer_buttons}>
          <span> Helpful? </span>
          <span className={styles.helpful_button}> Yes</span>
          <span> (50) </span>|<span className={styles.report}>Report </span>
        </div>
      </div>
    </div>
  );
};

export default Answer;

Answer.propTypes = {
  helpfulness: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.string.isRequired,
};
