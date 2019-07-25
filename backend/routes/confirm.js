const router = require('express').Router();
const controller = require('../controllers/confirm');


router.get('/confirm/:token', controller.confirmEmail);


module.exports = router;