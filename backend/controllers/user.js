const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { jwtKey, confirmSecret } = require('../config/keys');
const models = require('../db');
const sendConfirmationEmail = require('../mailer/index');

const { UserConfirm, User } = models;

exports.login = (req, res) => {
    const { credentials } = req.body;
    User
        .findOne({
            where: { email:  credentials.email }
        })
        .then(user => {
            if (user) {
                const isValidPassword = bcrypt.compareSync(credentials.password, user.password);
                if (isValidPassword) {
                    if (!user.confirmed) {
                        return res.status(400).json({ errors: 'Please confirm your email'})
                    }
                    if (user.blocked) {
                        return res.status(403).json({ errors: 'Your account has been blocked'})
                    }
                    const token = jwt.sign({ id: user.id }, jwtKey);
                    return res.json({
                        token,
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isAuthorized: true
                    });
                }
            }
            return res.status(400).send({ errors: 'Invalid email or password' });
        })
        .catch(err => {
            console.log("[LOG] Error in auth user: ", err.errors.message);
            return res.status(500).send(err.errors.message);
        });
};

exports.signup = (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body.userData;
    const isValidPassword = (password && repeatPassword && (password === repeatPassword));

    if (firstName && lastName && email && isValidPassword) {
        User
            .create({
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, 10)
            })
            .then(user => {
                const token = crypto
                                .createHmac('sha256', confirmSecret)
                                .update(`${user.id}`)
                                .digest('hex');
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1);
                console.log(currentDate);
                UserConfirm
                    .create({
                        token,
                        userId: user.id,
                        endsAt: currentDate
                    })
                    .then(confirm => {
                        sendConfirmationEmail(user.email, confirm.token).catch(console.error);
                        return res.send({ message: 'Registered successfully. Confirm email to continue'});
                    })
                    .catch(err => {
                       return res.status(400).send(err);
                    });
            })
            .catch(err => {
                console.log(err);
                if (err.errors[0] && (err.errors[0].message === 'email_unique must be unique')) {
                    return res.status(400).send({ errors: 'Email is already taken' });
                }
                console.log("[LOG] Error creating in users: ", err);
                return res.status(500).send(err.errors.message);
            });
    } else {
        return res.status(400).send({ errors: 'Invalid data passed'})
    }
};