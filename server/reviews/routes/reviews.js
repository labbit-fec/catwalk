const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../../server-config');
const multerMid = require('../../middleware/multer');
const uploadImage = require('../helpers');

const router = express.Router();

router.use(multerMid.single('file'));

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

router.post('/uploads', async (req, res) => {
  console.log('received');
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);
    res.status(200).json({
      message: 'Upload was successful',
      data: imageUrl,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
