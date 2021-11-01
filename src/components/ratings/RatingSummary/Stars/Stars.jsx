import React from 'react';
import styles from './Stars.css';
import StarGraphic from './StarGraphic/StarGraphic';

export default function Stars() {
  return (
    <div className={styles.container}>
      <div className={styles.starCount}>3.5</div>
      <StarGraphic stars={3.5} />
    </div>
  );
}
