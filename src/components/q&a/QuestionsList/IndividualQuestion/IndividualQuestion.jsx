import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Answer from './Answer/Answer';
import styles from './IndividualQuestion.css';
import ProductIdContext from '../../../context/ProductIdContext';

const IndividualQuestion = function ({
  body,
  id,
  helpfulness,
  questions,
  setQuestions,
}) {
  const { productId } = useContext(ProductIdContext);
  const [answers, setAnswers] = useState([]);
  const [upvoted, setUpvoted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleMoreAClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const renderList = () => {
    if (answers.length <= 2) {
      return answers.map((answer) => (
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
      ));
    }
    if (expanded) {
      return (
        <div>
          <div className={styles.answers_list}>
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
          </div>
          <button
            type="button"
            className={styles.more_answers}
            onClick={handleMoreAClick}
          >
            Collapse Answers
          </button>
        </div>
      );
    }
    const shortened = answers.slice(0, 2);
    return (
      <div>
        <div className={styles.answers_list}>
          {shortened.map((answer) => (
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
        </div>
        <button
          type="button"
          className={styles.more_answers}
          onClick={handleMoreAClick}
        >
          See More Answers
        </button>
      </div>
    );
  };

  const setSortedAnswers = (response) => {
    const answersList = response.data.results;
    const sellersAnswers = [];

    answersList.forEach((answer, i) => {
      if (answer.answerer_name === 'Seller') {
        sellersAnswers.push(answer);
        answersList.splice(i, 1);
      }
    });
    setAnswers(sellersAnswers.concat(answersList));
  };

  useEffect(() => {
    axios
      .get(`/api/qa/questions/${id}/answers`, {
        params: {
          productId: productId,
          count: 100,
        },
      })
      .then((response) => {
        setSortedAnswers(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSuccessfulUpvote = () => {
    const copy = questions.slice();

    copy.forEach((question) => {
      if (question.question_id === id) {
        // eslint-disable-next-line no-param-reassign
        question.question_helpfulness += 1;
      }
    });

    setUpvoted(true);
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
        handleSuccessfulUpvote();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = () => {
    axios
      .post(`/api/qa/questions/${id}/answers`, {
        params: {
          body: 'Test answer',
          name: 'tester92',
          email: 'testing123@gmail.com',
          photos: [],
        },
      })
      .then(() => {
        console.log('Your answer was successfully posted!');
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
      <hr />
      <div className={styles.question}>
        <h4 className={styles.question_text}>Q: {body}</h4>
        <span className={styles.question_buttons}>
          {upvoted ? (
            <span>
              <span className={styles.upvoted}>
                Question was marked as helpful!
              </span>
              |
            </span>
          ) : (
            <span>
              <span> Helpful? </span>
              <span
                className={styles.helpful_button}
                onClick={handleHelpful}
                onKeyPress={handleHelpful}
                role="button"
                tabIndex={0}
              >
                Yes
              </span>
              <span> ({helpfulness}) </span>|
            </span>
          )}
          <span
            className={styles.add_answer}
            onClick={handleAdd}
            onKeyPress={handleAdd}
            role="button"
            tabIndex={0}
          >
            Add Answer
          </span>
        </span>
      </div>
      {renderList()}
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
