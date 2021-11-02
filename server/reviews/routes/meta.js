const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../../server-config');

const router = express.Router();

router.get('/stars', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then((response) => {
      const { ratings } = response.data;
      const count = Object.keys(ratings).reduce(
        (previous, current) => previous + parseFloat(ratings[current]),
        0
      );
      const sum = Object.keys(ratings).reduce(
        (previous, current) =>
          previous + parseFloat(current) * parseFloat(ratings[current]),
        0
      );
      res.status(200).json({ stars: sum / count });
    });
});

router.get('/recommended', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then((response) => {
      const { recommended } = response.data;

      const recoPercent =
        Number(recommended.true) /
        (Number(recommended.true) + Number(recommended.false));

      res.status(200).json({ recommended: recoPercent });
    });
});

router.get('/ratings', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then((response) => {
      const { ratings } = response.data;
      const totalRatings = Object.keys(ratings).reduce(
        (total, current) => total + Number(ratings[current]),
        0
      );

      const result = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: Number(ratings[rating]) || 0,
        percent: Number(ratings[rating] || 0) / totalRatings,
      }));

      res.status(200).json({ ratings: result });
    });
});

router.get('/characteristics', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then((response) => {
      const { characteristics } = response.data;

      Object.keys(characteristics).forEach((key) => {
        characteristics[key].value = Number(characteristics[key].value);
      });

      res.status(200).json({ characteristics });
    });
});

module.exports = router;
