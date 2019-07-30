const models = require('../db');

const { Category } = models;

exports.getAll = (req, res) => {
    Category
        .findAll()
        .then(categories => res.json({ categories }))
        .catch(err => {
            console.log("LOG: ", err);
            res.status(500).send({ errors: 'Something went wrong' })
        })
};

exports.findByName = (name) => {
    Category
        .findOne({
            where: {
                name
            }
        })
        .then(category => category.id)
        .catch(err => err);
};