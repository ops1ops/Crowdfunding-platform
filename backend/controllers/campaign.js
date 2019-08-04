const models = require('../db');
const { getAvgRate } = require('../utils/getAvgRate');
const { getAvgRating } = require('../utils/getAvgRating');
const db = require('../db/setup');

const { Category, Campaign, UserReward, Images, User, Rating } = models;


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
                    })
                    .catch(err => {
                        console.log("log: ", err);
                        if (err.original.code ==='ER_DUP_ENTRY') {
                            return res.status(400).json({ errors: 'Title is already taken' });
                        }
                        return res.status(500).send({ errors: 'Unexpected error. Try again later' });
                    });
            })
            .catch(() => {
                return res.status(400).send({ errors: 'This category doesnt exist' })
            })
    } else {
        return res.status(400).send({ errors: 'Not full data provided' });
    }
};

exports.updateCampaign = (req, res) => {
    const { data } = req.body;
    const { updateInfo } = data;

    Category
        .findOne({
            where: {
                name: updateInfo.category
            }
        })
        .then(category => {
            if (!category) return res.status(404).send({ errors: 'Category doesnt exist' });
            Campaign
                .update(
                    {
                        title: updateInfo.title,
                        categoryId: category.id,
                        description: updateInfo.description,
                        youtubeLink: updateInfo.link,
                        goalAmount: updateInfo.goalAmount,
                        expirationDate: updateInfo.expirationDate,
                    },
                        { where: { id: data.id }}
                )
                .then(isUpdated => {
                    if (isUpdated) {
                        Images
                            .destroy({
                                where: {
                                    campaignId: data.id
                                }
                            })
                            .then(destroyed => {
                                updateInfo.images.forEach(item => {
                                    Images
                                        .create({
                                            campaignId: data.id,
                                            url: item
                                        })
                                        .then(image => console.log(image))
                                        .catch(err => console.log(err));
                                });
                            })
                            .catch(err => {
                                console.log("log, ", err)
                                return res.status(500).send({ errors: 'Unexpected error. Try again later' });
                            });
                        return res.send({ id: data.id });
                    }
                    return res.status(500).send({ errors: 'Unexpected error. Try again later' });
                })
                .catch(err => {
                    console.log("log: ", err);
                    return res.status(400).send({ error: err.message });
                })
        })
        .catch(err => {
            console.log("log: ", err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later' });
        });
};

exports.getAllCampaigns = (req, res) => {
    Campaign
        .findAll()
        .then(companies => res.json(companies))
        .catch(err => res.json(err));
};

exports.deleteCampaign = (req, res) => {
    const { id } = req.params;

    Campaign
        .destroy({
            where: {
                id
            }
        })
        .then(isDestroyed => {
            if (isDestroyed) {
                return res.send({ id });
            }
            return res.status(400).send({ errors: 'Was not deleted' })
        })
        .catch(err => {
            console.log("log: ", err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later'})
        });

};

exports.getCampaignById = (req, res) => {
    const { id } = req.params;
    const { userId } = req.params;

    Campaign
        .findOne({
            where: {
                id
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: User,
                    as: 'ratedBy',
                    attributes: ['id'],
                    through: {
                        attributes: ['rating'],
                    }
                },
                {
                    model: Images,
                    as: 'images',
                    attributes: ['id', 'url']
                }
            ]
        })
        .then(campaign => {
            if (campaign) {
                const avgRate = getAvgRate(campaign);
                const ratedByCount = campaign.ratedBy.length;
                const ratedBy = campaign.ratedBy.find(item => {
                    if (Number(item.id) === Number(userId)) return item;
                });

                return res.json({
                    campaign,
                    avgRate,
                    ratedByCount,
                    ratedBy: ratedBy ? ratedBy.Rating.rating : 0

                });
            }
            return res.status(404).send({ errors: 'Campaign doesnt exist' });
        })
        .catch(err => {
            console.log("log: ", err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later'});
        })
};


exports.supportCampaign = (req, res) => {
    const { userId } = req;
    const { data } = req.body;
    const isDataProvided = data && data.id && data.rewardId;

    if (!isDataProvided) {
        return res.status(400).send({ errors: 'Required data was not provided' })
    }

    Campaign
        .findOne({
            where: {
                id: data.id
            },
            include: ['rewards']
        })
        .then(campaign => {
            if (campaign) {
                const rewardIndex = campaign.rewards.findIndex(item => item.id === data.rewardId);
                if (rewardIndex === -1) {
                    return res.status(404).send({ errors: 'Reward doesnt exist' });
                }
                return db.transaction(t => {
                    return UserReward
                        .create({
                            userId,
                            rewardId: data.rewardId
                        },
                            {transaction: t})
                        .then(userReward => {
                            const newAmount =
                                Number(campaign.currentAmount) + Number(campaign.rewards[rewardIndex].amount);
                            return Campaign
                                .update(
                                    {
                                        currentAmount: newAmount,
                                    },
                                    { where: { id: data.id }},
                                    {transaction: t}
                                )
                                .then(isUpdated => {
                                    if (isUpdated) return newAmount;
                                })
                        });
                }).then(newAmount => {
                    if (newAmount) {
                        return res.send({ newAmount });
                    }
                }).catch(err => {
                    if (err.original && err.original.code === 'ER_DUP_ENTRY') {
                        return res.status(400).send({ errors: 'You already have this reward' })
                    }
                    console.log("transaction log: ", err);
                    return res.status(500).send({ errors: 'Unexpected error. Try again later' });
                });
            } else {
                return res.status(404).send({ errors: 'Campaign doesnt exist' })
            }
        })
        .catch(err => {
            console.log("log: ", err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later' })
        });

};

exports.rateCampaign = (req, res) => {
    const { data } = req.body;
    const { userId } = req;

    Rating
        .findOrCreate({
            where: {
                userId,
                campaignId: data.id
            },
            defaults: { rating: data.rating }
        })
        .then(([rating, created]) => {
            if (!created) {
                Rating
                    .update(
                        {
                            rating: data.rating,
                        },
                        {
                            where: {
                                userId,
                                campaignId: data.id
                            }
                        }
                    )
                    .then(isUpdated => {
                        if (!isUpdated) return res.status(400).send({ errors: 'Could not rate campaign' });
                        getAvgRating(data.id).then(avgRate => {
                            return res.send({ avgRate, rating: data.rating });
                        })
                    })
            } else {
                getAvgRating(data.id).then(avgRate => {
                    return res.send({ avgRate, rating: data.rating });
                })
            }

        })
        .catch(err => {
            console.log("log: ", err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later' });
        });

};
