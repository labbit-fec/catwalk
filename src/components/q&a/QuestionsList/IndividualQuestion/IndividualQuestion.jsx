import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Answer from './Answer/Answer';
import styles from './IndividualQuestion.css';
import { ProductIdContext } from '../../../context/ProductIdContext';

const IndividualQuestion = function ({ body, id, helpfulness }) {
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

  return (
    <div
      className={styles.container}
      data-testid="individual-question-container"
    >
      <div className={styles.question}>
        <h4 className={styles.question_text}>Q: {body}</h4>
        <div className={styles.question_buttons}>
          <span> Helpful? </span>
          <span className={styles.helpful_button}> Yes</span>
          <span> ({helpfulness}) </span>|
          <span className={styles.add_answer}>Add Answer</span>
        </div>
      </div>
      {answers.map((answer) => (
        <Answer
          key={answer.answer_id}
          body={answer.body}
          date={answer.date}
          name={answer.answerer_name}
          helpfulness={answer.helpfulness}
          photos={answer.photos}
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
};
