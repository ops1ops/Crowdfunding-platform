import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './features/layout/Navigationbar/component';
import Router from './router';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Router />
        </BrowserRouter>
    );
};

export default App;
