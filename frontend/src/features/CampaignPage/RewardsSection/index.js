import { connect } from 'react-redux';
import RewardSection from './component';
import { deleteRewardRequest, getRewardsRequest } from './actions';
import { selectRewardsSortedByAmount } from './selectors';

export { rewardsReducer } from './reducer';

const mapStateToProps = state => ({
    isLoading: state.rewardsReducer.isLoading,
    rewards: selectRewardsSortedByAmount(state),
    error: state.rewardsReducer.error,
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = () => ({
    getRewards: getRewardsRequest,
    deleteReward: deleteRewardRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(RewardSection);
