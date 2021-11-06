import React, { useState, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './ModalForm.css';
import StarsInput from './StarsInput/StarsInput';
import { ProductIdContext } from '../../../../context/ProductIdContext';

export default function ModalForm({ closeModalClickHandler }) {
  const { productId } = useContext(ProductIdContext);
  const [characteristics, setCharacteristics] = useState({});

  const [formData, setFormData] = useState({
    productId,
    rating: null, // integer 1-5
    summary: null, // string
    body: null, // string
    recommend: null, // bool
    name: null, // string
    email: null, // string
    photos: null, // array of strings,
    characteristics: { Fit: '1' }, // object {"characteristic_id": value}
  });

  function getCharacteristics() {
    return axios.get('/api/reviews/meta/characteristicsWithOptions', {
      params: {
        productId,
      },
    });
  }

  useEffect(() => {
    getCharacteristics().then((response) => {
      setCharacteristics(response.data.characteristics);
    });
  }, [productId]);

  function updateFormDataByName(event) {
    const newFormData = { ...formData };
    newFormData[event.target.name] = event.target.value;
    setFormData(newFormData);
    console.log(newFormData);
  }

  function updateCharacteristicFormData(event) {
    const newFormData = { ...formData };
    newFormData.characteristics[event.target.name] = event.target.value;
    setFormData(newFormData);
    console.log(newFormData);
  }

  const updateStarData = useCallback(
    (rating) => {
      const newFormData = { ...formData };
      newFormData.rating = rating;
      setFormData(newFormData);
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
                name="name"
                id="name"
                maxLength="60"
                placeholder="Example: jackson11!"
                value={formData.name}
                onChange={updateFormDataByName}
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
                onChange={updateFormDataByName}
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
                  onChange={updateFormDataByName}
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
                  onChange={updateFormDataByName}
                />
                No
              </div>
            </label>
          </div>
          {/*

            Divider

          */}
          <div className={styles.formField}>
            <div className={styles.formPrompt}>
              How would you rate the following characteristics?
            </div>
            {Object.keys(characteristics).map((characteristic) => (
              <div className={styles.characteristic}>
                {characteristic}
                {Object.keys(characteristics[characteristic]).map((score) => (
                  <label htmlFor={`${characteristic}-${score}`}>
                    <div className={styles.radio}>
                      <input
                        type="radio"
                        id={`${characteristic}-${score}`}
                        value={score}
                        name={characteristic}
                        checked={
                          formData.characteristics[characteristic] === score
                        }
                        onChange={updateCharacteristicFormData}
                      />
                      {`${score} - ${characteristics[characteristic][score]}`}
                    </div>
                  </label>
                ))}
              </div>
            ))}
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
