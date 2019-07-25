import React from 'react';
import {Alert, Spinner} from "react-bootstrap";

class ConfirmEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            errors: {}
        };
    }

    render() {
        const { isLoading, errors } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center flex-column p-5 text-center">
                {isLoading ? <Alert variant="info">
                    <Alert.Heading>Verifying your email address</Alert.Heading>
                    <p>
                        Thanks for confirming your email address. <br/> We are verifying your email. It may take a while
                </p>
                    <Spinner animation="border" />
                </Alert> : <Alert>qwe</Alert>}
            </div>
        );
    }
};

export default ConfirmEmail;
