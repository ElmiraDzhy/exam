module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ratings', {
      offerId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'offer_id',
        references: {
          model: {tableName: 'offers'},
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'user_id',
        references: {
          model: {tableName: 'users'},
          key: 'id',
        },
      },
      mark: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ratings');
  },
};
