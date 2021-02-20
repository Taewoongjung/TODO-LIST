const Sequelize = require('sequelize');
const Todo = require('./todo');
const config = require('../config/config.json')['test'];
const sequelize = new Sequelize(config.database, config.name, config.password, config);

describe('Todo 모델', () => {
    test('static init 메서드 호출', () => {
        expect(Todo.init(sequelize)).toBe(Todo);
    });
    test('static associate 메서드 호출', () => {
        const db = {
            Todo: {
                belongsTo: jest.fn(),
            },
            User: {},
        }
        Todo.associate(db);
        expect(db.Todo.belongsTo).toBeCalledWith(db.User, { foreignKey: 'commenter', targetKey: 'id'});
        expect(db.Todo.belongsTo).toBeCalledTimes(1);
    });
});