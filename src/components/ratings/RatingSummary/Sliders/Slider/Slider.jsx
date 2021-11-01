import React from 'react';
import PropTypes from 'prop-types';
import styles from './Slider.css';

export default function Slider({ shaded }) {
  return (
    <div className={styles.container}>
      <div style={{ flex: 2 }}>5 stars:</div>
      <div className={styles.slider}>
        <div style={{ flex: `${shaded}` }} className={styles.shaded} />
        <div style={{ flex: `${100 - shaded}` }} className={styles.unshaded} />
      </div>
    </div>
  );
}

Slider.propTypes = {
  shaded: PropTypes.number.isRequired,
};
