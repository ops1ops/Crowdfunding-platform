import { connect } from 'react-redux';
import LoginPage from './component';
import { userLogin } from './actions';

export { loginPageReducer } from './reducer';

const mapDispatchToProps = () => ({
    login: userLogin,
});

export default connect(
    null,
    mapDispatchToProps()
)(LoginPage);
