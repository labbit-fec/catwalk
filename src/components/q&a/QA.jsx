import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './QA.css';
import ProductIdContext from '../context/ProductIdContext';
import Search from './Search/Search';
import QuestionsList from './QuestionsList/QuestionsList';
import Modal from './Modal/Modal';

const QA = function () {
  const { productId } = useContext(ProductIdContext);
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
  const [productName, setProductName] = useState(null);

  useEffect(() => {
    axios
      .get('/api/overview/products/', {
        params: {
          productId: productId,
        },
      })
      .then((response) => {
        setProductName(response.data.name);
      })
      .catch((error) => {
        console.log('Error getting product details', error);
      });
  }, []);

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
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          productName={productName}
        />
      ) : null}
    </div>
  );
};

export default QA;
