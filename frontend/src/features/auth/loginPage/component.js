import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import LoginForm from './loginForm/component';
import 'antd/dist/antd.css';


class LoginPage extends Component {
    submit = data =>
        this.props.login(data).then(() => this.props.history.push('/'));

    render() {
        return (
            <div className="container d-flex flex-column align-items-center">
                <h2 className="m-4">Login page</h2>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginPage;
