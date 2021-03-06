import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Bar.css';
import StarFilterContext from '../../../context/StarFilterContext';

export default function Slider({ rating, percent, count }) {
  const { starsToShow, filtering, setStarFilter } =
    useContext(StarFilterContext);

  function clickHandler() {
    const newStarsToShow = { ...starsToShow };
    newStarsToShow[rating] = !newStarsToShow[rating];
    const newFiltering = Object.keys(newStarsToShow).some(
      (key) => newStarsToShow[key]
    );
    setStarFilter({ starsToShow: newStarsToShow, filtering: newFiltering });
  }

  return (
    <div
      className={`${styles.container} ${
        // eslint-disable-next-line no-nested-ternary
        filtering
          ? starsToShow[rating]
            ? styles.selected
            : styles.notSelected
          : ''
      }`}
    >
      <div className={styles.rating} style={{ flex: 2 }} onClick={clickHandler}>
        {`${rating} star${rating > 1 ? 's' : ''}: `}
      </div>
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
  count: PropTypes.number.isRequired,
};
