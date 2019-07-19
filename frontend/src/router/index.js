import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import LoginPage from '../features/auth/loginPage';
import Companies from '../features/companies/Companies';
import CreateCompanyPage from '../features/companies/CreateCompanyPage';
import NotFound from '../features/layout/NotFound';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" />
            <Route exact path="/companies" component={Companies} />
            <Route exact path="/companies/create" component={CreateCompanyPage}
            />
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
        </Switch>
    );
};

export default Router;
