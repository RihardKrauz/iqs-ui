import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { STORAGE_KEYS } from '../../services/storage';

localStorage.getItem(STORAGE_KEYS.TOKEN_KEY);

export default ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    return (
    <Route {...rest} render={(props) => (
        isAuthenticated ? 
           <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
     )} />
)};