import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './StyleSelector.css';
import StylePicker from './StylePicker/StylePicker';
import selectedStyleContext from '../context/SelectedStyleContext';

// eslint-disable-next-line react/prop-types
const StyleSelector = ({ styleData }) => {
  const { selectedStyleIndex } = useContext(selectedStyleContext);

  return (
    <div className={styles.container}>
      Style Selector
      <div className={styles.title}>
        {'Style > '}
        <div>{console.log(styleData[selectedStyleIndex], ' index ', selectedStyleIndex) || styleData[selectedStyleIndex].name}</div>
      </div>
      <StylePicker styleData={styleData} />
    </div>
  );
};

StyleSelector.propTypes = {
  styleData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
};

StyleSelector.defaultProps = {
  styleData: [
    {
      name: 'Placeholder Style Name',
    },
  ],
};

export default StyleSelector;
