import React from 'react';
import PropTypes from 'prop-types';
import styles from './Bar.css';

export default function Slider({ stars, shaded }) {
  return (
    <div className={styles.container}>
      <div style={{ flex: 2 }}>{`${stars} stars:`}</div>
      <div style={{ flex: 8 }} className={styles.bar}>
        <div style={{ flex: shaded }} className={styles.shaded} />
        <div style={{ flex: 1 - shaded }} className={styles.unshaded} />
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        {Math.floor(Math.random() * (40 - 1) + 1)}
      </div>
    </div>
  );
}

Slider.propTypes = {
  shaded: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
};
