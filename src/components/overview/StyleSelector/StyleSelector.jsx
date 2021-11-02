import React from 'react';
import styles from './StyleSelector.css';
import StylePicker from './StylePicker/StylePicker';

const StyleSelector = () => (
  <div className={styles.container}>
    Style Selector
    <div className={styles.title}>
      {'Style >'}
      <div>SELECTED STYLE</div>
    </div>
    <StylePicker />
  </div>
);

export default StyleSelector;
