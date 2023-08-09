const db = require('../models/index');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');


module.exports.addMessage = async (req, res, next) => {
  try{
    const participants = [req.tokenData.userId, req.body.recipient];
    participants.sort((participant1, participant2) => participant1 - participant2);

    const conversationToUser = await db.ConversationUser.findOne({
      attributes: ['conversation_id'],
      where: {
        userId: participants,
      },
      group: ['conversation_id'],
      having: db.Sequelize.literal('COUNT(DISTINCT user_id) = 2'),
      raw: true,
    });

    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];

    const interlocatorInstance = await db.User.findByPk(interlocutorId);
    const senderInstance = await db.User.findByPk(req.tokenData.userId);

    let conversationId;
    if(!conversationToUser){
      const newConversation = await db.Conversation.create();
      await interlocatorInstance.addConversation(newConversation);
      await senderInstance.addConversation(newConversation);
      conversationId = newConversation.id;
    }else{
      conversationId = conversationToUser.conversation_id;
    }

    const { id: conversationToUserId } = await db.ConversationUser.findOne({
      attributes: ['id'],
      where: {
        conversationId,
        userId: req.tokenData.userId,
      },
      raw: true,
    });


    const favouriteAndBlock =  await db.ConversationUser.findAll({
      attributes: ['blocked', 'favourite'],
      where: {
        user_id: [3, 1],
        conversation_id: 19,
      },
      order: [['user_id', 'ASC']],
      raw: true,
    });

    const blockedArray = favouriteAndBlock.map(item => item.blocked);
    const favArray = favouriteAndBlock.map(item => item.favourite);

    const result = await db.Message.create({
      conversationToUserId,
      body: req.body.messageBody,
    });

    const rawResult = result.get({ plain: true });

    const message = await db.Message.findOne({
      where: {
        id: rawResult.id,
      },
      include: [
        {
          model: db.ConversationUser,
          attributes: ['userId'],
        },
      ],
    });

    const preview = {
      id: conversationId,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: blockedArray,
      favoriteList: favArray,
    };

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        id: conversationId,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: blockedArray,
        favoriteList: favArray,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });

    res.status(201).send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  }catch(err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  try{
    const { query: { interlocutorId } } = req;
    const participants = [req.tokenData.userId, Number(interlocutorId)];
    participants.sort((participant1, participant2) => participant1 - participant2);

    const conversation = await db.ConversationUser.findOne({
      attributes: ['conversation_id'],
      where: {
        userId: {
          [db.Sequelize.Op.in]: participants,
        },
      },
      group: ['conversation_id'],
      having: db.Sequelize.literal('COUNT(DISTINCT user_id) = 2'),
    });

    let messages;
    if(conversation){
      messages = await db.Message.findAll({
        include: [
          {
            model: db.ConversationUser,
            where: {
              conversationId: conversation.dataValues.conversation_id,
            },
          },
        ],
      });
    } else{
      messages = [];
    }

    const interlocutor = await userQueries.findUser({ id: Number(interlocutorId) });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  }catch(err){
    next(err);
  }
};
