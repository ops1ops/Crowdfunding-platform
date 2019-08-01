const models = require('../db');

const { Campaign } = models;

exports.verifyCreator = (req, res, next) => {
    const { userId } = req;
    const { id } = req.params;

    console.log(id, userId)

    console.log(id, userId)

    Campaign
        .findOne({
            where: {
                id,
                userId
            }
        })
        .then(campaign => {
            if (campaign) {
                next();
            } else {
                return res.status(403).send({ errors: 'Only creator can edit or delete campaign' });
            }
        })
        .catch(err => {
            res.status(400).send({ errors: 'Unexpected error'});
        })

};