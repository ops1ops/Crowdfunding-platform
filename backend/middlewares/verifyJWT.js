const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');

exports.verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log(token);
    if (token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
           if (err) {
               return res.status(401).send({ errors: 'Invalid token' })
           }
           req.userId = decoded.id;
           next();
        });
    } else {
        return res.status(401).send({ errors: 'No token provided'})
    }
};