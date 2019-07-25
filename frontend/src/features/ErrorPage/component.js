import React  from 'react';
import {Alert} from "react-bootstrap";

const ErrorPage = (props) => {
    return (
        <Alert variant="danger" className="text-center">
            {props.match.params.message}
        </Alert>
    );
};

export default ErrorPage;
