import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { STORAGE_KEYS } from '../../services/storage';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const isAuthenticated = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
}

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object
};
