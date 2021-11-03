import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import IndividualQuestion from './IndividualQuestion/IndividualQuestion';
import BottomBar from './BottomBar/BottomBar';
import styles from './QuestionsList.css';
import { ProductIdContext } from '../../context/ProductIdContext';

const QuestionsList = function () {
  const { productId } = useContext(ProductIdContext);
  const [questions, setQuestions] = useState([]);

  // funaxios.get('/api/qa/questions', {
  //     params: {
  //       productId: productId,
  //     },
  //   });

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
