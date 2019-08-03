module.exports = (db, DataTypes) => {
    return db.define('Image', {
        campaignId: {
            type: DataTypes.INTEGER,
        },
        url: {
            type: DataTypes.STRING,
        }
    });
};
