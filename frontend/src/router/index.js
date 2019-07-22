import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../features/auth/loginPage';
import Companies from '../features/companies/Companies';
import CreateCompanyPage from '../features/companies/CreateCompanyPage';
import NotFound from '../features/layout/NotFound';
import ConfirmEmailMessage from "../features/layout/ConfirmEmailMessage/component";
import PrivateRoute from "./PrivateRoute/component";
import GuestRoute from "./GuestRoute/component";

const Router = () => {
    return (
        <Switch>
            <GuestRoute exact path="/login" component={LoginPage} />
            <Route exact path="/" />
            <Route exact path="/companies" component={Companies} />
            <PrivateRoute exact path="/companies/create" component={CreateCompanyPage}/>
            <Route exact path="/confirm" component={ConfirmEmailMessage}/>
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
        </Switch>
    );
};

export default Router;
