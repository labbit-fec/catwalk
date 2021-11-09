import React, { useState } from 'react';
import styles from './QA.css';
import Search from './Search/Search';
import QuestionsList from './QuestionsList/QuestionsList';
import Modal from './Modal/Modal';

const QA = function () {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionsList, setQuestionsList] = useState({
    shortenedQs: [],
    expanded: false,
  });
  const [openModal, setOpenModal] = useState({
    state: false,
    type: null,
    qBody: null,
    qId: null,
  });

  return (
    <div className={styles.container}>
      <h3>Questions & Answers</h3>
      <div className={styles.content}>
        <Search
          questions={questions}
          setQuestions={setQuestions}
          allQuestions={allQuestions}
          questionsList={questionsList}
          setQuestionsList={setQuestionsList}
        />
        <QuestionsList
          questions={questions}
          setQuestions={setQuestions}
          allQuestions={allQuestions}
          setAllQuestions={setAllQuestions}
          questionsList={questionsList}
          setQuestionsList={setQuestionsList}
          setOpenModal={setOpenModal}
        />
      </div>
      {openModal.state ? (
        <Modal openModal={openModal} setOpenModal={setOpenModal} />
      ) : null}
    </div>
  );
};

export default QA;
