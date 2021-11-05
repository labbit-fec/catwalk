import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Answer from './Answer/Answer';
import styles from './IndividualQuestion.css';
import { ProductIdContext } from '../../../context/ProductIdContext';

const IndividualQuestion = function ({
  body,
  id,
  helpfulness,
  questions,
  setQuestions,
}) {
  const { productId } = useContext(ProductIdContext);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/qa/questions/${id}/answers`, {
        params: {
          productId: productId,
        },
      })
      .then((response) => {
        setAnswers(response.data.results);
        // console.log(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSuccess = () => {
    const copy = questions.slice();

    copy.forEach((question) => {
      if (question.question_id === id) {
        // eslint-disable-next-line no-param-reassign
        question.question_helpfulness += 1;
      }
    });

    setQuestions(copy);
  };

  const handleHelpful = () => {
    axios
      .put(`/api/qa/questions/${id}/helpful`, {
        params: {
          productId: productId,
        },
      })
      .then(() => {
        successCB();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={styles.container}
      data-testid="individual-question-container"
    >
      <div className={styles.question}>
        <h4 className={styles.question_text}>Q: {body}</h4>
        <div className={styles.question_buttons}>
          <span> Helpful? </span>
          <span
            className={styles.helpful_button}
            onClick={handleSuccess}
            onKeyPress={handleSuccess}
            role="button"
            tabIndex={0}
          >
            Yes
          </span>
          <span> ({helpfulness}) </span>|
          <span className={styles.add_answer}>Add Answer</span>
        </div>
      </div>
      {answers.map((answer) => (
        <Answer
          key={answer.answer_id}
          id={answer.answer_id}
          body={answer.body}
          date={answer.date}
          name={answer.answerer_name}
          helpfulness={answer.helpfulness}
          photos={answer.photos}
          answers={answers}
          setAnswers={setAnswers}
        />
      ))}
      <hr />
    </div>
  );
};

export default IndividualQuestion;

IndividualQuestion.propTypes = {
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  helpfulness: PropTypes.number.isRequired,
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
