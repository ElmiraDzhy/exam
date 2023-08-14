module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations_to_catalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      conversationId: {
        field: 'conversation_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'conversations',
          key: 'id',
        },
      },
      catalogId: {
        field: 'catalog_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'catalogs',
          key: 'id',
        },
      },
    });
    await queryInterface.addConstraint('conversations_to_catalogs', {
      fields: ['catalog_id', 'conversation_id'],
      type: 'unique',
      name: 'unique_pair_constraint_conversation_catalogs',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations_to_catalogs');
  },
};
