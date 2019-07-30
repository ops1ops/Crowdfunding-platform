const Sequelize = require('sequelize');
const { database } = require('../config/keys');

const db = new Sequelize(database.name, database.username, database.password, {
   host: database.host,
   dialect: database.dialect
});

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db;