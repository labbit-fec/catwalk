const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../server-config');

const router = express.Router();

router.get('/products', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${baseUrl}/products/${productId}`, {
      headers: {
        Authorization: authorization,
      },
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch(() => {
      res.status(500).send('Unable to get product for Overview.');
    });
});

module.exports = router;
