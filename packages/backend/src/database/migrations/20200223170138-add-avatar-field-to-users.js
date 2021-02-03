module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Users', 'avatarId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Files',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('Users', 'avatarId'),
};
