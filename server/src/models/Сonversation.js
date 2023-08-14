const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.belongsToMany(models.Catalog, {
        through: 'conversations_to_catalogs',
        foreignKey: 'conversationId',
      });
      Conversation.belongsToMany(models.User, {
        through: 'conversations_to_users',
        foreignKey: 'conversationId',
      });
    }
  }

  Conversation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Conversation',
    tableName: 'conversations',
    timestamps: false,
    underscored: true,
  });
  return Conversation;
};
