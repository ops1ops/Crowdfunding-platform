import React from 'react';
import {Layout, Menu, Breadcrumb} from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import Home from './components/pages/Home';

const {Header, Content, Footer} = Layout;


function App() {
    return (
        <Layout className="layout">
            <Header>
                header
            </Header>
            <Content>
                <Router>
                    <Route path="/homepage" component={Home}/>
                </Router>
            </Content>
            <Footer>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default App;
