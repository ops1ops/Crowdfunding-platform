const models = require('../db');
const { CLIENT } = require('../config/config');

const { UserConfirm, User } = models;

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
    // date check

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
