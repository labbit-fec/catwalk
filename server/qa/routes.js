const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../server-config');

const router = express.Router();

router.get('/questions', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${baseUrl}/qa/questions`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then((response) => {
      const { results } = response.data;
      res.status(200).send(results);
    })
    .catch(() => {
      res.status(500).send('Unable to complete request.');
    });
});

router.get('/questions/:question_id/answers', (req, res) => {
  const { productId } = req.query;
  // eslint-disable-next-line camelcase
  const { question_id } = req.params;
  axios
    // eslint-disable-next-line camelcase
    .get(`${baseUrl}/qa/questions/${question_id}/answers`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch(() => {
      res.status(500).send('Unable to complete request.');
    });
});

module.exports = router;
