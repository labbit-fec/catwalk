import React from 'react';
import PropTypes from 'prop-types';
import { VscTriangleDown } from 'react-icons/vsc';
import styles from './Slider.css';

export default function Slider({ characteristic, legend, average }) {
  return (
    <div className={styles.container}>
      <div className={styles.sliderTitle} style={{ fontWeight: '600' }}>
        {characteristic}
      </div>
      <div className={styles.thirds}>
        <div
          style={{ left: `calc(${100 * ((average - 1) / 4)}% - 0.5em)` }}
          className={styles.arrow}
        >
          <VscTriangleDown />
        </div>
        <div className={styles.third} />
        <div className={styles.third} />
        <div className={styles.third} />
      </div>
      <div className={styles.labels}>
        <div className={styles.label}>{legend[1]}</div>
        <div className={styles.label}>{legend[3]}</div>
        <div className={styles.label}>{legend[5]}</div>
      </div>
    </div>
  );
}

Slider.propTypes = {
  characteristic: PropTypes.string.isRequired,
  average: PropTypes.number.isRequired,
  legend: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
