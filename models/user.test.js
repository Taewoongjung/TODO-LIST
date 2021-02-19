const Sequelize = require('sequelize');
const User = require('./user');
const config = require('../config/config.json')['test'];
const sequelize = new Sequelize(config.database, config.name, config.password, config);

describe('User 모델', () => {
    test('static init 메서드 호출', () => {
        expect(User.init(sequelize)).toBe(User);
    });
    test('static associate 메서드 호출', () => {
        const db = {
            User: {
                hasMany: jest.fn(),
            },
            Todo: {},
        }
        User.associate(db);
        expect(db.User.hasMany).toBeCalledWith(db.Todo, { foreignKey: 'commenter', sourceKey: 'id' });
        expect(db.User.hasMany).toBeCalledTimes(1);
    });
});
