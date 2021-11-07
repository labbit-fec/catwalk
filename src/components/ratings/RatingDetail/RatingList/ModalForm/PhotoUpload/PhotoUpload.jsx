import React from 'react';
import styles from './PhotoUpload.css';

export default function PhotoUpload({ updateImages }) {
  return (
    <div className={styles.formField}>
      <div className={styles.formPrompt}>Upload your photos:</div>
      <input
        type="file"
        id="photos"
        name="photos"
        onChange={updateImages}
        multiple
      />
      <div className={styles.formHelper}>Uploads remaining:</div>
    </div>
  );
}
