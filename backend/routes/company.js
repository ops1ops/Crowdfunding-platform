const router = require('express').Router();
const controller = require('../controllers/company');


router.post('/companies/create', controller.createCompany);
router.get('/companies', controller.getAllCompanies);

module.exports = router;