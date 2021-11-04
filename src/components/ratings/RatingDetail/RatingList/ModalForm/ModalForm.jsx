import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalForm.css';

export default function ModalForm({ closeModalClickHandler }) {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
  });

  function updateFormData(event) {
    event.preventDefault();
    const newFormData = { ...formData };
    newFormData[event.target.name] = event.target.value;
    setFormData(newFormData);
    console.log(newFormData);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalMain}>
        <h1>Add a review</h1>
        <form className={styles.modalForm}>
          {/*

            Divider

           */}
          <div className={styles.formField}>
            <label htmlFor="nickname">
              <div className={styles.formLabel}>
                Your nickname (up to 60 chars):
              </div>
              <input
                type="text"
                name="nickname"
                maxLength="60"
                placeholder="Example: jackson11!"
                value={formData.nickname}
                onChange={updateFormData}
              />
              <div className={styles.formHelper}>
                For privacy reasons, do not use your full name or email.
              </div>
            </label>
          </div>
          {/*

            Divider

           */}
          <div className={styles.formField}>
            <label htmlFor="email">
              <div className={styles.formLabel}>
                Your email (up to 60 chars):
              </div>
              <input
                type="email"
                name="email"
                maxLength="60"
                placeholder="Example: jackson11@email.com"
                value={formData.email}
                onChange={updateFormData}
              />
              <div className={styles.formHelper}>
                For authentication reasons, you will not be emailed.
              </div>
            </label>
          </div>
          {/*

            Divider

           */}
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
