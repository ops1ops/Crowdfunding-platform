module.exports = (db, DataTypes) => {
    return db.define('Rating', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        campaignId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
};
