const router = require('express').Router();
const controller = require('../controllers/user');

router.post('/auth', controller.login);

module.exports = router;