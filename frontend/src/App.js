import React from 'react';
import {BrowserRouter} from "react-router-dom";
// import 'antd/dist/antd.css';

import './App.css';
import {Redirect, Route, Switch} from "react-router";
import Navbar from "./components/layout/Navigationbar/Navigationbar";
import NotFound from "./components/layout/NotFound";
import LoginPage from "./components/auth/LoginPage";
import Companies from "./components/companies/Companies";
import CreateCompanyPage from "./components/companies/CreateCompanyPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/' />
                <Route exact path='/companies' component={Companies} />
                <Route exact path='/companies/create' component={CreateCompanyPage} />
                <Route path='/404' component={NotFound} />
                <Redirect from='*' to='/404' />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
