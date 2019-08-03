module.exports = (dbsetup, DataTypes) => {
    const UserConfirm = dbsetup.define('Confirms', {
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
