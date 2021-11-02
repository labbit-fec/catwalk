const express = require('express');
const axios = require('axios');
const { baseUrl, authorization } = require('../server-config');

const router = express.Router();

const metaRouter = require('./meta');

router.use('/meta', metaRouter);

module.exports = router;
