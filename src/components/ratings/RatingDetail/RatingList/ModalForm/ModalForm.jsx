import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalForm.css';

export default function ModalForm({ closeModalClickHandler }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalMain}>
        <h1>Add a review</h1>
        <form className={styles.modalForm}>
          <div className={styles.formField}>
            <label htmlFor="name">
              <div className={styles.formLabel}>Name:</div>
              <input type="text" name="name" />
            </label>
          </div>
          <div className={styles.formField}>
            <label htmlFor="longer-field">
              <div className={styles.formLabel}>Longer field:</div>
              <input type="text" name="longer-field" />
            </label>
          </div>
        </form>
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
