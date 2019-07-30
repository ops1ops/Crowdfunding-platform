const models = require('../db');

const { Category, Campaign, CampaignImages, User } = models;


exports.createCampaign = (req, res) => {
    const { data } = req.body;
    const isDataValid =
        data &&
        data.title &&
        data.link &&
        data.category &&
        data.goalAmount &&
        data.expirationDate &&
        data.description;

    if (isDataValid) {
        Category
            .findOne({
                where: {
                    name: data.category,
                }
            })
            .then(category => {
                const imagesWithURL = data.images.map(item => {return {url: item}});
                Campaign
                    .create({
                        title: data.title,
                        categoryId: category.id,
                        description: data.description,
                        userId: req.userId,
                        images: imagesWithURL,
                        youtubeLink: data.link,
                        goalAmount: data.goalAmount,
                        expirationDate: data.expirationDate
                    }, {
                        include: [ 'images' ]
                    })
                    .then(campaign => {
                        res.send({ id: campaign.id});
                        console.log("Created campaign with id: ", campaign.id);
                    })
                    .catch(err => {
                        res.status(400).json(err);
                        console.log("Error creating in Component: ", err);
                    });
            })
            .catch(() => {
                return res.status(400).send({ errors: 'This category doesnt exist' })
            })
    } else {
        return res.status(400).send({ errors: 'No data provided' });
    }
};

exports.getAllCampaigns = (req, res) => {
    Campaign
        .findAll()
        .then(companies => res.json(companies))
        .catch(err => res.json(err));
};

exports.deleteCampaign = (req, res) => {

};
