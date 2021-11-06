const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../../server-config');

const router = express.Router();

const legend = {
  Size: {
    1: 'A size too small',
    2: '1/2 a size too small',
    3: 'Perfect',
    4: '1/2 a size too big',
    5: 'A size too wide',
  },
  Width: {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide',
  },
  Comfort: {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect',
  },
  Quality: {
    1: 'Poor',
    2: 'Below average',
    3: 'What I expected',
    4: 'Pretty great',
    5: 'Perfect',
  },
  Length: {
    1: 'Runs Short',
    2: 'Runs slightly short',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
  Fit: {
    1: 'Runs tight',
    2: 'Runs slightly tight',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
};

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

router.get('/characteristicsWithOptions', (req, res) => {
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
      const result = Object.keys(characteristics).map((characteristic) => ({
        characteristic: legend[characteristic],
      }));
      res.status(200).json({ characteristics: result });
    });
});

module.exports = router;
