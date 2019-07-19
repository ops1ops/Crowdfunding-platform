import { connect } from 'react-redux';
import LoginPage from './component';
import { userLogin } from './actions';

export { loginPageReducer } from './reducer';

const mapStateToProps = store => ({
    isLoading: store.user.isLoading,
    isAuthorized: store.user.isAuthorized,
    errors: store.user.errors,
});

const mapDispatchToProps = () => ({
    login: userLogin,
});

export default connect(
    mapStateToProps,
    { login: userLogin }
)(LoginPage);
