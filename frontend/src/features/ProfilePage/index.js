import { connect } from 'react-redux';
import ProfilePage from './component';
import { deleteCampaignRequest, getUserInfoRequest } from './actions';

export { userPageReducer } from './reducer';

const mapStateToProps = state => ({
    isLoading: state.userPageReducer.isLoading,
    error: state.userPageReducer.error,
    userInfo: state.userPageReducer.user,
    user: state.user,
});

const mapDispatchToProps = () => ({
    getUserInfo: getUserInfoRequest,
    deleteCampaign: deleteCampaignRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(ProfilePage);
