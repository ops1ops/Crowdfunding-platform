import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import 'antd/dist/antd.css';
import LoginFormContainer from "./LoginFormContainer/component";

class LoginPage extends Component {
    submit = data =>
        this.props.login(data).then(() => this.props.history.push('/'));

    render() {
        return (
            <div className="container d-flex flex-column align-items-center">
                <h2 className="m-4">Log in</h2>
                <LoginFormContainer submit={this.submit} />
            </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginPage;
