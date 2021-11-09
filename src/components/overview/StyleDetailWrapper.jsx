import React, { useState, useEffect } from 'react';
import axios from 'axios';

const withStyleDetails =
  (WrappedComponent, productId) =>
  (...props) => {
    const [styleData, setStyleData] = useState([]);

    useEffect(() => {
      axios
        .get('/api/overview/products/', {
          params: {
            productId: productId,
          },
        })
        .then((response) => {
          setStyleData(response.data);
        })
        .catch((error) => {
          console.log('Error getting style details', error);
        });
    }, []);
    // allowed for HOC
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent styleData={styleData} {...props} />;
  };

export default withStyleDetails;
