import { createContext } from 'react';

const ProductIdContext = createContext({
  productId: null,
  setProductId: () => {},
});

export default ProductIdContext;
