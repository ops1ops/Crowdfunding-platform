module.exports = (db, DataTypes) => {
    return db.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
};
