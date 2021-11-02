const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const reviewRoutes = require('./reviews/routes');

app.use('/api/reviews', reviewRoutes);

// KEVIN: const overviewRoutes = ...
// app.use('/api/overview'...)

// JONATHAN: const QaRoutes = ...
// app.use(...)

app.listen(port, () => {});

module.exports.port = port;
