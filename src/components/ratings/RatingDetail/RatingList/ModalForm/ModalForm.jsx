import React, { useState, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './ModalForm.css';
import StarsInput from './StarsInput/StarsInput';
import ProductIdContext from '../../../../context/ProductIdContext';
import PhotoUpload from './PhotoUpload/PhotoUpload';

export default function ModalForm({ closeModalClickHandler }) {
  const { productId } = useContext(ProductIdContext);
  const [characteristics, setCharacteristics] = useState({});
  const [bodyLength, setBodyLength] = useState(0);

  const [formData, setFormData] = useState({
    productId,
    rating: null, // integer 1-5
    summary: '', // string
    body: '', // string
    recommend: null, // bool
    name: '', // string
    email: '', // string
    photos: [], // array of strings,
    characteristics: {}, // object {"characteristic_id": value}
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
    if (event.target.name === 'recommend') {
      newFormData.recommend = event.target.value === 'true';
    } else {
      newFormData[event.target.name] = event.target.value;
    }
    setFormData(newFormData);
  }

  function updateCharacteristicFormData(event) {
    const newFormData = { ...formData };
    newFormData.characteristics[event.target.name] = Number(event.target.value);
    setFormData(newFormData);
  }

  const updateImages = useCallback(
    (newImages) => {
      const newFormData = { ...formData };
      newFormData.photos = newImages;
      setFormData(newFormData);
    },
    [formData, setFormData]
  );

  const updateStarData = useCallback(
    (rating) => {
      const newFormData = { ...formData };
      newFormData.rating = Number(rating);
      setFormData(newFormData);
    },
    [formData, setFormData]
  );

  function countBody(event) {
    setBodyLength(event.target.value.length);
  }

  function submitForm() {
    axios.post('/api/reviews/create', formData).then(() => {
      closeModalClickHandler();
    });
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
                id="name"
                name="name"
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
                  name="recommend"
                  value="true"
                  checked={
                    formData.recommend === null
                      ? false
                      : formData.recommend.toString() === 'true'
                  }
                  onChange={updateFormDataByName}
                />
                Yes
              </div>
            </label>
            <label htmlFor="option2">
              <div className={styles.radio}>
                <input
                  type="radio"
                  id="option2"
                  value="false"
                  name="recommend"
                  checked={
                    formData.recommend === null
                      ? false
                      : formData.recommend.toString() === 'false'
                  }
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
                <strong>{characteristic}</strong>
                {Object.keys(characteristics[characteristic].legend).map(
                  (score) => (
                    <label
                      htmlFor={`${characteristics[characteristic].id}-${score}`}
                    >
                      <div className={styles.radio}>
                        <input
                          type="radio"
                          id={`${characteristics[characteristic].id}-${score}`}
                          value={score}
                          name={characteristics[characteristic].id}
                          checked={
                            formData.characteristics[
                              characteristics[characteristic].id
                            ] === Number(score)
                          }
                          onChange={updateCharacteristicFormData}
                        />
                        {`${score} - ${characteristics[characteristic].legend[score]}`}
                      </div>
                    </label>
                  )
                )}
              </div>
            ))}
          </div>
          {/*

            Divider

          */}
          <div className={styles.formField}>
            <label htmlFor="summary">
              <div className={styles.formPrompt}>
                Review summary (up to 60 chars):
              </div>
              <input
                type="text"
                id="summary"
                name="summary"
                maxLength="60"
                placeholder="Example: Best purchase ever!"
                value={formData.summmary}
                onChange={updateFormDataByName}
              />
            </label>
          </div>
          {/*

            Divider

          */}
          <div className={styles.formField}>
            <label htmlFor="body">
              <div className={styles.formPrompt}>
                Review body (50 - 1,000 characters):
              </div>
              <textarea
                id="body"
                name="body"
                placeholder="Why did you like the product or not?"
                minLength="60"
                maxLength="1000"
                rows="18"
                value={formData.body}
                onChange={(e) => {
                  updateFormDataByName(e);
                  countBody(e);
                }}
              />
            </label>
            <div className={styles.formHelper}>
              {bodyLength < 50
                ? `Minimum required characters left: ${50 - bodyLength}`
                : 'Minimum characters reached.'}
            </div>
          </div>
          {/*

            Divider

          */}
          <PhotoUpload updateImages={updateImages} />
          {/*

            Divider

          */}
        </form>
        <button type="button" onClick={closeModalClickHandler}>
          Close
        </button>
        <button type="submit" onClick={submitForm}>
          Submit
        </button>
      </div>
    </div>
  );
}

ModalForm.propTypes = {
  closeModalClickHandler: PropTypes.func.isRequired,
};
