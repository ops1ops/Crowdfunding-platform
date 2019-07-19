import React from 'react';
import {NavLink} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import UserMenu from "./UserMenu/UserMenu";

const UserLinks = () => {
    return (
        <React.Fragment>
            <UserMenu/>
        </React.Fragment>
    );
}

export default UserLinks;