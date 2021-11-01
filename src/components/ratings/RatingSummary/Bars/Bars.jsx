import React from 'react';
import styles from './Bars.css';
import Slider from './Bar/Bar';

export default function Sliders() {
  const shaded = {
    5: 0.1,
    4: 0.3,
    3: 0.3,
    2: 0.2,
    1: 0.1,
  };

  return (
    <div className={styles.container}>
      {Object.keys(shaded)
        .reverse()
        .map((stars) => (
          <Slider stars={stars} shaded={shaded[stars]} />
        ))}
    </div>
  );
}
