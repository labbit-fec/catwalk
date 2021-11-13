import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductInformation.css';
import StarGraphic from '../../ratings/RatingSummary/Stars/StarGraphic/StarGraphic';

const ProductInformation = ({ product }) => (
  <div className={styles.container}>
    <StarGraphic stars={4} />
    <div className={styles.category}>{product.category}</div>
    <h1 className={styles.title}>{product.name}</h1>
    <div className={styles.price}>{`$ ${product.default_price}`}</div>
  </div>
);

ProductInformation.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
  }),
};

ProductInformation.defaultProps = {
  product: {
    category: 'Placeholder Category',
    name: 'Placeholder Name',
    default_price: '9001.00',
  },
};

export default ProductInformation;
