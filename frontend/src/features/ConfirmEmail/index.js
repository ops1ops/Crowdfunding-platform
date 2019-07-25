import { connect } from 'react-redux';
import { userSignup } from './actions';
import ConfirmEmail from './component';

export { signupPageReducer } from './reducer';

const mapDispatchToProps = () => ({
    confirm: verifyEmail,
});

export default connect(
    null,
    mapDispatchToProps()
)(ConfirmEmail);
