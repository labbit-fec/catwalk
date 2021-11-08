const Cloud = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.join(__dirname, 'gc-config.json');

const { Storage } = Cloud;

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'robust-shadow-331422',
});

module.exports = storage;
