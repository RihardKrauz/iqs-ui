import {
    CHANGE_LOGIN,
    ADD_CUSTOM_ERROR,
    REMOVE_CUSTOM_ERROR,
    addCustomError,
    removeCustomError
} from '../actions/user-registration.actions';
import { showErrorMessage } from '../../../../common/store/actions/notifier.actions';
import http from '../../../../common/services/axios-http';

const checkLoginUniqueness = store => next => action => {
    if (action.type === CHANGE_LOGIN) {
        const loginHasTakenErrorMessage = `Login has been already taken`;

        store.dispatch(removeCustomError({ field: action.payload.field, message: loginHasTakenErrorMessage }));
        if (action.payload.value) {
            http.get(`${http.getApiUri()}/users/${action.payload.value}/exists`)
                .then(result => {
                    if (result === true) {
                        store.dispatch(
                            addCustomError({ field: action.payload.field, message: loginHasTakenErrorMessage })
                        );
                    }
                })
                .catch(e => store.dispatch(showErrorMessage(e)));
        }
    }

    return next(action);
};

// todo: move custom errors to iq-input store
const applyFieldCustomError = store => next => action => {
    if (action.type === ADD_CUSTOM_ERROR) {
        action.payload.field.validation.addCustomError(action.payload.message);
    }

    return next(action);
};

const removeFieldCustomError = store => next => action => {
    if (action.type === REMOVE_CUSTOM_ERROR) {
        action.payload.field.validation.removeCustomError(action.payload.message);
    }

    return next(action);
};

export default [checkLoginUniqueness, applyFieldCustomError, removeFieldCustomError];
