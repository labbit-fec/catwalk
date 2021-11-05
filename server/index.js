const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const reviewRoutes = require('./reviews/routes');

app.use('/api/reviews', reviewRoutes);

// KEVIN: const overviewRoutes = ...
// app.use('/api/overview'...)

const QaRoutes = require('./qa/routes');

app.use('/api/qa', QaRoutes);

const { getProduct } = require('./products');

app.get('/products', (req, res) => {
  getProduct(req.query.name, (err, product) => {
    if (err) { res.sendStatus(500); }
    else { res.send(product); };
  });
});

app.get('/product/*', (req, res) => {
  if (req.path.endsWith('bundle.js')) {
    res.sendFile(path.resolve(__dirname, '../dist/main.bundle.js'));
  }
  else {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  }
});

// eslint-disable-next-line prettier/prettier
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => { });
}

module.exports.port = port;
