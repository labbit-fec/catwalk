import React from 'react';
import styles from './StylePicker.css';

const StylePicker = () => {
  const circles = [];
  for (let index = 0; index < 4; index += 1) {
    circles.push(<span className={styles.dot}></span>);
  }
  return (
    <div className={styles.container}>
      <div className={styles.row}>{circles}</div>
      <div className={styles.row}>{circles}</div>
    </div>
  );
};

export default StylePicker;
