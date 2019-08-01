const models = require('../db');

const { CampaignRewards, Campaign } = models;

exports.createReward = (req, res) => {
    const { data } = req.body;
    const isValidData = data && data.name && data.description && data.description.length > 4 && data.price;

    if (isValidData) {
        console.log(data);
        CampaignRewards
            .create({
                name: data.name,
                campaignId: data.id,
                description: data.description,
                amount: data.price,
            })
            .then(reward => {
                console.log(reward.id);
                return res.send({ id: reward.id });
            })
            .catch(err => {
                console.log("log: ", err);
                return res.status(500).send({ errors: 'Unexpected error. Try again later'})
            })
    } else {
        return res.status(400).send({ errors: 'Invalid data passed.' });
    }
};

