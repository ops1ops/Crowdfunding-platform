import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import GuestLinks from './GuestLinks/GuestLinks';
import { Link } from 'react-router-dom';
import { UserLinks } from './UserLinks/UserLinks';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userLogout } from '../../LoginPage/actions';


const NavigationBar = props => {
    const { isAuthorized, logout } = props;

    return (
        <Navbar expand="sm" className="px-3" className="border-bottom">
            <Navbar.Brand>Crowdfunding</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                    </NavItem>
                    <NavItem eventkey={2} href="/companies">
                        <Nav.Link as={Link} to="/companies">
                            Campaigns
                        </Nav.Link>
                    </NavItem>
                </Nav>
                {/*<Search />*/}
                {isAuthorized ? (
                    <UserLinks onLogout={logout} />
                ) : (
                    <GuestLinks />
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapStateToProps = store => ({
    isAuthorized: store.user.isAuthorized,
});

const mapDispatchToProps = () => ({
    logout: userLogout,
});

NavigationBar.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(NavigationBar);
