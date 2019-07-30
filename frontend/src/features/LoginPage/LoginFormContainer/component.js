import React from 'react';
import { PropTypes } from 'prop-types';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { LoginForm } from './LoginForm/component';
import { validationSchema } from './validationSchema';

class LoginFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverErrors: {},
        };
    }

    onAlertClose = () => {
        this.setState({ serverErrors: {} });
    };

    onSubmit = (values, actions) => {
        this.props.submit(values).catch(err => {
            this.setState({
                serverErrors: {
                    message: err.message,
                    validation: err.response.data.errors,
                },
            });
            actions.setSubmitting(false);
        });
    };

    render() {
        const { serverErrors } = this.state;

        return (
            <div className="w-50">
                {serverErrors.message && (
                    <Alert
                        className="mb-3"
                        message="Submitting error"
                        onClose={this.onAlertClose}
                        type="error"
                        description={serverErrors.validation || 'Please try again later'}
                        closable
                    />
                )}
                <Formik
                    validationSchema={validationSchema}
                    validateOnChange
                    onSubmit={this.onSubmit}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    render={LoginForm}
                />
            </div>
        );
    }
}

LoginFormContainer.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default LoginFormContainer;
