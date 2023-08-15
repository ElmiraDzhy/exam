const express = require('express');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const { checkImage } = require('../middlewares/checkImage');

const contestRouter = express.Router();

contestRouter.get('/dataForContest', checkToken.checkToken, contestController.dataForContest);

contestRouter.get('/getCustomersContests', checkToken.checkToken, contestController.getCustomersContests);

contestRouter.get('/getContestById/:contestId', checkToken.checkToken, basicMiddlewares.canGetContest, contestController.getContestById);

contestRouter.get('/getAllContests', checkToken.checkToken, basicMiddlewares.onlyForCreative, contestController.getContests);

contestRouter.get('/downloadFile/:fileName', checkToken.checkToken, contestController.downloadFile);

contestRouter.post('/updateContest', checkToken.checkToken, upload.single('file'), contestController.updateContest);

contestRouter.post('/setNewOffer', checkToken.checkToken, upload.single('offerData'), checkImage, basicMiddlewares.canSendOffer, contestController.setNewOffer);

contestRouter.post('/setOfferStatus', checkToken.checkToken, basicMiddlewares.onlyForCustomerWhoCreateContest, contestController.setOfferStatus);

module.exports = contestRouter;
