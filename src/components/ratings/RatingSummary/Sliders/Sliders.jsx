import React from 'react';
import styles from './Sliders.css';
import Slider from './Slider/Slider';

export default function Sliders() {
  const shaded = 25;

  return (
    <div className={styles.container}>
      <Slider shaded={shaded} />
      <Slider shaded={shaded} />
      <Slider shaded={shaded} />
      <Slider shaded={shaded} />
      <Slider shaded={shaded} />
    </div>
  );
}
