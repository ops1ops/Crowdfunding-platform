module.exports = (db, DataTypes) => {
    return db.define('User_Reward', {
        rewardId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
};
