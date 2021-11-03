import React from 'react';
import PropTypes from 'prop-types';
import styles from './Images.css';

const Images = function ({ photos }) {
  return (
    <div className={styles.container}>
      {photos.map((photo) => (
        <img className={styles.img} src={photo} alt="" />
      ))}
      {/* <img
        className={styles.img}
        src="https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
        alt="some dummy"
      />
      <img
        className={styles.img}
        src="https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        alt="some dummy"
      />
      <img
        className={styles.img}
        src="https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
        alt="some dummy"
      /> */}
    </div>
  );
};

export default Images;

Images.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
};
