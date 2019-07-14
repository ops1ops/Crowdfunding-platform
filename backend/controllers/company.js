const Sequelize = require('sequelize');
const db = require('../db/index');
const Company = require('../db/models/Company')(db, Sequelize);

exports.createCompany = (req, res) => {
    Company
        .create({
            genre_id: 1,
            name: 'test' + Math.random(),
            description: 'desc',
            youtube: 'youtube.com',
            goal_price: 2.234,
            expiry_date: new Date()
        })
            .then(company => {
                res.redirect('/api/companies');
                console.log("Created company with id: ", company.id)
            })
            .catch(err => {
                res.json(err.original.message);
                console.log("Error creating in company: ", err.original.message)
            });
};

exports.getAllCompanies = (req, res) => {
    Company
        .findAll()
        .then(companies => res.json(companies))
        .catch(err => res.json(err));
};


