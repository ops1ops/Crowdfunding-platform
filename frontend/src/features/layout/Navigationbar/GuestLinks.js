import React from 'react';
import {Nav, NavItem} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

const GuestLinks = () => {
    return (
        <Link to='/login'>Sign In</Link>
    )
}

export default GuestLinks;