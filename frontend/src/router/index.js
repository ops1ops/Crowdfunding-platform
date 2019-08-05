import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../features/LoginPage';
import CreateCampaignPage from '../features/CampaignEditorPage';
import NotFound from '../features/NotFoundPage/NotFound';
import PrivateRoute from './PrivateRoute/component';
import GuestRoute from './GuestRoute/component';
import SignupPage from '../features/SignupPage/component';
import Home from '../features/HomePage/component';
import ErrorPage from '../features/ErrorPage/component';
import CampaignPage from "../features/CampaignPage";
import ProfilePage from "../features/ProfilePage";

const Router = () => {
    return (
        <Switch>
            <GuestRoute exact path="/login" component={LoginPage} />
            <GuestRoute exact path="/signup" component={SignupPage} />
            <PrivateRoute exact path="/campaigns/create" component={CreateCampaignPage} />
            <PrivateRoute exact path="/campaign/edit/:id" component={CreateCampaignPage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <Route exact path="/campaign/:id" component={CampaignPage} />
            {/*<Route exact path="/" component={Home} />*/}
            <Route exact path="/error/:message" component={ErrorPage} />
            <Route path="/404" component={NotFound} />
            <Redirect from="/" to="/profile" />
            <Redirect from="*" to="/404" />
        </Switch>
    );
};

export default Router;
