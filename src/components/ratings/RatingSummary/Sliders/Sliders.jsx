import React from 'react';
import Slider from './Slider/Slider';
import styles from './Sliders.css';

export default function Sliders() {
  return (
    <div className={styles.container}>
      <Slider characteristic="Size" average={1} />
      <Slider characteristic="Width" average={2} />
      <Slider characteristic="Comfort" average={3} />
      <Slider characteristic="Quality" average={4} />
      <Slider characteristic="Length" average={5} />
      <Slider characteristic="Fit" average={1} />
    </div>
  );
}
