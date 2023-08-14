const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = process.env.NODE_ENV || 'development';
const CONSTANTS = require('../constants');

const filePath = env === 'production'
  ? '/var/www/html/images/'
  : CONSTANTS.IMAGE_STATIC_PATH;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;



