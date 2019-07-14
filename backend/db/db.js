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

const Company = require('../models/Company')(db, Sequelize);

Company.create({
    genre_id: 1,
    name: 'test',
    description: 'desc',
    youtube: 'youtube.co',
    goal_price: 2.234,
    expiry_date: new Date()
}).then(company => console.log(company.id))
    .catch(err => console.log("Error creating in company: ", err.original.message));



module.exports = db;