module.exports = (db, DataTypes) => {
    const UserConfirm = db.define('User_confirm', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endsAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {

    });

    return UserConfirm;
};
