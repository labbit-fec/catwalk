import React, { useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { VscClose } from 'react-icons/vsc';
import styles from './Modal.css';
import ProductIdContext from '../../context/ProductIdContext';

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
        <div className="text-danger">Please complete all required fields!</div>
      );
    }
    return <div className="text-danger">Please provide a valid email!</div>;
  };

  return (
    <div className="bg-modal" data-testid="modal">
      {openModal.type === 'question' ? (
        <div className="modal-content">
          {/* <div className={styles.headers}> */}
          <h1>Ask Your Question</h1>
          <h3>About Product #{productId}</h3>
          {/* </div> */}
          <button className="btn-close" type="button" onClick={handleClick}>
            <VscClose />
          </button>
          <form className="modal-form">
            <div className="form-field">
              <label htmlFor="input_q_body">
                <span className={styles.mandatory}>*</span>
                Your question
              </label>

              <textarea
                id="input_q_body"
                data-testid="your-question"
                maxLength="1000"
              />
            </div>
            <div className="form-field">
              <label htmlFor="q_name">
                <span className={styles.mandatory}>*</span>
                What is your nickname?
                <input
                  type="text"
                  id="q_name"
                  placeholder="Example: jackson11!"
                  maxLength="60"
                  className={styles.input}
                />
              </label>
              <div className="form-field-helper text-warning">
                For privacy reasons, do not use your full name or email address.
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="q_email">
                <span className={styles.mandatory}>*</span>
                Your Email:
              </label>
              <div>
                <input
                  type="email"
                  id="q_email"
                  placeholder="Example: jack@email.com"
                  maxLength="60"
                  className={styles.input}
                />
              </div>
              <div className="form-field-helper text-warning">
                For authentication reasons, you will not be emailed.
              </div>
            </div>
          </form>
          {error.state ? displayError() : null}
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleQSubmit}
          >
            Submit Question
          </button>
        </div>
      ) : (
        <div className="modal-content">
          <h1>Submit Your Answer</h1>
          <h3>
            #{productId}: {openModal.qBody}
          </h3>
          <button className="btn-close" type="button" onClick={handleClick}>
            <VscClose />
          </button>
          <form className="modal-form">
            <div className="form-field">
              <label htmlFor="input_a_body">
                <span className={styles.mandatory}>*</span>
                Your answer
              </label>
              <textarea
                type="text"
                id="input_a_body"
                className={styles.body}
                maxLength="1000"
              />
            </div>
            <div className="form-field">
              <label htmlFor="a_name">
                <span className={styles.mandatory}>*</span>
                What is your nickname?
              </label>
              <input
                type="text"
                maxLength="60"
                placeholder="jack543!"
                id="a_name"
                className={styles.input}
              />
              <div className="form-field-helper text-warning">
                For privacy reasons, do not use your full name or email address.
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="a_email">
                Your email
                <span className={styles.mandatory}>*</span>
              </label>
              <input
                type="text"
                maxLength="60"
                placeholder="Example: jack@email.com"
                id="a_email"
                className={styles.input}
              />
              <div className="form-field-helper text-warning">
                For authentication reasons, you will not be emailed.
              </div>
            </div>
          </form>
          {error.state ? displayError() : null}
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleASubmit}
          >
            Submit Answer
          </button>
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
