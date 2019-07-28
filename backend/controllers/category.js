const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db/index');
const Category = require('../db/models/Category')(db, Sequelize);

exports.getAll = (req, res) => {
    Category
        .findAll()
        .then(categories => )
}