const express = require('express');

const router = express.Router();

const reviewRouter = require('./reviews');
const metaRouter = require('./meta');

router.use('/', reviewRouter);
router.use('/meta', metaRouter);

module.exports = router;
