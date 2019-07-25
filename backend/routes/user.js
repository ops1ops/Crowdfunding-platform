const router = require('express').Router();
const controller = require('../controllers/user');


router.post('/users', controller.signup);


module.exports = router;