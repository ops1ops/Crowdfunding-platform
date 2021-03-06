import React from 'react';
import ReactDOM from 'react-dom';
import decode from "jwt-decode";
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './store/store';
import { userLoginSuccess } from './features/LoginPage/actions';
import setToken from "./utils/setToken";


if (localStorage.userJWT) {
    const token = localStorage.userJWT;
    const payload = decode(token);
    const user = {
        token,
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
    };
    setToken(token);
    store.dispatch(userLoginSuccess(user));
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
