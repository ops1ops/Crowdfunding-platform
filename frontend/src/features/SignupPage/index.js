import { connect } from 'react-redux';
import { userSignup } from './actions';
import SignupPage from './component';

export { signupPageReducer } from './reducer';

const mapDispatchToProps = () => ({
    signup: userSignup,
});

export default connect(
    null,
    mapDispatchToProps()
)(SignupPage);
