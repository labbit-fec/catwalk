const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../server-config');

const router = express.Router();

router.get('/questions', (req, res) => {
  const { productId, count } = req.query;
  axios
    .get(`${baseUrl}/qa/questions`, {
      params: {
        product_id: productId,
        count,
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
  const { productId, count } = req.query;
  const { questionId } = req.params;
  axios
    .get(`${baseUrl}/qa/questions/${questionId}/answers`, {
      params: {
        product_id: productId,
        count,
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

router.put('/answers/:answerId/report', (req, res) => {
  const { answerId } = req.params;
  const { productId } = req.query;

  axios
    .put(`${baseUrl}/qa/answers/${answerId}/report`, null, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then(() => {
      res.status(204).send('Answer was successfully reported!');
    })
    .catch(() => {
      res.status(500).send('Unable to complete request.');
    });
});

router.post('/questions', (req, res) => {
  const { body, name, email, product_id } = req.body.params;

  const data = JSON.stringify({
    body,
    name,
    email,
    product_id,
  });

  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions`;

  const config = {
    headers: {
      Connection: 'keep-alive',
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(url, data, config)
    .then(() => {
      res.status(201).send('Question was successfully posted!');
    })
    .catch(() => {
      res.status(500).send('Unable to complete request.');
    });
});

router.post('/questions/:questionId/answers', (req, res) => {
  const { questionId } = req.params;
  const { body, name, email, photos } = req.body.params;

  const data = JSON.stringify({
    body,
    name,
    email,
    photos,
  });

  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${questionId}/answers`;

  const config = {
    headers: {
      Connection: 'keep-alive',
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(url, data, config)
    .then(() => {
      res.status(201).send('Answer was successfully posted!');
    })
    .catch(() => {
      res.status(500).send('Unable to complete request.');
    });
});

module.exports = router;
