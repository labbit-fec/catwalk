import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import IndividualQuestion from './IndividualQuestion/IndividualQuestion';
import BottomBar from './BottomBar/BottomBar';
import styles from './QuestionsList.css';
import ProductIdContext from '../../context/ProductIdContext';
import AddQuestionsButton from './AddQuestionsButton/AddQuestionsButton';

const QuestionsList = function ({
  questions,
  setQuestions,
  setAllQuestions,
  questionsList,
  setQuestionsList,
  setOpenModal,
}) {
  const { productId } = useContext(ProductIdContext);

  const successCB = (response) => {
    setAllQuestions(response.data);
    setQuestions(response.data);
  };

  const renderList = () => {
    if (questionsList.shortenedQs.length) {
      return (
        <div className={styles.questions_list}>
          {questionsList.shortenedQs.map((question) => (
            // <button type="submit">Submit</button>
            <IndividualQuestion
              body={question.question_body}
              key={question.question_id}
              id={question.question_id}
              helpfulness={question.question_helpfulness}
              questions={questions}
              setQuestions={setQuestions}
              setOpenModal={setOpenModal}
            />
          ))}
        </div>
      );
    }
    if (questions.length >= 2) {
      setQuestionsList({
        shortenedQs: questions.slice(0, 2),
      });
    } else {
      setQuestionsList({
        shortenedQs: questions,
      });
    }

    return (
      <div className={styles.questions_list}>
        {questionsList.shortenedQs.map((question) => (
          <IndividualQuestion
            body={question.question_body}
            key={question.question_id}
            id={question.question_id}
            helpfulness={question.question_helpfulness}
            questions={questions}
            setQuestions={setQuestions}
            setOpenModal={setOpenModal}
          />
        ))}
      </div>
    );
  };

  const renderListAndButtons = () => {
    if (questions.length) {
      if (
        questions.length === questionsList.shortenedQs.length &&
        questions.length <= 2
      ) {
        return (
          <div>
            {renderList()}
            <hr />
            <div className={styles.add_button_container}>
              <AddQuestionsButton setOpenModal={setOpenModal} />
            </div>
          </div>
        );
      }
      return (
        <div>
          {renderList()}
          <hr />
          <BottomBar
            questionsList={questionsList}
            setQuestionsList={setQuestionsList}
            questions={questions}
            setOpenModal={setOpenModal}
          />
        </div>
      );
    }
    return <AddQuestionsButton setOpenModal={setOpenModal} />;
  };

  useEffect(() => {
    axios
      .get('/api/qa/questions', {
        params: {
          productId: productId,
          count: 100,
        },
      })
      .then((response) => {
        successCB(response);
      })
      .catch((err) => {
        console.log(err);
      });

    // return () => {
    //   setAllQuestions([]);
    //   setQuestions([]);
    // };
  }, []);

  return (
    <div className={styles.container} data-testid="question-list-container">
      {renderListAndButtons()}
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
  questionsList: PropTypes.shape({
    expanded: PropTypes.bool,
    shortenedQs: PropTypes.arrayOf(
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
    ),
  }).isRequired,
  setQuestions: PropTypes.func.isRequired,
  setAllQuestions: PropTypes.func.isRequired,
  setQuestionsList: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
