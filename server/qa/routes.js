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

router.get('/questions/:questionId/answers', (req, res) => {
  const { productId } = req.query;
  const { questionId } = req.params;
  axios
    .get(`${baseUrl}/qa/questions/${questionId}/answers`, {
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

router.put('/questions/:questionId/helpful', (req, res) => {
  const { productId } = req.query;
  const { questionId } = req.params;

  axios
    .put(`${baseUrl}/qa/questions/${questionId}/helpful`, null, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then(() => {
      res.status(204).send('Question was marked as helpful!');
    })
    .catch(() => {
      res.status(500).send('Unable to complete request.');
    });
});

router.put('/answers/:answerId/helpful', (req, res) => {
  const { productId } = req.query;
  const { answerId } = req.params;

  axios
    .put(`${baseUrl}/qa/answers/${answerId}/helpful`, null, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then(() => {
      res.status(204).send('Answer was marked as helpful!');
    })
    .catch(() => {
      res.status(500).send('Unable to complete request.');
    });
});

module.exports = router;
