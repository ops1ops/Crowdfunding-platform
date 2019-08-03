import { combineReducers } from 'redux';
import { loginPageReducer } from '../features/LoginPage';
import { createCampaignPageReducer } from '../features/CampaignEditorPage';
import { campaignPageReducer } from '../features/CampaignPage';
import { createRewardReducer } from '../features/CampaignPage/RewardEditorModal';
import { rewardsReducer } from '../features/CampaignPage/RewardsSection';
import { userPageReducer } from '../features/ProfilePage';

export const rootReducer = combineReducers({
    createCampaignPageReducer,
    userPageReducer,
    campaignPageReducer,
    createRewardReducer,
    rewardsReducer,
    user: loginPageReducer,
});
