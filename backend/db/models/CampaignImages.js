module.exports = (db, DataTypes) => {
    return db.define('Campaign_images', {
        campaignId: {
            type: DataTypes.INTEGER,
        },
        url: {
            type: DataTypes.STRING,
        }
    });
};
