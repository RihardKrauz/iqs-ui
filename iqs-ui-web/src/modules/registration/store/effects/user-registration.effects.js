import { CHANGE_LOGIN } from '../actions/user-registration.actions';
import http from '../../../../common/services/axios-http';

const checkLoginUniqueness = store => next => action => {
    if (action.type === CHANGE_LOGIN) {
        http.get(`${http.getApiUri()}/login/${action.payload}`).then(console.log);
    }

    let result = next(action);
    return result;
};

export default [checkLoginUniqueness];
