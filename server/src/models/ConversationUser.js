const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ConversationUser extends Model {
    static associate(models) {
      ConversationUser.hasMany(models.Message, {
        foreignKey: 'conversationToUserId',
        targetKey: 'id',
      });
    }
  }

  ConversationUser.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favourite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  }, {
    sequelize,
    modelName: 'ConversationUser',
    tableName: 'conversations_to_users',
    timestamps: false,
    underscored: true,
    uniqueKeys: {
      uniquePairConstraint: {
        fields: ['userId', 'conversationId'],
      },
    },
  });
  return ConversationUser;
};
