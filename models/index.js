const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comments');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {}; 

const sequelize = new Sequelize(config.database, config.name, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;