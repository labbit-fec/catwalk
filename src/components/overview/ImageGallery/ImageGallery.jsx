import React, { useState, useContext, useEffect } from 'react';
import styles from './ImageGallery.css';
import selectedStyleContext from '../context/SelectedStyleContext';
import styleDataContext from '../context/StyleDataContext';

const ImageGallery = () => {
  const { styleData } = useContext(styleDataContext);
  const { selectedStyleIndex } = useContext(selectedStyleContext);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainImage, setMainImage] = useState({
    src: 'https://images.unsplash.com/photo-1613758479550-c3fe095bd333?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    alt: 'Corgi Wearing Warm Coat in a Snowy Forest',
  });

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    const newMainImage = {};
    newMainImage.src = styleData[selectedStyleIndex].photos[e.target.tabIndex].url;
    newMainImage.alt = `${styleData[selectedStyleIndex].name} ${e.target.tabIndex}`;
    setMainImage(newMainImage);
  };

  useEffect(() => {
    const newThumbnails = [];
    const newMainImage = {};
    if (styleData[selectedStyleIndex] !== undefined) {
      styleData[selectedStyleIndex].photos.forEach((photo, index) => {
        newThumbnails.push(
          <img
            className={styles.thumbnails}
            src={photo.thumbnail_url}
            alt={`thumbnail ${index}`}
            onClick={handleThumbnailClick}
            onKeyPress={handleThumbnailClick}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
            tabIndex={index}
          />
        );
      });
      newMainImage.src = styleData[selectedStyleIndex].photos[0].url;
      newMainImage.alt = `${styleData[selectedStyleIndex].name} 0`;
    }
    setThumbnails(newThumbnails);
    setMainImage(newMainImage);
  }, [styleData, selectedStyleIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.col}>{thumbnails}</div>
      <img className={styles.mainImg} src={mainImage.src} alt={mainImage.alt} />
    </div>
  );
};

export default ImageGallery;
