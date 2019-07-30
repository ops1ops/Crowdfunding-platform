module.exports = (db, DataTypes) => {
    return db.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
    });
};
