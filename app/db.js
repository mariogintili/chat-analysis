const { development } = require('../../config/config.json');
const Sequelize       = require('sequelize');
const DB              = new Sequelize(development.database, development.username, development.password, { host: development.host, dialect: development.dialect });

module.exports = DB;
