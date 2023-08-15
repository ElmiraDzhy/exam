module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contestType: {
        allowNull: false,
        type: Sequelize.ENUM('name', 'tagline', 'logo'),
        field: 'contest_type',
      },
      fileName: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'file_name',
      },
      originalFileName: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'original_file_name',
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      typeOfName: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'type_of_name',
      },
      industry: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      focusOfWork: {
        allowNull: true,
        type: Sequelize.TEXT,
        field: 'focus_of_work',
      },
      targetCustomer: {
        allowNull: true,
        type: Sequelize.TEXT,
        field: 'target_customer',
      },
      styleName: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'style_name',
      },
      nameVenture: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'name_venture',
      },
      typeOfTagline: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'type_of_tagline',
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      brandStyle: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'brand_style',
      },
      prize: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'order_id',
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contests');
  },
};
