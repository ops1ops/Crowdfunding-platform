import { connect } from 'react-redux';
import LoginPage from './component';
import { userLogin } from './actions';

export { loginPageReducer } from './reducer';

const mapStateToProps = store => {
    return {
        user: store.user,
    };
};

// const mapDispatchToProps = () => ();

export default connect(
    null,
    { login: userLogin }
)(LoginPage);
