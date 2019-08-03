const models = require('../db');

const { Reward, Campaign } = models;

exports.createReward = (req, res) => {
    const { data } = req.body;
    const isValidData = data && data.name && data.description && data.description.length > 4 && data.amount;


    if (isValidData) {
        Reward
            .create({
                name: data.name,
                campaignId: data.id,
                description: data.description,
                amount: Number(data.amount).toFixed(2),
            })
            .then(reward => {
                return res.send({ reward });
            })
            .catch(err => {
                console.log("log: ", err);
                return res.status(500).send({ errors: 'Unexpected error. Try again later'})
            })
    } else {
        return res.status(400).send({ errors: 'Invalid data passed.' });
    }
};

exports.getAllByCampaign = (req, res) => {
    const { id } = req.params;

    Reward
        .findAll({
            where: {
                campaignId: id
            },
            attributes: ['id', 'name', 'description', 'amount']
        })
        .then(rewards => {
            if (rewards) {
                return res.send({ rewards });
            } else {
                return res.status(400).send({ errors: 'No rewards for this campaign' });
            }
        })
        .catch(err => {
            console.log('log: ', err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later' });
        });
};

exports.updateReward = (req, res) => {
    const { data } = req.body;
    const isValidData =
        data &&
        data.id &&
        data.rewardId &&
        data.name &&
        data.description &&
        data.description.length > 4 &&
        data.amount;

    if (!isValidData) {
        return res.status(400).send({ errors: 'Invalid data passed' });
    }

    Reward
        .update(
            {
                name: data.name,
                description: data.description,
                amount: data.amount,
            },
            { where: { id: data.rewardId }}
        )
        .then(isUpdated => {
            if (isUpdated) {
                return res.send({
                    id: data.rewardId,
                    name: data.name,
                    description: data.description,
                    amount: Number(data.amount).toFixed(2)
                });
            }
            return res.status(500).send({ errors: 'Couldnt update. Try again later' });
        })
        .catch(err => {
            console.log("log: ", err);
            res.status(500).send({ errors: 'Unexpected error. Try again later'})
        });

};

exports.deleteReward = (req, res) => {
    const { rewardId } = req.params;

    Reward
        .destroy({
            where: {
                id: rewardId,
            }
        })
        .then(isDestroyed => {
            if (isDestroyed) {
                return res.send({ id: rewardId });
            }
            return res.status(400).send({ errors: 'Was not deleted. Probably already deleted' })
        })
        .catch(err => {
            console.log("log: ", err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later'})
        });

};

