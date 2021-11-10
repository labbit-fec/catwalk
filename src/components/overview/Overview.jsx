import React, { useState, useContext } from 'react';
import styles from './Overview.css';
import withProductDetails from './ProductDetailWrapper';
import withStyleDetails from './StyleDetailWrapper';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';
import ProductInformation from './ProductInformation/ProductInformation';
import StyleSelector from './StyleSelector/StyleSelector';
import ProductTextOverview from './ProductTextOverview/ProductTextOverview';
import ProductIdContext from '../context/ProductIdContext';
import SelectedStyleContext from './context/SelectedStyleContext';

const Overview = () => {
  const { productId } = useContext(ProductIdContext);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const styleProvidedValue = { selectedStyleIndex, setSelectedStyleIndex };
  const ProductInformationWithDetails = withProductDetails(
    ProductInformation,
    productId
  );
  const ProductTextOverviewWithDetails = withProductDetails(
    ProductTextOverview,
    productId
  );

  const StyleSelectorWithDetails = withStyleDetails(StyleSelector, productId);

  return (
    <div className={styles.container}>
      Product Overview
      <div className={styles.context}>
        <SelectedStyleContext.Provider value={styleProvidedValue}>
          <div className={styles.upper}>
            <ImageGallery />
            <div className={styles.right}>
              <ProductInformationWithDetails />
              <StyleSelectorWithDetails />
              <AddToCart />
            </div>
          </div>
        </SelectedStyleContext.Provider>
        <ProductTextOverviewWithDetails />
      </div>
    </div>
  );
};

export default Overview;
