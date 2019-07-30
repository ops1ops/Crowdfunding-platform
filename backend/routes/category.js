const router = require('express').Router();
const controller = require('../controllers/category');


router.get('/categories', controller.getAll);

module.exports = router;