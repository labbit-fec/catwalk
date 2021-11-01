import React from 'react';
import PropTypes from 'prop-types';
import { VscTriangleDown } from 'react-icons/vsc';
import styles from './Slider.css';

export default function Slider({ characteristic, average }) {
  return (
    <div className={styles.container}>
      <div className={styles.sliderTitle}>{characteristic}</div>
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
        <div>Too small</div>
        <div>Perfect</div>
        <div>Too large</div>
      </div>
    </div>
  );
}

Slider.propTypes = {
  characteristic: PropTypes.string.isRequired,
  average: PropTypes.number.isRequired,
};
