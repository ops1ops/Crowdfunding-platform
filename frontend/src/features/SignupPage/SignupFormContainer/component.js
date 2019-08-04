import React from 'react';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { SignupForm } from './SignupForm/component';
import { validationSchema } from './validationSchema';
import api from '../../../services/api';

class SignupFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverErrors: {},
            serverSuccessMessage: '',
        };
        this.onCloseSuccessAlert = this.onCloseAlert.bind(this, { serverSuccessMessage: '' });
        this.onCloseErrorAlert = this.onCloseAlert.bind(this, { serverErrors: {} });
    }

    onCloseAlert = alertState => {
        this.setState(alertState);
    };

    onSubmit = (values, actions) => {
        api.user
            .signup(values)
            .then(res => {
                this.setState({
                    serverSuccessMessage: res.data.message,
                    serverErrors: {},
                });
                actions.setSubmitting(false);
                actions.resetForm();
            })
            .catch(err => {
                this.setState({
                    serverErrors: {
                        message: err.message,
                        validation: err.response.data.errors,
                    },
                    serverSuccessMessage: '',
                });
                actions.setSubmitting(false);
            });
    };

    render() {
        const { serverErrors, serverSuccessMessage } = this.state;

        return (
            <div className="w-50">
                {serverErrors.message && (
                    <Alert
                        className="mb-3"
                        message="Submitting error"
                        onClose={this.onCloseErrorAlert}
                        type="error"
                        description={serverErrors.validation || 'Please try again later'}
                        closable
                    />
                )}
                {serverSuccessMessage && (
                    <Alert
                        className="mb-3"
                        message="Submitting error"
                        onClose={this.onCloseSuccessAlert}
                        type="success"
                        description={serverSuccessMessage}
                        closable
                    />
                )}
                <Formik
                    validationSchema={validationSchema}
                    validateOnChange
                    onSubmit={this.onSubmit}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        repeatPassword: '',
                    }}
                    render={SignupForm}
                />
            </div>
        );
    }
}

export default SignupFormContainer;
