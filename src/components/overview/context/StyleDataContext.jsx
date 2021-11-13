import { createContext } from 'react';

const StyleDataContext = createContext({
  styleData: [{}],
  setStyleData: () => {},
});

export default StyleDataContext;
