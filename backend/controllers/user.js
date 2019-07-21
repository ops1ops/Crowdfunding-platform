const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');
const db = require('../db/index');
const User = require('../db/models/User')(db, Sequelize);

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
                    const token = jwt.sign({ email: credentials.email }, jwtKey, { expiresIn: 43200});
                    return res.json({
                        token,
                        email: credentials.email,
                        isAuthorized: true
                    });
                }

                return res.status(401).send({ errors: 'Check for correct your email and password'});
            }

            return res.status(404).send({ errors: 'User with this email and password does not exist' });
        })
        .catch(err => {
            console.log("log: ", err);
            res.status(500).send(err.message)
        });




    // User
    //     .create({
    //         email: 'qw@mail.ru',
    //         password: bcrypt.hashSync('12345', 10)
    //     })
    //     .then(company => {
    //         res.send('User created successfully');
    //         console.log("Created companies with id: ", company.id)
    //     })
    //     .catch(err => {
    //         res.status(404).send(err.message);
    //         console.log("Error creating in companies: ", err.message)
    //     });



};

