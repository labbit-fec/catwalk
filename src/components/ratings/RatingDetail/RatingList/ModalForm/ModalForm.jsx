import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalForm.css';
import StarsInput from './StarsInput/StarsInput';

export default function ModalForm({ closeModalClickHandler }) {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    stars: null,
    recommend: 'true',
  });

  function updateFormData(event) {
    const newFormData = { ...formData };
    newFormData[event.target.name] = event.target.value;
    setFormData(newFormData);
    console.log(newFormData);
  }

  const updateStarData = useCallback(
    (stars) => {
      const newFormData = { ...formData };
      newFormData.stars = stars;
      setFormData(newFormData);
      console.log(newFormData);
    },
    [setFormData]
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalMain}>
        <h1>Add a review</h1>
        <form className={styles.modalForm}>
          {/*

            Divider

           */}
          <div className={styles.formField}>
            <div className={styles.starsField}>
              <div className={styles.formPrompt}>Overall rating:</div>
              <StarsInput updateStarData={updateStarData} />
            </div>
          </div>
          {/*

            Divider

           */}
          <div className={styles.formField}>
            <label htmlFor="nickname">
              <div className={styles.formPrompt}>
                Your nickname (up to 60 chars):
              </div>
              <input
                type="text"
                name="nickname"
                id="nickname"
                maxLength="60"
                placeholder="Example: jackson11!"
                value={formData.nickname}
                onChange={updateFormData}
              />
            </label>
            <div className={styles.formHelper}>
              For privacy reasons, do not use your full name or email.
            </div>
          </div>
          {/*

            Divider

           */}
          <div className={styles.formField}>
            <label htmlFor="email">
              <div className={styles.formPrompt}>
                Your email (up to 60 chars):
              </div>
              <input
                type="email"
                id="email"
                name="email"
                maxLength="60"
                placeholder="Example: jackson11@email.com"
                value={formData.email}
                onChange={updateFormData}
              />
            </label>
            <div className={styles.formHelper}>
              For authentication reasons, you will not be emailed.
            </div>
          </div>
          {/*

            Divider

           */}
          <div className={styles.formField}>
            <div className={styles.formPrompt}>
              Do you recommend this product?
            </div>
            <label htmlFor="option1">
              <div className={styles.radio}>
                <input
                  type="radio"
                  id="option1"
                  value="true"
                  name="recommend"
                  checked={formData.recommend === 'true'}
                  onChange={updateFormData}
                />
                <div>Yes</div>
              </div>
            </label>
            <label htmlFor="option2">
              <div className={styles.radio}>
                <input
                  type="radio"
                  id="option2"
                  value="false"
                  name="recommend"
                  checked={formData.recommend === 'false'}
                  onChange={updateFormData}
                />
                No
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
