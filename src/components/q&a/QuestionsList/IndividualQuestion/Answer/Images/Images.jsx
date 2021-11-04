import React from 'react';
import PropTypes from 'prop-types';
import styles from './Images.css';

const Images = function ({ photos }) {
  return (
    <div className={styles.container}>
      {photos.map((photo) => (
        <img className={styles.img} src={photo.url} alt="" />
      ))}
    </div>
  );
};

export default Images;

Images.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};
