import React from 'react';
import styles from './BottomBar.css';

const BottomBar = function () {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.more_questions}>
        MORE ANSWERED QUESTIONS
      </button>
      <button type="button" className={styles.add_question}>
        ADD A QUESTION +
      </button>
    </div>
  );
};

export default BottomBar;
