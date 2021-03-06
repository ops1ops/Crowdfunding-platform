module.exports = (dbsetup, DataTypes) => {
    const UserConfirm = dbsetup.define('Confirm', {
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
