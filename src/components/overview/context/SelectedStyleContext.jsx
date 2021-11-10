import { createContext } from 'react';

const SelectedStyleContext = createContext({
  selectedStyleIndex: 0,
  setSelectedStyleIndex: () => {},
});

export default SelectedStyleContext;
