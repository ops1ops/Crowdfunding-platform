module.exports = (db, DataTypes) => {
        return db.define('Rewards', {
        campaignId: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        }
    });
};
