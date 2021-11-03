import React, { useEffect, useContext, useState, useCallback } from 'react';
import styles from './QA.css';
import Search from './Search/Search';
import QuestionsList from './QuestionsList/QuestionsList';
// import { ProductIdContext } from '../context/ProductIdContext';

const QA = function () {
  const [questions, setQuestions] = useState([]);

  return (
    <div className={styles.container}>
      <h3>Questions & Answers</h3>
      <div className={styles.content}>
        <Search questions={questions} setQuestions={setQuestions} />
        <QuestionsList questions={questions} setQuestions={setQuestions} />
      </div>
    </div>
  );
};

export default QA;
