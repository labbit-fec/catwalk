import React from 'react';
import Answer from './Answer/Answer';
import styles from './IndividualQuestion.css';

const IndividualQuestion = function () {
  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h4 className={styles.question_text}>
          Q: What fabric is the top made of?
        </h4>
        <div className={styles.question_buttons}>
          <span> Helpful? </span>
          <span className={styles.helpful_button}> Yes</span>
          <span> (25) </span>|
          <span className={styles.add_answer}>Add Answer</span>
        </div>
      </div>
      <Answer />
      <hr />
    </div>
  );
};

export default IndividualQuestion;
