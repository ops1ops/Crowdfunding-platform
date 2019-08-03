const router = require('express').Router();
const controller = require('../controllers/user');
const { verifyJWT } =  require("../middlewares/verifyJWT");


router.post('/users', controller.signup);
router.get('/users/:id', verifyJWT, controller.getById);


module.exports = router;