const router = require('express').Router();
const controller = require('../controllers/campaign');


router.get('/campaigns', controller.getAllCompanies);
router.post('/campaign', controller.createCompany);
router.delete('/campaign', controller.deleteCompany);

module.exports = router;