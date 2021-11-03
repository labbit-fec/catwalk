import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import IndividualQuestion from './IndividualQuestion/IndividualQuestion';
import BottomBar from './BottomBar/BottomBar';
import styles from './QuestionsList.css';
import { ProductIdContext } from '../../context/ProductIdContext';

const QuestionsList = function ({ questions, setQuestions }) {
  const { productId } = useContext(ProductIdContext);
  // const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get('/api/qa/questions', {
        params: {
          productId: productId,
        },
      })
      .then((response) => {
        setQuestions(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container} data-testid="question-list-container">
      {questions.length ? (
        <div>
          {questions.map((question) => (
            // <button type="submit">Submit</button>
            <IndividualQuestion
              body={question.question_body}
              key={question.question_id}
              id={question.question_id}
              helpfulness={question.question_helpfulness}
            />
          ))}
          <BottomBar />
        </div>
      ) : (
        <button type="button" className={styles.add_question}>
          ADD A QUESTION +
        </button>
      )}
    </div>
  );
};

export default QuestionsList;

QuestionsList.propTypes = {
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
