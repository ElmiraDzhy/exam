module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        first_name: 'admin',
        last_name: 'admin',
        display_name: 'admin',
        password: '$2b$05$TWfX94DmV7v0kfvNyfJtP.SWk7EHXBtJocVL21LvRfcX8r02V8VZK',
        email: 'admin@gmail.com',
        role: 'moderator',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {});
  },
};
