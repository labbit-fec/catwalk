import React from 'react';
import PropTypes from 'prop-types';
import styles from './BottomBar.css';
import AddQuestionsButton from '../AddQuestionsButton/AddQuestionsButton';

const BottomBar = function ({
  questionsList,
  setQuestionsList,
  questions,
  setOpenModal,
}) {
  const handleMoreQClick = () => {
    if (questionsList.expanded) {
      setQuestionsList({
        shortenedQs: [],
        expanded: false,
      });
    } else {
      const { shortenedQs } = questionsList;
      const firstIndex =
        questions.indexOf(shortenedQs[shortenedQs.length - 1]) + 1;

      let newShortenedQs;

      if (questions[firstIndex + 2]) {
        newShortenedQs = shortenedQs.concat(
          questions.slice(firstIndex, firstIndex + 2)
        );
      } else {
        newShortenedQs = shortenedQs.concat(
          questions.slice(firstIndex, firstIndex + 1)
        );
      }

      if (newShortenedQs.length < questions.length) {
        setQuestionsList({
          shortenedQs: newShortenedQs,
        });
      } else {
        setQuestionsList({
          shortenedQs: questions,
          expanded: true,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      {questionsList.expanded ? (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleMoreQClick}
        >
          COLLAPSE
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleMoreQClick}
        >
          MORE ANSWERED QUESTIONS
        </button>
      )}
      <AddQuestionsButton setOpenModal={setOpenModal} />
    </div>
  );
};

export default BottomBar;

BottomBar.propTypes = {
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
  setQuestionsList: PropTypes.func.isRequired,
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
  setOpenModal: PropTypes.func.isRequired,
};
