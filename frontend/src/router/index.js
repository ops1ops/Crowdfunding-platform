import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../features/LoginPage';
import Companies from '../features/companies/Companies';
import CreateCompanyPage from '../features/companies/CreateCompanyPage';
import NotFound from '../features/layout/NotFound';
import ConfirmEmailMessage from '../features/ConfirmEmail/component';
import PrivateRoute from './PrivateRoute/component';
import GuestRoute from './GuestRoute/component';
import SignupPage from '../features/SignupPage/component';
import Home from '../features/Home/component';
import ErrorPage from '../features/ErrorPage/component';

const Router = () => {
    return (
        <Switch>
            <GuestRoute exact path="/login" component={LoginPage} />
            <GuestRoute exact path="/signup" component={SignupPage} />
            <Route exact path="/" component={Home} />
            <Route exact path="/companies" component={Companies} />
            <PrivateRoute exact path="/companies/create" component={CreateCompanyPage} />
            <Route exact path="/confirm/:token" component={ConfirmEmailMessage} />
            <Route exact path="/error/:message" component={ErrorPage} />
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
        </Switch>
    );
};

export default Router;
