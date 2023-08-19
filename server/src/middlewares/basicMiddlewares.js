const db = require('../models');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');
const { env } = require('eslint-config-airbnb-base/legacy');

module.exports.parseBody = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);

  const { body: { contests }, files } = req;
  const HOST = process.env.NODE_HOST || 'http://localhost';
  const PORT = process.env.PORT || 3000;

  const filteredContests = contests.filter(contest => contest.haveFile === true);

  for (let i = 0; i < filteredContests.length; i++) {
    const imagePath =  env === 'production'
      ? `${HOST}:80/images/${files[i].filename}`
      : `${HOST}:${PORT}/public/images/${files[i].filename}`;

    filteredContests[i].fileName = imagePath;
    filteredContests[i].originalFileName = files[i].filename;
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  const { params: { contestId } } = req;
  let result = null;
  try {
    if (req.tokenData.role === CONSTANTS.CUSTOMER) {
      result = await db.Contest.findOne({
        where: { id: contestId, userId: req.tokenData.userId },
      });
    } else if (req.tokenData.role === CONSTANTS.CREATOR) {
      result = await db.Contest.findOne({
        where: {
          id: contestId,
          status: {
            [ db.Sequelize.Op.or ]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    next(new RightsError());
  } else {
    next();
  }

};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CREATOR) {
    return next(new RightsError('this page only for customers'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await db.Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });
    if (result.get({ plain: true }).status ===
      CONSTANTS.CONTEST_STATUS_ACTIVE) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }

};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await db.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = db.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: { [ db.Sequelize.Op.not ]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

