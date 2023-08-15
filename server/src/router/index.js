const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');

const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const { checkImage } = require('../middlewares/checkImage');

const router = express.Router();

router.post('/registration', validators.validateRegistrationData, hashPass, userController.registration);

router.post('/login', validators.validateLogin, userController.login);

router.post('/pay', checkToken.checkToken, basicMiddlewares.onlyForCustomer, upload.array('files', 3), basicMiddlewares.parseBody, validators.validateContestCreation, userController.payment);

router.get('/getUser', checkToken.checkAuth);

router.post('/changeMark', checkToken.checkToken, basicMiddlewares.onlyForCustomer, userController.changeMark);

router.patch('/updateUser', checkToken.checkToken, upload.single('file'), checkImage, userController.updateUser);

router.post('/cashout', checkToken.checkToken, basicMiddlewares.onlyForCreative, userController.cashout);

module.exports = router;
