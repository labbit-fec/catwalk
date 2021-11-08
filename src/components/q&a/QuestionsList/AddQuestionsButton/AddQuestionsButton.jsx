import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddQuestionsButton.css';

const AddQuestionsButton = function ({ setOpenModal }) {
  const handleAdd = () => {
    setOpenModal({
      state: true,
      type: 'question',
    });
  };

  return (
    <button type="button" className={styles.add_question} onClick={handleAdd}>
      ADD A QUESTION +
    </button>
  );
};

export default AddQuestionsButton;

AddQuestionsButton.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};
