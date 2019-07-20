const router = require('express').Router();
const controller = require('../controllers/company');


router.get('/companies', controller.getAllCompanies);
router.post('/companies/create', controller.createCompany);
router.delete('/companies/delete', controller.deleteCompany);

module.exports = router;