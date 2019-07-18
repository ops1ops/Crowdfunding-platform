import React from 'react';
import {Navbar, Form, FormControl, Button, NavItem, Nav} from 'react-bootstrap';
import Search from './Search';
import { makeStyles } from '@material-ui/core/styles';
import GuestLinks from "./GuestLinks";
import Avatar from '@material-ui/core/Avatar';
import Badge from "@material-ui/core/Badge";
import {Link} from "react-router-dom";
import UserLinks from "./UserLinks";



const useStyles = makeStyles({
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 30,
        height: 30,
    },
});


const Navigationbar = () => {
    const classes = useStyles();

    return (
        <Navbar bg="light" expand="lg" className="px-3">
            <Navbar.Brand>Crowdfunding</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    </NavItem>
                    <NavItem eventkey={2} href="/companies">
                        <Nav.Link as={Link} to="/companies" >Companies</Nav.Link>
                    </NavItem>
                </Nav>
                <Search/>
                <GuestLinks/>
                <UserLinks/>
            </Navbar.Collapse>

        </Navbar>
    );
}

export default Navigationbar;