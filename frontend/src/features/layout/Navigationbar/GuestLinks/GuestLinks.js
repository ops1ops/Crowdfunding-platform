import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <React.Fragment>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="ml-2">Register</Link>
        </React.Fragment>
    );
};

export default GuestLinks;