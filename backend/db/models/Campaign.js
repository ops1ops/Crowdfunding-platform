module.exports = (db, DataTypes) => {
    return db.define('Company', {
        genre_id: {
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
        goal_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        expiry_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
};
