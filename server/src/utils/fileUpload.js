const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', '..', 'public/images');

const filePath = env === 'production'
  ? '/var/www/html/images/'
  : devFilePath;


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



