import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './StylePicker.css';
import selectedStyleContext from '../../context/SelectedStyleContext';

// eslint-disable-next-line react/prop-types
const StylePicker = ({ styleData }) => {
  const thumbnails = [];
  const { selectedStyleIndex, setSelectedStyleIndex } =
    useContext(selectedStyleContext);

  const handleStyleClick = (e) => {
    e.preventDefault();
    setSelectedStyleIndex(e.target.tabIndex);
  };

  if (styleData[0].name !== undefined) {
    styleData.forEach((currentStyle, styleIndex) => {
      thumbnails.push(
        <img
          alt={`${currentStyle.name} style thumbnail`}
          src={currentStyle.photos[0].thumbnail_url}
          className={
            selectedStyleIndex === styleIndex
              ? `${styles.selected} ${styles.img}`
              : styles.img
          }
          onClick={handleStyleClick}
          onKeyPress={handleStyleClick}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="button"
          tabIndex={styleIndex}
        />
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>{thumbnails}</div>
    </div>
  );
};

StylePicker.propTypes = {
  styleData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          thumbnail_url: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    })
  ),
};

StylePicker.defaultProps = {
  styleData: [
    {
      name: 'Black',
      photos: [
        {
          thumbnail_url: `https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80`,
          url: `https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80`,
        },
      ],
    },
  ],
};

export default StylePicker;
