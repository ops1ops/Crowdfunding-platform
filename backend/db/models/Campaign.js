module.exports = (dbsetup, DataTypes) => {
    const Campaign = dbsetup.define('Campaign', {
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        },
        youtubeLink: {
            type: DataTypes.STRING
        },
        currentAmount: {
            type: DataTypes.DECIMAL,
        },
        goalAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    return Campaign;
};
