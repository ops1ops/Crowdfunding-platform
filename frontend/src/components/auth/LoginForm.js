import React from 'react';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: '',
            },
            errors: {},
        };
    }

    handleFormInput = e => {
        const { data } = this.state;
        this.setState(
            {
                data: {
                    ...data,
                    [e.currentTarget.name]: e.currentTarget.value,
                },
            },
            () => this.validateForm()
        );
    };

    validateForm = () => {
        const { data } = this.state;
        const isValidEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
            data.email
        );
        const errors = {};

        if (!data.email) {
            errors.email = 'Fill email field';
        } else if (!isValidEmail) {
            errors.email = 'Please enter valid email';
        }
        if (!data.password) {
            errors.password = 'Fill password field';
        } else if (data.password.length < 5) {
            errors.password = `Password is too short`;
        }

        this.setState({ errors });
    };

    onSubmit = e => {
        e.preventDefault();
        const { errors, data } = this.state;
        const { props } = this;
        if (_.isEmpty(errors)) {
            props.submit(data);
        }
    };

    render() {
        const { data, errors } = this.state;

        return (
            <div className="container d-flex flex-column align-items-center">
                <h2 className="m-4">Login page</h2>
                <Form className="w-50" onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            name="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={this.handleFormInput}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleFormInput}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;