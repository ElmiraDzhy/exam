const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.ConversationUser, { foreignKey: 'conversationToUserId' });
    }
  }

  Message.init({
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversationToUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: false,
    underscored: true,
  });
  return Message;
};
