import React from 'react';
import {BrowserRouter} from "react-router-dom";
// import 'antd/dist/antd.css';

import './App.css';
import Navbar from "./components/layout/Navigationbar/Navigationbar";
import {Redirect, Route, Switch} from "react-router";
import NotFound from "./components/layout/NotFound";
import Login from "./components/auth/Login";
import Companies from "./components/company/Companies";
import CreateCompanyPage from "./components/company/CreateCompanyPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path='/home' />
                <Route exact path='/companies' component={Companies} />
                <Route exact path='/companies/create' component={CreateCompanyPage} />
                <Route path='/404' component={NotFound} />
                <Redirect from='*' to='/404' />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
