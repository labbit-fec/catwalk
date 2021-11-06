import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './BottomBar.css';
import { ProductIdContext } from '../../../context/ProductIdContext';
import AddQuestionsButton from '../AddQuestionsButton/AddQuestionsButton';

const BottomBar = function ({ expanded, setExpanded }) {
  const { productId } = useContext(ProductIdContext);

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
      <AddQuestionsButton />
    </div>
  );
};

export default BottomBar;

BottomBar.propTypes = {
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
};
