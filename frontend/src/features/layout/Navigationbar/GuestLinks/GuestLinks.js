import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <React.Fragment>
            <Link to="/login">Log in</Link>
            <Link to="/signup" className="ml-2">Sign up</Link>
        </React.Fragment>
    );
};

export default GuestLinks;