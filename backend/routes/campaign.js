const router = require('express').Router();
const { verifyJWT } =  require("../middlewares/verifyJWT");
const { verifyCreator } =  require("../middlewares/verifyCreator");
const controller = require('../controllers/campaign');


router.get('/campaigns', controller.getAllCampaigns);
router.post('/campaigns', verifyJWT, controller.createCampaign);
router.put('/campaign/:id', verifyJWT, verifyCreator, controller.updateCampaign);
router.delete('/campaign/:id', verifyJWT, verifyCreator, controller.deleteCampaign);
router.get('/campaign/:id', controller.getCampaignById);

module.exports = router;