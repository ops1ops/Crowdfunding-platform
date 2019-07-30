const router = require('express').Router();
const models = require('../db');
const User = models.User;
const Campaign = models.Campaign;
const { Category } = models;

router.get('/test', (req, res) => {
    Category
        .findAll({ include: [{ all: true, nested: true }]})
        .then(user => res.json(user))
        .catch(err => console.log(err));
});


module.exports = router;