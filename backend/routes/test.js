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
                    as: 'ratedBy',
                    attributes: ['id'],
                    through: {
                        where: { userId: 47 },
                    }
                },
            ]
        })
        .then(users => res.send({users, getCampaigns: User.getCampaigns}))
        .catch(err => console.log(err))
});


module.exports = router;