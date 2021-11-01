import React from 'react';
import { VscStarEmpty, VscStarFull } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import styles from './StarGraphic.css';

export default function StarGraphic({ stars }) {
  return (
    <div className={styles.starsEmpty}>
      <VscStarEmpty />
      <VscStarEmpty />
      <VscStarEmpty />
      <VscStarEmpty />
      <VscStarEmpty />
      <div
        className={styles.starsFull}
        style={{ width: `${100 * (stars / 5)}%` }}
      >
        <VscStarFull />
        <VscStarFull />
        <VscStarFull />
        <VscStarFull />
        <VscStarFull />
      </div>
    </div>
  );
}

StarGraphic.propTypes = {
  stars: PropTypes.number.isRequired,
};
