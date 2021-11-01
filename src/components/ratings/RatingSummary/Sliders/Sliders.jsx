import React from 'react';
import Slider from './Slider/Slider';
import styles from './Sliders.css';

export default function Sliders() {
  return (
    <div className={styles.container}>
      <Slider characteristic="Size" average={4.5} />
      <Slider characteristic="Width" average={3} />
      <Slider characteristic="Comfort" average={3.5} />
      <Slider characteristic="Quality" average={2} />
      <Slider characteristic="Length" average={1} />
      <Slider characteristic="Fit" average={4} />
    </div>
  );
}
