/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductTextOverview.css';

const ProductTextOverview = ({ product }) => {
  const features = [];
  if (product.features !== undefined) {
    product.features.forEach((object, key) => {
      features.push(
        <div>
          <span key={key}>{object.feature}</span>
          <span key={key}>{object.value}</span>
        </div>
      );
    });
  }

  return (
    <div className={styles.container}>
      <div>{product.slogan}</div>
      <div>{product.description}</div>
      <div>{features}</div>
    </div>
  );
};

ProductTextOverview.propTypes = {
  product: PropTypes.shape({
    slogan: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        feature: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }),
};

ProductTextOverview.defaultProps = {
  product: {
    slogan: 'Placeholder Slogan',
    description: 'This should be a long description',
    features: [
      {
        feature: 'Placeholder feature name',
        value: 'Placeholder feature value',
      },
    ],
  },
};

export default ProductTextOverview;
