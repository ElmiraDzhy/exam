module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations_to_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
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
      favourite: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    });
    await queryInterface.addConstraint('conversations_to_users', {
      fields: ['user_id', 'conversation_id'],
      type: 'unique',
      name: 'unique_pair_constraint',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations_to_users');
  },
};
