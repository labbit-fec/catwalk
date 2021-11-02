import React from 'react';
import PropTypes from 'prop-types';
import styles from './Bar.css';

export default function Slider({ rating, percent, count }) {
  return (
    <div className={styles.container}>
      <div style={{ flex: 2 }}>{`${rating} stars:`}</div>
      <div style={{ flex: 8 }} className={styles.bar}>
        <div style={{ flex: percent }} className={styles.shaded} />
        <div style={{ flex: 1 - percent }} className={styles.unshaded} />
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>{count}</div>
    </div>
  );
}

Slider.propTypes = {
  percent: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
