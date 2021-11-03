const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../../server-config');

const router = express.Router();

router.get('/firstTwoReviews', (req, res) => {
  const { productId, sort } = req.query;

  axios
    .get(`${baseUrl}/reviews`, {
      params: {
        product_id: productId,
        page: 1,
        count: 2,
        sort,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then((response) => {
      res.status(200).json({ reviews: response.data.results });
    });
});

module.exports = router;
