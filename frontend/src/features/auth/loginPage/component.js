import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import LoginForm from './loginForm/component';

class LoginPage extends Component {
    submit = data => {
        this.props.login(data);
    };

    render() {
        return (
            <div>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginPage;
