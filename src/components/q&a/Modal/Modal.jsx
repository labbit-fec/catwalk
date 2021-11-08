import React, { useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './Modal.css';
import { ProductIdContext } from '../../context/ProductIdContext';

const Modal = function ({ openModal, setOpenModal }) {
  const { productId } = useContext(ProductIdContext);
  const [error, setError] = useState({
    state: false,
    type: null,
  });

  const handleClick = () => {
    setOpenModal({
      state: false,
      type: null,
      qBody: null,
      qId: null,
    });
  };

  const validateEmail = (email) => {
    if (email.indexOf('@') > -1) {
      const domain = email.split('@')[1];
      if (domain.indexOf('.') > -1) {
        return true;
      }
    }
    return false;
  };

  const handleQSubmit = () => {
    const qBody = document.getElementById('input_q_body').value;
    const name = document.getElementById('q_name').value;
    const email = document.getElementById('q_email').value;

    if (qBody && name && email) {
      if (validateEmail(email)) {
        axios
          .post(`/api/qa/questions`, {
            params: {
              body: qBody,
              name,
              email,
              product_id: productId,
            },
          })
          .then(() => {
            console.log('Your question was successfully posted!');
          })
          .catch((err) => {
            console.log(err);
          });
        handleClick();
      } else {
        setError({
          state: true,
          type: 'email',
        });
      }
    } else {
      setError({
        state: true,
        type: 'incomplete',
      });
    }
  };

  const handleASubmit = () => {
    const aBody = document.getElementById('input_a_body').value;
    const name = document.getElementById('a_name').value;
    const email = document.getElementById('a_email').value;

    if (aBody && name && email) {
      if (validateEmail(email)) {
        axios
          .post(`/api/qa/questions/${openModal.qId}/answers`, {
            params: {
              body: aBody,
              name,
              email,
              photos: [],
            },
          })
          .then(() => {
            console.log('Your answer was successfully posted!');
          })
          .catch((err) => {
            console.log(err);
          });

        handleClick();
      } else {
        setError({
          state: true,
          type: 'email',
        });
      }
    } else {
      setError({
        state: true,
        type: 'incomplete',
      });
    }
  };

  const displayError = () => {
    if (error.type === 'incomplete') {
      return (
        <span className={styles.error}>
          Please complete all required fields!
        </span>
      );
    }
    return <span className={styles.error}>Please provide a valid email!</span>;
  };

  return (
    <div className={styles.modal}>
      {openModal.type === 'question' ? (
        <div className={styles.modal_inner}>
          <div className={styles.headers}>
            <h3>Ask Your Question</h3>
            <h4>About Product #{productId}</h4>
          </div>
          <div className={styles.form_container}>
            <span className={styles.input_name}>
              <span className={styles.mandatory}>*</span>
              <span>Your Question: </span>
            </span>
            <textarea
              type="text"
              id="input_q_body"
              className={styles.body}
              maxLength="1000"
            />
            <span className={styles.input_name}>
              <span className={styles.mandatory}>*</span>
              <span>What is Your Nickname? </span>
            </span>
            <input
              type="text"
              id="q_name"
              placeholder="Example: jackson11!"
              maxLength="60"
              className={styles.input}
            />
            <span className={styles.message}>
              For privacy reasons, do not use your full name or email address.
            </span>
            <span className={styles.input_name}>
              <span className={styles.mandatory}>*</span>
              <span>Your Email: </span>
            </span>
            <input
              type="text"
              id="q_email"
              placeholder="Example: jack@email.com"
              maxLength="60"
              className={styles.input}
            />
            <span className={styles.message}>
              For authentication reasons, you will not be emailed.
            </span>
          </div>
          {error.state ? displayError() : null}
          <div className={styles.buttons}>
            <button
              className={styles.submit_button}
              type="button"
              onClick={handleQSubmit}
            >
              Submit
            </button>
            <button
              className={styles.close_button}
              type="button"
              onClick={handleClick}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.modal_inner}>
          <div className={styles.headers}>
            <h3>Submit Your Answer</h3>
            <h4>
              #{productId}: {openModal.qBody}
            </h4>
          </div>
          <div className={styles.form_container}>
            <span className={styles.input_name}>
              <span className={styles.mandatory}>*</span>
              <span>Your Answer: </span>
            </span>
            <textarea
              type="text"
              id="input_a_body"
              className={styles.body}
              maxLength="1000"
            />
            <span className={styles.input_name}>
              <span className={styles.mandatory}>*</span>
              <span>What is Your Nickname? </span>
            </span>
            <input
              type="text"
              maxLength="60"
              placeholder="jack543!"
              id="a_name"
              className={styles.input}
            />
            <span className={styles.message}>
              For privacy reasons, do not use your full name or email address.
            </span>
            <span className={styles.input_name}>
              <span className={styles.mandatory}>*</span>
              <span>Your Email: </span>
            </span>
            <input
              type="text"
              maxLength="60"
              placeholder="Example: jack@email.com"
              id="a_email"
              className={styles.input}
            />
            <span className={styles.message}>
              For authentication reasons, you will not be emailed.
            </span>
          </div>
          {error.state ? displayError() : null}
          <div className={styles.buttons}>
            <button
              className={styles.submit_button}
              type="button"
              onClick={handleASubmit}
            >
              Submit
            </button>
            <button
              className={styles.close_button}
              type="button"
              onClick={handleClick}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  openModal: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    qBody: PropTypes.string.isRequired,
    qId: PropTypes.number.isRequired,
  }).isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
