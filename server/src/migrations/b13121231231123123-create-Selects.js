module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('selects', {
      type: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
    }, {
      timestamp: false,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('selects');
  },
};
