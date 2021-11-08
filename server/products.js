const path = require('path');
const axios = require('axios');
const { baseUrl, authorization } = require('./server-config');

const filterProduct = (products, name) => {
  let foundProduct = {};
  const formattedName = name.toLowerCase().replace('-', ' ');
  products.forEach((product) => {
    if (product.name.toLowerCase() === formattedName) {
      foundProduct = product;
    }
  });
  return foundProduct;
};

const getProduct = (productShortName, cb) => {
  axios
    .get(`${baseUrl}/products`, {
      headers: { Authorization: authorization },
    })
    .then((response) =>
      cb(null, filterProduct(response.data, productShortName))
    )
    .catch((err) => cb(err));
};

module.exports.getProduct = getProduct;
