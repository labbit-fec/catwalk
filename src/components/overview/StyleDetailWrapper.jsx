import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import selectedStyleContext from './context/SelectedStyleContext';

const withStyleDetails =
  (WrappedComponent, productId) =>
  (...props) => {
    const [styleData, setStyleData] = useState([{}]);
    const selectedStyleRef = useRef(0);
    const { selectedStyleIndex, setSelectedStyleIndex } =
      useContext(selectedStyleContext);
    selectedStyleRef.current = selectedStyleIndex;

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
          // setSelectedStyleIndex(findDefaultStyleIndex(response.data));
        })
        .catch((error) => {
          console.log('Error getting style details', error);
        });
    }, [selectedStyleRef]);
    // allowed for HOC
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent styleData={styleData} {...props} />;
  };

export default withStyleDetails;
