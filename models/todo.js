const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
            order: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            done: {
                type: Sequelize.BOOLEAN,
                defaultValue: null,
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Todo',
            tableName: 'todo',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Todo.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});
    }
};