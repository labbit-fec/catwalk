import React from 'react';
import PropTypes from 'prop-types';
import styles from './BottomBar.css';

const BottomBar = function ({ expanded, setExpanded }) {
  const handleMoreQClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.more_questions}
        onClick={handleMoreQClick}
      >
        MORE ANSWERED QUESTIONS
      </button>
      <button type="button" className={styles.add_question}>
        ADD A QUESTION +
      </button>
    </div>
  );
};

export default BottomBar;

BottomBar.propTypes = {
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
};
