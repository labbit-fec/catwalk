import { createContext } from 'react';

export const ProductIdContext = createContext({
  productId: null,
  setProductId: () => {},
});
