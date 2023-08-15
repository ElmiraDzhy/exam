const db = require('../models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    type: 'login',
    user: 'elmira.freshcode@gmail.com',
    pass: 'qihuscepzxmejndn',
  },
});

const sendEmail = (mailOptions) => {
  transporter.sendMail(mailOptions,  (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports.getAllOffers = async (req, res, next) => {
  try{
    const { query: { offset, limit } } = req;
    const offers = await db.Offer.findAll({
      where: {
        status: 'pending',
        isModerate: null,
      },
      limit,
      offset: offset || 0,
    });
    res.status(200).send(offers);
  }catch(err){
    next(err);
  }
};

module.exports.confirmOffer = async (req, res, next) => {
  try{
    const { params: { offerId } } = req;

    await db.Offer.update({ isModerate: true }, {
      where: {
        id: offerId,
      },
    });

    const offerInstance = await db.Offer.findOne({
      where: { id: offerId },
    });

    const userToMail = await db.User.findOne({
      where: {
        id: offerInstance.userId,
      },
    });

    const mailOptions = {
      from: 'elmira.freshcode@gmail.com',
      to: userToMail.email,
      subject: 'Squadhelp offer moderate',
      text: 'Your offer was confirmed by moderator',
    };

    sendEmail(mailOptions);

    const offers = await db.Offer.findAll({
      where: {
        status: 'pending',
        isModerate: null,
      },
    });

    res.status(200).send(offers);
  }catch(err){
    next(err);
  }
};

module.exports.rescindOffer = async (req, res, next) => {
  try{
    const { params: { offerId } } = req;
    await db.Offer.update({ isModerate: false }, {
      where: {
        id: offerId,
      },
    });

    const offerInstance = await db.Offer.findOne({
      where: { id: offerId },
    });

    const userToMail = await db.User.findOne({
      where: {
        id: offerInstance.userId,
      },
    });

    const mailOptions = {
      from: 'elmira.freshcode@gmail.com',
      to: userToMail.email,
      subject: 'Squadhelp offer moderate',
      text: 'Your offer was reject by moderator',
    };

    sendEmail(mailOptions);

    const offers = await db.Offer.findAll({
      where: {
        status: 'pending',
        isModerate: null,
      },
    });

    res.status(200).send(offers);
  }catch(err){
    next(err);
  }
};
