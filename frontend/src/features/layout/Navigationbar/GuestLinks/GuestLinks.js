import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <>
            <Link to="/login">Log in</Link>
            <span className="mx-2">or</span>
            <Link to="/signup">Sign up</Link>
        </>
    );
};

export default GuestLinks;