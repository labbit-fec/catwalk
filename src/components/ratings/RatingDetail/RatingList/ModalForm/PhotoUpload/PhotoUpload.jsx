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
      updateImages(results.map((result) => result.data.data));
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
    <div className="form-field">
      <label>
        Upload your photos
        <span className="form-field-helper form-counter">
          {images.length} / 5
        </span>
      </label>
      <div style={{ marginLeft: '-0.625rem' }}>
        <label htmlFor="photos">
          {!uploaded && images.length < 5 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById('photoUploader').click();
                return false;
              }}
            >
              Add file
            </button>
          )}
          {!uploaded && images.length > 0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={uploadImageFiles}
            >
              Upload all
            </button>
          )}
        </label>
      </div>
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
      {images.length > 0 && (
        <RatingImages photos={images.map((url) => ({ url }))} />
      )}
      {uploaded && (
        <div className="form-field-helper text-success">
          Uploaded successfully
        </div>
      )}
    </div>
  );
}
