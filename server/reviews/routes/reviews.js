const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../../server-config');

const router = express.Router();

router.get('/', (req, res) => {
  const { productId, page, sort, count } = req.query;
  console.log(req.query);
  axios
    .get(`${baseUrl}/reviews`, {
      params: {
        product_id: productId,
        page,
        sort,
        count,
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
