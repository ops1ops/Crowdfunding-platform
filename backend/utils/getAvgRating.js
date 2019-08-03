const models = require('../db');

const { Rating } = models;

exports.getAvgRating = (campaignId) =>
    Rating
        .findAll({
            where: {
                campaignId
            },
            attributes: ['rating']
        })
        .then(ratings => {
            if (ratings) {
                const sumRate = ratings.reduce((prev, cur) => prev + cur.rating, 0);

                return sumRate / ratings.length;
            }
            return 0;
        })
