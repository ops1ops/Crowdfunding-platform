const router = require('express').Router();
const models = require('../db');
const User = models.User;
const Campaign = models.Campaign;
const { Category, Reward } = models;

router.get('/test', (req, res) => {
    Campaign
        .findAll({
            include: [
                {
                    model: User,
                    as: 'commentedBy',
                },
            ]
        })
        .then(users => res.send({ users }))
        .catch(err => console.log(err))
});


module.exports = router;