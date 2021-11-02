const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../../server-config');

const router = express.Router();

router.get('/firstTwoReviews', (req, res) => {
  const { productId } = req.query;

  axios
    .get(`${baseUrl}/reviews`, {
      params: {
        product_id: productId,
        page: 2,
        count: 2,
        sort: 'newest',
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
