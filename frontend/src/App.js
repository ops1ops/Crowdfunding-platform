import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './features/layout/Navigationbar/Navigationbar';
import Router from './router';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Router />
        </BrowserRouter>
    );
};

export default App;
