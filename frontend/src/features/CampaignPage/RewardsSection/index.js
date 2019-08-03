import { connect } from 'react-redux';
import RewardSection from './component';
import {deleteRewardRequest, getRewardsRequest, supportCampaignRequest} from './actions';
import { selectRewardsSortedByAmount } from './selectors';

export { rewardsReducer } from './reducer';

const mapStateToProps = state => ({
    isLoading: state.rewardsReducer.isLoading,
    isSupportLoading: state.campaignPageReducer.isSupportloading,
    rewards: selectRewardsSortedByAmount(state),
    error: state.rewardsReducer.error,
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = () => ({
    supportCampaign: supportCampaignRequest,
    getRewards: getRewardsRequest,
    deleteReward: deleteRewardRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(RewardSection);
