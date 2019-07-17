import React from 'react';
import {Nav, NavItem} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

const GuestLinks = (props) => {
    return (
        <Link to='/signin'>Sign In</Link>
    )
}

export default GuestLinks;