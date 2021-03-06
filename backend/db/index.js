const Sequelize = require('sequelize');
const db = require('./setup');

const models = {};

models.User = require('./models/User')(db, Sequelize);
models.Campaign = require('./models/Campaign')(db, Sequelize);
models.Images = require('./models/Images')(db, Sequelize);
models.Reward = require('./models/Rewards')(db, Sequelize);
models.Category = require('./models/Category')(db, Sequelize);
models.Confirms = require('./models/Confirms')(db, Sequelize);
models.UserReward = require('./models/UserReward')(db, Sequelize);
models.Rating = require('./models/Rating')(db, Sequelize);
models.Comment = require('./models/Comment')(db, Sequelize);
models.Like = require('./models/Like')(db, Sequelize);

models.User.belongsToMany(models.Comment, {
    as: 'likedComments',
    through: { model: models.Like},
    foreignKey: 'userId',
});
models.Comment.belongsToMany(models.User, {
    as: 'likedBy',
    through: { model: models.Like},
    foreignKey: 'commentId',
});

models.User.belongsToMany(models.Campaign, {
    as: 'commentedCampaigns',
    through: { model: models.Comment},
    foreignKey: 'userId',
});
models.Campaign.belongsToMany(models.User, {
    as: 'commentedBy',
    through: { model: models.Comment},
    foreignKey: 'campaignId',
});

models.User.belongsToMany(models.Campaign, {
    as: 'ratedCampaigns',
    through: { model: models.Rating},
    foreignKey: 'userId',
});
models.Campaign.belongsToMany(models.User, {
    as: 'ratedBy',
    through: { model: models.Rating},
    foreignKey: 'campaignId',
});

models.Reward.belongsToMany(models.User, {
    as: 'users',
    through: 'user_rewards',
    foreignKey: 'rewardId',
    otherKey: 'userId'
});
models.User.belongsToMany(models.Reward, {
    as: 'rewards',
    through: 'user_rewards',
    foreignKey: 'userId',
    otherKey: 'rewardId'
});

models.Like.belongsTo(models.Comment);
models.Comment.hasMany(models.Like);

models.Comment.belongsTo(models.User, {as: 'user'});
models.User.hasMany(models.Comment, {as: 'comments'});

models.Reward.belongsTo(models.Campaign, {as: 'campaign'});
models.Campaign.hasMany(models.Reward, {as: 'rewards'});

models.Campaign.belongsTo(models.Category, {as: 'category'});
models.Category.hasMany(models.Campaign, {as: 'campaigns'});

models.Campaign.belongsTo(models.User, {as: 'user'});
models.User.hasMany(models.Campaign, {as: 'campaigns'});

models.Images.belongsTo(models.Campaign);
models.Campaign.hasMany(models.Images, {as: 'images'});

module.exports = models;