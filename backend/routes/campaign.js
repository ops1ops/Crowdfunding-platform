const router = require('express').Router();
const { verifyJWT } =  require("../middlewares/verifyJWT");
const { verifyCreator } =  require("../middlewares/verifyCreator");
const campaignController = require('../controllers/campaign');
const rewardController = require('../controllers/reward');


router.get('/campaigns', campaignController.getAllCampaigns);
router.post('/campaigns', verifyJWT, campaignController.createCampaign);
router.put('/campaign/:id', verifyJWT, verifyCreator, campaignController.updateCampaign);
router.delete('/campaign/:id', verifyJWT, verifyCreator, campaignController.deleteCampaign);
router.get('/campaign/:id', campaignController.getCampaignById);

router.post('/campaign/:id/rewards', verifyJWT, verifyCreator, rewardController.createReward);

module.exports = router;