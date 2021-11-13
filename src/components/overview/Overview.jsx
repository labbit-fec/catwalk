import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styles from './Overview.css';
import withProductDetails from './ProductDetailWrapper';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';
import ProductInformation from './ProductInformation/ProductInformation';
import StyleSelector from './StyleSelector/StyleSelector';
import ProductTextOverview from './ProductTextOverview/ProductTextOverview';
import ProductIdContext from '../context/ProductIdContext';
import StyleDataContext from './context/StyleDataContext';
import SelectedStyleContext from './context/SelectedStyleContext';

const Overview = () => {
  const { productId } = useContext(ProductIdContext);
  const [styleData, setStyleData] = useState([{}]);
  const styleDataProvided = { styleData, setStyleData };
  const [selectedStyleIndex, setSelectedStyleIndex] = useState([]);
  const styleProvidedValue = { selectedStyleIndex, setSelectedStyleIndex };

  const ProductInformationWithDetails = withProductDetails(
    ProductInformation,
    productId
  );
  const ProductTextOverviewWithDetails = withProductDetails(
    ProductTextOverview,
    productId
  );

  const findDefaultStyleIndex = (someStyles) => {
    let result = 0;
    someStyles.forEach((style, index) => {
      if (style['default?']) result = index;
    });
    return result;
  };

  useEffect(() => {
    axios
      .get('/api/overview/styles/', {
        params: {
          productId: productId,
        },
      })
      .then((response) => {
        setStyleData(response.data.results);
        setSelectedStyleIndex(findDefaultStyleIndex(response.data.results));
      })
      .catch((error) => {
        console.log('Error getting style details', error);
      });
  }, [productId]);

  return (
    <div className={styles.container}>
      {/* Product Overview */}
      <div className={styles.context}>
        <StyleDataContext.Provider value={styleDataProvided}>
          <SelectedStyleContext.Provider value={styleProvidedValue}>
            <div className={styles.upper}>
              <ImageGallery />
              <div className={styles.right}>
                <ProductInformationWithDetails />
                <StyleSelector />
                <AddToCart />
              </div>
            </div>
          </SelectedStyleContext.Provider>
        </StyleDataContext.Provider>
        <ProductTextOverviewWithDetails />
      </div>
    </div>
  );
};

export default Overview;
