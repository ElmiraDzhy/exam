const express = require('express');
const { checkModeratorRole } = require('../middlewares/checkModeratorRole');
const checkToken = require('../middlewares/checkToken');
const offerController = require('../controllers/offerController');

const offerRouter = express.Router();

offerRouter.get('/getAllOffers', checkToken.checkToken, checkModeratorRole, offerController.getAllOffers);

offerRouter.patch('/confirmOffer/:offerId', checkToken.checkToken, checkModeratorRole, offerController.confirmOffer);

offerRouter.patch('/rescindOffer/:offerId', checkToken.checkToken, checkModeratorRole, offerController.rescindOffer);

module.exports = offerRouter;
