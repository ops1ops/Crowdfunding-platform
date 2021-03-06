import React from 'react';
import { Avatar } from 'antd';
import { Dropdown } from 'react-bootstrap';
import './style.css';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }

    render() {
        return (
            <Avatar
                onClick={this.handleClick}
                icon="user"
                size="large"
                className="Avatar"
            />
        );
    }
}

export const UserLinks = props => {
    return (
        <Dropdown alignRight>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu className="mt-2">
                <Dropdown.Item as={Link} to="/campaigns/create">
                    New campaign
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" as={Link} to="/profile">
                    Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" onClick={props.onLogout}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

CustomToggle.propTypes = {
    onClick: PropTypes.func.isRequired,
};

UserLinks.propTypes = {
    onLogout: PropTypes.func.isRequired,
};
