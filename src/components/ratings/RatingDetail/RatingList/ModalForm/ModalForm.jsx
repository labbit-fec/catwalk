import React, { useState, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { VscClose } from 'react-icons/vsc';
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
    <div className="bg-modal">
      <div className="modal-content">
        <h1>My review</h1>
        <span>
          <button
            type="button"
            className="btn-close"
            onClick={closeModalClickHandler}
          >
            <VscClose />
          </button>
        </span>
        <form className="modal-form">
          {/*

            Divider

           */}
          <div className="form-field">
            <div>
              <label>Overall rating</label>
              <StarsInput updateStarData={updateStarData} />
            </div>
          </div>
          {/*

            Divider

           */}
          <div className="form-field">
            <label htmlFor="nickname">Your nickname (up to 60 chars)</label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength="60"
              placeholder="Example: jackson11!"
              value={formData.name}
              onChange={updateFormDataByName}
            />
            <div className="form-field-helper text-warning">
              For privacy reasons, do not use your full name or email.
            </div>
          </div>
          {/*

            Divider

           */}
          <div className="form-field">
            <label htmlFor="email">Your email (up to 60 chars)</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength="60"
              placeholder="Example: jackson11@email.com"
              value={formData.email}
              onChange={updateFormDataByName}
            />
            <div className="form-field-helper text-warning">
              For authentication reasons, you will not be emailed.
            </div>
          </div>
          {/*

            Divider

           */}
          <div className="form-field">
            <label>Would you recommend this product?</label>
            <div className="radio-group">
              <div className="radio-option">
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
                <label htmlFor="option1">Yes</label>
              </div>
              <div className="radio-option">
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
                <label htmlFor="option2">No</label>
              </div>
            </div>
          </div>
          {/*

            Divider

          */}
          {Object.keys(characteristics).map((characteristic) => (
            <div className="form-field">
              <label>
                How would you rate the <em>{characteristic.toLowerCase()}</em>{' '}
                of the product?
              </label>
              <div className="radio-group">
                {Object.keys(characteristics[characteristic].legend).map(
                  (score) => (
                    <div className="radio-option">
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
                      <label
                        htmlFor={`${characteristics[characteristic].id}-${score}`}
                      >
                        {characteristics[characteristic].legend[score]}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
          {/*

            Divider

          */}
          <div className="form-field">
            <label htmlFor="summary">
              <div>Review summary (up to 60 chars)</div>
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
          <div className="form-field">
            <label htmlFor="body">Review body (50 - 1,000 characters)</label>
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
            <div>
              {bodyLength < 50 ? (
                <div className="form-field-helper text-danger">{`Minimum required characters left: ${
                  50 - bodyLength
                }`}</div>
              ) : (
                <div className="form-field-helper text-success">
                  Minimum characters reached.
                </div>
              )}
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

        <button className="btn btn-primary" type="submit" onClick={submitForm}>
          Submit
        </button>
      </div>
    </div>
  );
}

ModalForm.propTypes = {
  closeModalClickHandler: PropTypes.func.isRequired,
};
