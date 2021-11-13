import React, { useState, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { VscClose } from 'react-icons/vsc';
import StarsInput from './StarsInput/StarsInput';
import ProductIdContext from '../../../../context/ProductIdContext';
import PhotoUpload from './PhotoUpload/PhotoUpload';

export default function ModalForm({ closeModalClickHandler }) {
  const { productId } = useContext(ProductIdContext);
  const [characteristics, setCharacteristics] = useState({});
  const [errors, setErrors] = useState({});

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

  const charReqs = {
    name: { min: 1, max: 60 },
    email: { min: 1, max: 60 },
    body: { min: 50, max: 100 },
  };

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

  function submitForm(event) {
    event.preventDefault();

    const newErrors = {};
    // Overall rating not filled in
    if (!formData.rating) {
      newErrors.rating = 'Please provide an overall rating.';
    }

    // Name not filled in
    if (formData.name.length === 0) {
      newErrors.name = 'Please provide your nickname.';
    }

    // Email not in proper format
    if (
      !formData.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      newErrors.email = 'Please provide a valid email address.';
    }

    // Recommendation not provided
    if (!formData.recommend) {
      newErrors.recommend = 'Please make a selection.';
    }

    Object.keys(characteristics).forEach((characteristic) => {
      const { id } = characteristics[characteristic];
      if (!formData.characteristics[id]) {
        if (!newErrors.characteristics) {
          newErrors.characteristics = {};
        }
        newErrors.characteristics[
          id
        ] = `Please rate the ${characteristic.toLowerCase()} of the product.`;
      }
    });

    // No review body
    if (formData.body.length === 0) {
      newErrors.body = 'Please provide a body for your review.';
    }

    // Review body less than 50
    if (formData.body.length < 50) {
      newErrors.body = 'Please include at least 50 characters for your review.';
    }

    // Review body greater than 1000
    if (formData.body.length > 1000) {
      newErrors.body = 'Please keep your review to 1000 characters or less.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios.post('/api/reviews/create', formData).then(() => {
        closeModalClickHandler();
      });
    }
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
        {Object.keys(errors).length > 0 && (
          <div className="form-field">
            <label className="text-danger">
              There were errors in your form submission.
            </label>
          </div>
        )}
        <form className="modal-form" onSubmit={submitForm} noValidate>
          <div className="modal-form">
            <div className="form-field">
              <label>
                Overall rating<span className="text-danger">*</span>
              </label>
              {errors.rating && (
                <div className="form-field-helper text-danger">
                  <strong>{errors.rating}</strong>
                </div>
              )}
              <StarsInput updateStarData={updateStarData} />
            </div>
            {/*

              Divider

            */}
            <div className="form-field">
              <label htmlFor="name">
                Your nickname
                <span className="text-danger">*</span>
              </label>
              <span
                className={`form-field-helper form-counter ${
                  formData.name.length < charReqs.name.min ? 'text-danger' : ''
                }`}
              >{`${formData.name.length} / ${charReqs.name.max}`}</span>
              {errors.name && (
                <div className="form-field-helper text-danger">
                  <strong>{errors.name}</strong>
                </div>
              )}
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
              <label htmlFor="email">
                Your email
                <span className="text-danger">*</span>
              </label>
              <span
                className={`form-field-helper form-counter ${
                  formData.email.length < charReqs.email.min
                    ? 'text-danger'
                    : ''
                }`}
              >{`${formData.email.length} / ${charReqs.email.max}`}</span>
              {errors.email && (
                <div className="form-field-helper text-danger">
                  <strong>{errors.email}</strong>
                </div>
              )}
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
              <label>
                Would you recommend this product?
                <span className="text-danger">*</span>
              </label>
              {errors.recommend && (
                <div className="form-field-helper text-danger">
                  <strong>{errors.recommend}</strong>
                </div>
              )}
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
                  <span className="text-danger">*</span>
                </label>
                {errors.characteristics &&
                  errors.characteristics[
                    characteristics[characteristic].id
                  ] && (
                    <div className="form-field-helper text-danger">
                      <strong>
                        {
                          errors.characteristics[
                            characteristics[characteristic].id
                          ]
                        }
                      </strong>
                    </div>
                  )}
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
              <label htmlFor="summary">Review summary</label>
              <input
                type="text"
                id="summary"
                name="summary"
                maxLength="60"
                placeholder="Example: Best purchase ever!"
                value={formData.summmary}
                onChange={updateFormDataByName}
              />
            </div>
            {/*

              Divider

            */}
            <div className="form-field">
              <label htmlFor="body">
                Review body
                <span className="text-danger">*</span>
                <span
                  className={`form-field-helper form-counter ${
                    formData.body.length < charReqs.body.min
                      ? 'text-danger'
                      : ''
                  }`}
                >
                  {' '}
                  {formData.body.length < charReqs.body.min
                    ? `Minimum required characters left: ${
                        charReqs.body.min - formData.body.length
                      }`
                    : `${formData.body.length} / ${charReqs.body.max}`}
                </span>
              </label>
              {errors.body && (
                <div className="form-field-helper text-danger">
                  <strong>{errors.body}</strong>
                </div>
              )}
              <textarea
                id="body"
                name="body"
                placeholder="Why did you like the product or not?"
                minLength="50"
                maxLength="1000"
                rows="18"
                value={formData.body}
                onChange={updateFormDataByName}
              />
            </div>
            {/*

              Divider

            */}
            <PhotoUpload updateImages={updateImages} />
            {/*

              Divider

            */}
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            // onClick={submitForm}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

ModalForm.propTypes = {
  closeModalClickHandler: PropTypes.func.isRequired,
};
