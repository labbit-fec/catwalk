import React, { useState } from 'react';
import styles from './PhotoUpload.css';
import RatingImages from '../../RatingListEntry/RatingImages/RatingImages';

export default function PhotoUpload({ updateImages }) {
  const [images, setImages] = useState([]);

  function changeHandler(event) {
    updateImages(event);
    const newImages = [
      ...images,
      ...[...event.target.files].map((photo) => URL.createObjectURL(photo)),
    ];
    setImages(newImages);
  }

  return (
    <div className={styles.formField}>
      <div className={styles.formPrompt}>Upload your photos:</div>
      {images.length < 5 && (
        <label htmlFor="photos">
          <button
            type="button"
            onClick={() => {
              document.getElementById('photos').click();
              return false;
            }}
          >
            Add file
          </button>
          <input
            type="file"
            id="photos"
            name="photos"
            accept="image/*"
            onChange={changeHandler}
            multiple
            style={{ display: 'none' }}
            onClick={() => {}}
          />
        </label>
      )}
      <RatingImages photos={images.map((url) => ({ url }))} />
      <div className={styles.formHelper}>
        Uploads remaining: {Math.max(5 - images.length, 0)}
      </div>
    </div>
  );
}
