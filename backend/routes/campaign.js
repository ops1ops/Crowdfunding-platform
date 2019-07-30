const router = require('express').Router();
const { verifyJWT } =  require("../middlewares/verifyJWT");
const controller = require('../controllers/campaign');


router.get('/campaigns', controller.getAllCampaigns);
router.post('/campaigns', verifyJWT, controller.createCampaign);
router.delete('/campaign', controller.deleteCampaign);

module.exports = router;