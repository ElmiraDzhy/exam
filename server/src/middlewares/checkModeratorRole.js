const RightsError = require('../errors/RightsError');

module.exports.checkModeratorRole = async (req, res, next) => {
  try{
    if(req.tokenData.role === 'moderator'){
      return next();
    }else{
      return new RightsError('Only moderator access');
    }
  }catch(err){
    next(err);
  }
};
