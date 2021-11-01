import React from 'react';
import { VscStarEmpty, VscStarFull, VscStarHalf } from 'react-icons/vsc';
import styles from './Stars.css';

export default function Stars() {
  return (
    <div className={styles.container}>
      <div className={styles.starCount}>3.5</div>
      <div className={styles.starIcons}>
        <VscStarFull />
        <VscStarFull />
        <VscStarFull />
        <VscStarHalf />
        <VscStarEmpty />
      </div>
    </div>
  );
}
