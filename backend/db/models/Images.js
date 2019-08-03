module.exports = (db, DataTypes) => {
    return db.define('Images', {
        campaignId: {
            type: DataTypes.INTEGER,
        },
        url: {
            type: DataTypes.STRING,
        }
    });
};
