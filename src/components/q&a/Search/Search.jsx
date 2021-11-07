import React from 'react';
import PropTypes from 'prop-types';
import { VscSearch } from 'react-icons/vsc';
import styles from './Search.css';

const Search = function ({
  questions,
  setQuestions,
  allQuestions,
  setQuestionsList,
}) {
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();

    if (input.length >= 3) {
      const filtered = [];

      questions.forEach((question) => {
        const qBody = question.question_body.toLowerCase();
        if (qBody.includes(input)) {
          filtered.push(question);
        } else if (Object.values(question.answers).length) {
          const answers = Object.values(question.answers);

          for (let i = 0; i < answers.length; i += 1) {
            const aBody = answers[i].body.toLowerCase();

            if (aBody.includes(input)) {
              filtered.push(question);
              break;
            }
          }
        }
      });
      setQuestions(filtered);
      setQuestionsList({
        shortenedQs: [],
      });
    } else if (input.length < 3 && questions.length !== allQuestions.length) {
      setQuestions(allQuestions);
      setQuestionsList({
        shortenedQs: [],
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <VscSearch className={styles.icon} />
        <input
          id="input"
          className={styles.input}
          type="text"
          placeholder="Have a question? Search for answers…"
          onChange={handleSearch}
        />
      </div>
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
  setQuestionsList: PropTypes.func.isRequired,
};
