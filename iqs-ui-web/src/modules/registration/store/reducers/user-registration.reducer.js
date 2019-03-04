import { CHANGE_LOGIN, CHANGE_NAME, ADD_ERROR, CLEAR_ERRORS } from '../actions/user-registration.actions';

const initialState = {
    login: '',
    name: '',
    errors: {}
};

const errorsReducer = (state = initialState.errors, action) => {
    switch (action.type) {
        case ADD_ERROR: {
            const { fieldName, message } = action.payload;
            const newState = { ...state };
            newState[fieldName] = newState[fieldName] ? newState[fieldName].concat([message]) : [message];
            return newState;
        }
        case CLEAR_ERRORS: {
            const { fieldName } = action.payload;
            if (fieldName) {
                delete state[fieldName];
                return state;
            } else {
                return initialState.errors;
            }
        }
        default:
            return state;
    }
};

const userRegistrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN:
            return { ...state, login: action.payload };
        case CHANGE_NAME:
            return { ...state, name: action.payload };
        default:
            return { ...state, errors: errorsReducer(state.errors, action) };
    }
};

export default userRegistrationReducer;
