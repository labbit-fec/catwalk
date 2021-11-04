import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalForm.css';

export default function ModalForm({ closeModalClickHandler }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalMain}>
        <h1>Add a review</h1>
        <button type="button" onClick={closeModalClickHandler}>
          Close
        </button>
      </div>
    </div>
  );
}

ModalForm.propTypes = {
  closeModalClickHandler: PropTypes.func.isRequired,
};
