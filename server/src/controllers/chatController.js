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
        user_id: participants,
        conversation_id: conversationId,
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

module.exports.getPreview = async (req, res, next) => {
  try{
    const { userId } = req.tokenData;

    const conversationData = await db.User.findByPk(userId, {
      include: [
        {
          model: db.Conversation,
          include: [
            {
              model: db.User,
              attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
              through: {
                model: db.ConversationUser,
              },
            },
          ],
          through: {
          },
        },
      ],
    });
    const rawObject = conversationData.get({ plain: true });

    const conversations = rawObject.Conversations.map((conversation) => ({
      id: conversation.id,
      participants: conversation.Users.map(u => u.id),
      blackList: conversation.Users.map(u => u.conversations_to_users.blocked),
      favoriteList: conversation.Users.map(u => u.conversations_to_users.favourite),
      interlocutor: conversation.Users.filter(u => u.id !== userId)[0],
    }));

    res.status(200).send(conversations);
  }catch(err){
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try{
    const { participants } = req.body;
    const { userId } = req.tokenData;

    const conversation = await db.ConversationUser.findOne({
      attributes: ['conversation_id'],
      where: {
        userId: participants,
      },
      group: ['conversation_id'],
      having: db.Sequelize.literal('COUNT(DISTINCT user_id) = 2'),
      raw: true,
    });

    const [row, data] = await db.ConversationUser.update(
      { blocked: req.body.blackListFlag },
      {
        where: { conversationId: conversation.conversation_id, userId },
        returning: true,
        raw: true,
      },
    );

    const favouriteAndBlock =  await db.ConversationUser.findAll({
      attributes: ['blocked', 'favourite'],
      where: {
        user_id: participants,
        conversation_id: conversation.conversation_id,
      },
      order: [['user_id', 'DESC']],
      raw: true,
    });

    const blockedArray = favouriteAndBlock.map(item => item.blocked);
    const favArray = favouriteAndBlock.map(item => item.favourite);

    data[0].participants = [...participants];
    data[0].favoriteList = favArray;
    data[0].blackList = blockedArray;

    res.status(200).send(data[0]);
  }catch(err){
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try{
    const { participants } = req.body;
    const { userId } = req.tokenData;

    const conversation = await db.ConversationUser.findOne({
      attributes: ['conversation_id'],
      where: {
        userId: participants,
      },
      group: ['conversation_id'],
      having: db.Sequelize.literal('COUNT(DISTINCT user_id) = 2'),
      raw: true,
    });

    const [row, data] = await db.ConversationUser.update(
      { favourite: req.body.favoriteFlag },
      {
        where: { conversationId: conversation.conversation_id, userId },
        returning: true,
        raw: true,
      },
    );


    const favouriteAndBlock =  await db.ConversationUser.findAll({
      attributes: ['blocked', 'favourite'],
      where: {
        user_id: participants,
        conversation_id: conversation.conversation_id,
      },
      order: [['user_id', 'DESC']],
      raw: true,
    });

    const blockedArray = favouriteAndBlock.map(item => item.blocked);
    const favArray = favouriteAndBlock.map(item => item.favourite);

    data[0].participants = [...participants];
    data[0].favoriteList = favArray;
    data[0].blackList = blockedArray;

    res.status(200).send(data[0]);
  }catch(err){
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try{
    const newCatalogInstance = await db.Catalog.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
    });
    const conversationInstance = await db.Conversation.findByPk(req.body.chatId);
    await newCatalogInstance.addConversation(conversationInstance);
    const chats = await newCatalogInstance.getConversations();
    newCatalogInstance.chats = chats;

    res.status(201).send(newCatalogInstance);
  }catch(err){
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    await db.Catalog.update({
      catalogName: req.body.catalogName,
    },
    {
      where: {
        id: req.body.catalogId,
      },
    });

    const result = await db.Catalog.findOne({
      where: {
        id: req.body.catalogId,
      },
      include: [{ model: db.Conversation }],
      raw: true,
    });

    result.chats = [ result['Conversations.id']];
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try{
    const catalogInstance = await db.Catalog.findByPk(req.body.catalogId);
    const conversationToAdd = await db.Conversation.findByPk(req.body.chatId);
    await catalogInstance.addConversation(conversationToAdd);

    res.status(200).send(conversationToAdd.dataValues);
  }catch(err){
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try{
    const catalogInstance = await db.Catalog.findByPk(req.query.catalogId);
    const conversationToRemove = await db.Conversation.findByPk(req.query.chatId);
    await catalogInstance.removeConversation(conversationToRemove);

    const allConversationInCatalog = await db.Conversation.findAll({
      attributes: ['id'],
      include: [
        {
          model: db.Catalog,
          through: {},
          where: { id: req.query.catalogId },
          attributes: [],
        },
      ],
      raw: true,
    });

    catalogInstance.dataValues.chats = allConversationInCatalog.map(chat => chat.id);

    res.status(200).send(catalogInstance.dataValues);
  }catch(err){
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try{
    const catalogInstance = await db.Catalog.findByPk(req.params.catalogId);
    await catalogInstance.setConversations([]);
    await db.Catalog.destroy({
      where: { id: req.params.catalogId },
      include: [
        {
          model: db.Conversation,
          through: { attributes: [] },
        },
      ],
    });
    const user = await db.User.findByPk(req.tokenData.userId);
    const catalogs = await user.getCatalogs();
    res.status(200).send(catalogs);
  }catch(err){
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try{
    const catalogs = await db.Catalog.findAll({
      where: {
        userId: req.tokenData.userId,
      },
      include: [
        {
          model: db.Conversation,
          through: { attributes: ['id'] },
          attributes: ['id'],
        },
      ],
    });

    const rawResult = catalogs.map(item => item.get({ plain: true }));

    const result = rawResult.map(catalog => ({
      id: catalog.id,
      catalogName: catalog.catalogName,
      chats: catalog['Conversations'].map(conversation => conversation.id),
    }));

    res.status(200).send({ data: result });
  }catch(err){
    next(err);
  }
};
