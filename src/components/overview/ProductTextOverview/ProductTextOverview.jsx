/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { VscPass, VscDash } from 'react-icons/vsc';
import styles from './ProductTextOverview.css';

const ProductTextOverview = ({ product }) => {
  const features = [];
  if (product.features !== undefined) {
    product.features.forEach((object, key) => {
      features.push(
        <div className={styles.features}>
          <VscPass className={styles.vsc} />{' '}
          <span key={key} className={styles.feature}>
            {`${object.feature}: `}
          </span>
          <span key={-key} className={styles.value}>
            {object.value}
          </span>
        </div>
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h4 className={styles.slogan}>{product.slogan}</h4>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.verticalline} />
      </div>
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
