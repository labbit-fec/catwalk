import React, { useState, useCallback } from 'react';
import { VscStarEmpty, VscStarFull } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import styles from './StarsInput.css';

export default function StarsInput({ updateStarData }) {
  const [tempStarCount, setTempStarCount] = useState(null);
  const [starCount, setStarCount] = useState(null);

  const ratings = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };

  const hoverHandler = useCallback((e) => {
    setTempStarCount(e.target.id);
  }, []);

  const mouseLeaveHandler = useCallback(() => {
    setTempStarCount(null);
  }, []);

  const starClickHandler = useCallback((e) => {
    e.preventDefault();
    setStarCount(tempStarCount);
    updateStarData(tempStarCount);
  });

  return (
    <div className={styles.content} onMouseLeave={mouseLeaveHandler}>
      {[...Array(5).keys()]
        .map((e) => e + 1)
        .map((id) => {
          if (id <= tempStarCount || id <= starCount) {
            return (
              <VscStarFull
                id={id}
                size={28}
                onMouseEnter={hoverHandler}
                onClick={starClickHandler}
              />
            );
          }

          return (
            <VscStarEmpty
              id={id}
              size={28}
              onMouseEnter={hoverHandler}
              onClick={starClickHandler}
            />
          );
        })}
      {starCount && (
        <div className={styles.selected}>
          {`${starCount} (${ratings[starCount]})`}
        </div>
      )}
    </div>
  );
}

StarsInput.propTypes = {
  updateStarData: PropTypes.func.isRequired,
};
