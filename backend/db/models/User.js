module.exports = (db, DataTypes) => {
    const User = db.define('User', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Not valid email'
                }
            },
            allowNull: false,
            unique: {
                args: true,
                msg: 'Duplicate email'
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                min: {
                    args: [5],
                    msg: 'Password is too short'
                }
            },
            allowNull: false
        },
    }, {

    });

    return User;
};
