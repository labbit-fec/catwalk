import React, { useContext } from 'react';
import styles from './StyleSelector.css';
import StylePicker from './StylePicker/StylePicker';
import selectedStyleContext from '../context/SelectedStyleContext';
import styleDataContext from '../context/StyleDataContext';

// eslint-disable-next-line react/prop-types
const StyleSelector = () => {
  const { styleData } = useContext(styleDataContext);
  const { selectedStyleIndex } = useContext(selectedStyleContext);
  console.log(styleData, ' index ', selectedStyleIndex);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {'Style > '}
        <div>
          {styleData[selectedStyleIndex] === undefined
            ? 'Placeholder Style'
            : styleData[selectedStyleIndex].name}
        </div>
      </div>
      <StylePicker styleData={styleData} />
    </div>
  );
};

export default StyleSelector;
