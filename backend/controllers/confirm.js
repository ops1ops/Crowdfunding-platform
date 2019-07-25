const Sequelize = require('sequelize');
const db = require('../db/index');
const { CLIENT } = require('../config/config');
const UserConfirm = require('../db/models/UserConfirm')(db, Sequelize);
const User = require('../db/models/User')(db, Sequelize);

const getDeletedUser = (deleteItem) => {
    return UserConfirm
            .findOne({
                where: deleteItem
            })
            .then(result => {
                return UserConfirm
                        .destroy({
                            where: deleteItem
                        })
                    .then(() => result)
                    .catch(err => console.log(err));
            })
            .catch(err => console.log("log: ", err));
};

exports.confirmEmail = (req, res) => {
    const { token } = req.params;
    // refactor and date check

    getDeletedUser({ token })
        .then(result => {
            if (result) {
                User
                    .update(
                        { confirmed: 1},
                        { where: { id: result.userId }}
                    )
                    .then(() => res.redirect(`${CLIENT}/login`)
                        .catch(err => console.log(err)));
            } else {
                res.redirect(`${CLIENT}/error/${encodeURIComponent('Probably token expired')}`);
            }

        })
        .catch(err => {
            if (err.message === 'WHERE parameter "token" has invalid "undefined" value') {
                res.redirect(`${CLIENT}/error/${encodeURIComponent('Token doesnt exist')}`);
            }
        });
};
