import { connect } from 'react-redux';
import ProfilePage from './component';
import { getUserInfoRequest } from './actions';

export { userPageReducer } from './reducer';

const mapStateToProps = state => ({
    isLoading: state.userPageReducer.isLoading,
    error: state.userPageReducer.error,
    userInfo: state.userPageReducer.user,
    user: state.user,
});

const mapDispatchToProps = () => ({
    getUserInfo: getUserInfoRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(ProfilePage);
