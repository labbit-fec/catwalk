import React, { useContext } from 'react';
import axios from 'axios';
import ProductIdContext from '../../../context/ProductIdContext';
import styles from './AddQuestionsButton.css';

const AddQuestionsButton = function () {
  const { productId } = useContext(ProductIdContext);

  const handleAdd = () => {
    axios
      .post(`/api/qa/questions`, {
        params: {
          body: 'Is this a test',
          name: 'tester92',
          email: 'testing123@gmail.com',
          product_id: productId,
        },
      })
      .then(() => {
        console.log('Your question was successfully posted!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button type="button" className={styles.add_question} onClick={handleAdd}>
      ADD A QUESTION +
    </button>
  );
};

export default AddQuestionsButton;
