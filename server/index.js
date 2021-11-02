const express = require('express');

const app = express();
const port = 3000;
const path = require('path');

const axios = require('axios');
const { TOKEN } = require('./config');

app.use(express.static(path.join(__dirname, '../dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports.port = port;
const server = {
  baseUrl: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
  authorization: TOKEN,
};

app.get('/api/reviews/meta/stars', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${server.baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: server.authorization,
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

app.get('/api/reviews/meta/recommended', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${server.baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: server.authorization,
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

app.get('/api/reviews/meta/ratings', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${server.baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: server.authorization,
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

app.get('/api/reviews/meta/characteristics', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${server.baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: server.authorization,
      },
    })
    .then((response) => {
      const { characteristics } = response.data;

      res.status(200).json({ characteristics });
    });
});
