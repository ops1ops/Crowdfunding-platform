module.exports = (db, DataTypes) => {
    return db.define('Campaign', {
        genreId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        },
        youtube: {
            type: DataTypes.STRING
        },
        goalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
};
