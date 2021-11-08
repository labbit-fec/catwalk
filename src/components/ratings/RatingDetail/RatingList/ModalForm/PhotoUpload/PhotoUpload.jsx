import React, { useState } from 'react';
import axios from 'axios';
import styles from './PhotoUpload.css';
import RatingImages from '../../RatingListEntry/RatingImages/RatingImages';

export default function PhotoUpload({ updateImages }) {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  function uploadImageFiles() {
    const promises = [];

    imageFiles.forEach((imageFile) => {
      const data = new FormData();
      data.append('file', imageFile);
      promises.push(
        axios.post('/api/reviews/uploads', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      );
    });

    Promise.all(promises).then((results) => {
      console.log(results);
      setUploaded(true);
    });
  }

  function changeHandler(event) {
    if (event.target.files && event.target.files[0]) {
      const newImages = [
        ...images,
        ...[...event.target.files].map((file) => URL.createObjectURL(file)),
      ];
      setImages(newImages);
      setImageFiles([
        ...imageFiles,
        ...document.getElementById('photoUploader').files,
      ]);
    }
  }

  return (
    <div className={styles.formField}>
      <div className={styles.formPrompt}>Upload your photos:</div>
      {images.length < 5 && (
        <label htmlFor="photos">
          <button
            type="button"
            onClick={() => {
              document.getElementById('photoUploader').click();
              return false;
            }}
          >
            Add file
          </button>
          <input
            type="file"
            id="photoUploader"
            name="photo"
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
      {uploaded ? (
        'Uploaded'
      ) : (
        <button type="button" onClick={uploadImageFiles}>
          Upload all
        </button>
      )}
    </div>
  );
}
