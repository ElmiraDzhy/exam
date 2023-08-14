const env = process.env.NODE_ENV || 'development';

module.exports.checkImage = async(req, res, next) => {
  try{
    const { file } = req;
    if(file) {
      const HOST = process.env.NODE_HOST || 'http://localhost';
      const PORT = process.env.PORT || 3000;
      const imagePath =  env === 'production'
        ? `${HOST}:80/images/${file.filename}`
        : `${HOST}:${PORT}/public/images/${file.filename}`;

      req.body.imagePath = imagePath;
    }
    next();
  }catch(err){
    next(err);
  }
};
