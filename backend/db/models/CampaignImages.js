module.exports = (db, DataTypes) => {
    return db.define('Campaign_images', {
        url: {
            type: DataTypes.STRING,
        }
    });
};
