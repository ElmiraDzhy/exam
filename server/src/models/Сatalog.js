const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate(models) {
      Catalog.belongsTo(models.User, { foreignKey: 'userId' });
      Catalog.belongsToMany(models.Conversation, {
        through: 'conversations_to_catalogs',
        foreignKey: 'catalogId',
      });
    }
  }

  Catalog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Catalog',
    tableName: 'catalogs',
    underscored: true,
    timestamps: false,
  });

  return Catalog;
};
