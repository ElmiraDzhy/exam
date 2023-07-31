const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Select extends Model{
    static associate(models){

    }
  }

  Select.init({
    type: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    describe: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    modelName: 'Select',
    tableName: 'selects',
    sequelize,
    underscored: true
  });

  return Select;
};
