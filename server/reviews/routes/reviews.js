const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../../server-config');
const { storage } = require('../../firebase');

const router = express.Router();

router.get('/', (req, res) => {
  const { productId, page, sort, count } = req.query;
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

router.put('/:reviewId/helpful', (req, res) => {
  const { reviewId } = req.params;
  axios({
    method: 'put',
    url: `${baseUrl}/reviews/${reviewId}/helpful`,
    headers: {
      Authorization: authorization,
    },
  }).then((response) => {
    res.status(204).send(response.data);
  });
});

router.put('/:reviewId/report', (req, res) => {
  const { reviewId } = req.params;
  axios({
    method: 'put',
    url: `${baseUrl}/reviews/${reviewId}/report`,
    headers: {
      Authorization: authorization,
    },
  }).then((response) => {
    res.status(204).send(response.data);
  });
});

router.post('/photos', (req, res) => {
  console.log('received');
  const { photo } = req.body;
  const uploadTask = storage.ref(`images/${photo.name}`).put(photo);
  uploadTask.on(
    'state-changed',
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref('images')
        .child(photo.name)
        .getDownloadURL()
        .then((url) => {
          res.status(201).send({ url });
        });
    }
  );
});

module.exports = router;
