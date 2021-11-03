import React, { useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './Search.css';
import { ProductIdContext } from '../../context/ProductIdContext';

const Search = function ({ questions, setQuestions, allQuestions }) {
  const { productId } = useContext(ProductIdContext);

  const handleSearch = () => {
    const input = document.getElementById('input').value.toLowerCase();
    console.log(input);
    if (input.length < 3) {
      setQuestions(allQuestions);
    } else {
      const filtered = [];

      questions.forEach((question) => {
        const qBody = question.question_body.toLowerCase();
        if (qBody.includes(input)) {
          filtered.push(question);
        } else if (Object.values(question.answers).length) {
          const answers = Object.values(question.answers);
          // console.log(
          //   `I HAVE ${Object.values(question.answers).length} ANSWERS!!!`
          // );

          answers.forEach((answer) => {
            const aBody = answer.body.toLowerCase();

            if (aBody.includes(input)) {
              filtered.push(question);
            }
          });
        }
      });
      setQuestions(filtered);
    }
  };

  return (
    <div className={styles.container}>
      <input
        id="input"
        className={styles.input}
        type="text"
        placeholder="Search Questions & Answers"
      />
      <button type="submit" className={styles.button} onClick={handleSearch}>
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
  allQuestions: PropTypes.arrayOf(
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
