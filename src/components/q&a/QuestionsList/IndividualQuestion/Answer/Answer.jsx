import React from 'react';
import Images from './Images/Images';
import styles from './Answer.css';

const Answer = function () {
  return (
    <div className={styles.container}>
      <span className={styles.answer_text}>
        <h4 className={styles.A}>A: </h4>
        <span className={styles.answer_body}>
          Something pretty soft but I can&apos;t be sure.
        </span>
      </span>
      <Images />
      <div className={styles.answer_bar}>
        <span className={styles.info}> User1234, May 1, 2019 </span>|
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
