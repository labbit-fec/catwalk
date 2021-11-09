import { createContext } from 'react';

const StarFilterContext = createContext({
  starFilter: null,
  setStarFilterContext: () => {},
});

export default StarFilterContext;
