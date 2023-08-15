module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'role', { type: Sequelize.STRING });
    await queryInterface.sequelize.query('DROP type enum_users_role');
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM,
      values: ['customer', 'creator', 'moderator'],
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'role', { type: Sequelize.STRING });
    await queryInterface.sequelize.query('DROP type enum_users_role');
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM,
      values: ['customer', 'creator'],
      allowNull: false,
    });
  },
};
