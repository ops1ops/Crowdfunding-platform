const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db/index');
const Company = require('../db/models/Company')(db, Sequelize);

exports.createCompany = (req, res) => {
    Company
        .create({
            genre_id: 1,
            name: 'test1' + Math.random(),
            description: 'desc',
            youtube: 'youtube.com',
            goal_price: 2.234,
            expiry_date: new Date()
        })
            .then(company => {
                res.redirect('/api/companies');
                console.log("Created companies with id: ", company.id)
            })
            .catch(err => {
                res.json(err.original.message);
                console.log("Error creating in companies: ", err.original.message)
            });
};

exports.getAllCompanies = (req, res) => {
    Company
        .findAll()
        .then(companies => res.json(companies))
        .catch(err => res.json(err));
};

exports.deleteCompany = (req, res) => {
    Company
        .destroy({
            where: {
                name: {
                    [Op.like]: '%test%'
                }
            }
        })
        .then(destroyed => {
            console.log("destroyed: ", destroyed);
            res.redirect('/api/companies');
        })
        .catch(err => res.json(err));
};
