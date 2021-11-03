import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.css';

const Search = function ({ questions, setQuestions }) {
  // const handleSearch = (questions, setQuestions) => {
  //   const input = document.getElementById('input').value.toLowerCase();
  //   console.log(input)
  //   if (input.length < 3) {
  //     setQuestions(questions);
  //   } else {

  //   }
  // };

  return (
    <div className={styles.container}>
      <input
        id="input"
        className={styles.input}
        type="text"
        placeholder="Search Questions & Answers"
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </div>
  );
};

export default Search;

Search.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question_id: PropTypes.number.isRequired,
      question_body: PropTypes.string.isRequired,
      question_date: PropTypes.string.isRequired,
      asker_name: PropTypes.string.isRequired,
      question_helpfulness: PropTypes.number.isRequired,
      reported: PropTypes.bool.isRequired,
      answers: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          body: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          answerer_name: PropTypes.string.isRequired,
          helpfulness: PropTypes.number.isRequired,
          photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        })
      ),
    })
  ).isRequired,
  setQuestions: PropTypes.func.isRequired,
};
