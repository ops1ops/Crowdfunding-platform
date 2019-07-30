const Sequelize = require('sequelize');
const db = require('./setup');

const models = {};

models.User = require('./models/User')(db, Sequelize);
models.Campaign = require('./models/Campaign')(db, Sequelize);
models.CampaignImages = require('./models/CampaignImages')(db, Sequelize);
models.Category = require('./models/Category')(db, Sequelize);
models.UserConfirm = require('./models/UserConfirm')(db, Sequelize);


models.Campaign.belongsTo(models.Category, {as: 'category'});
models.Category.hasMany(models.Campaign, {as: 'campaigns'});

models.Campaign.belongsTo(models.User, {as: 'user'});
models.User.hasMany(models.Campaign, {as: 'campaigns'});

models.CampaignImages.belongsTo(models.Campaign);
models.Campaign.hasMany(models.CampaignImages, {as: 'images'});

module.exports = models;