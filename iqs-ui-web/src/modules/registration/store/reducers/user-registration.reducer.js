import {
    CHANGE_LOGIN,
    CHANGE_NAME,
    ADD_ERROR,
    CLEAR_ERRORS,
    REMOVE_ERROR,
    ADD_CUSTOM_ERROR,
    REMOVE_CUSTOM_ERROR
} from '../actions/user-registration.actions';

const initialState = {
    login: '',
    name: '',
    age: 0,
    password1: '',
    password2: '',
    errors: {}
};

const createError = (field, errorType, message) => {
    let error;

    if (field) {
        error = field[errorType].concat([message]);
    } else {
        const result = {};
        result[errorType] = [message];
        error = result;
    }
    return error;
};

const removeError = (field, errorType, message) => {
    const values = field[errorType] || [];
    return values.filter(v => v !== message);
};

const errorsReducer = (state = initialState.errors, action) => {
    switch (action.type) {
        case ADD_ERROR: {
            const { fieldName, message } = action.payload;
            state[fieldName] = createError(state[fieldName], 'general', message);
            return state;
        }
        case REMOVE_ERROR: {
            const { fieldName, message } = action.payload;
            if (!state[fieldName]) return state;
            state[fieldName] = removeError(state[fieldName], 'general', message);
            return state;
        }
        case ADD_CUSTOM_ERROR: {
            const { field, message } = action.payload;
            state[field.name] = createError(state[field.name], 'custom', message);
            return state;
        }
        case REMOVE_CUSTOM_ERROR: {
            const { field, message } = action.payload;
            if (!state[field.name]) return state;
            state[field.name] = removeError(state[field.name], 'custom', message);
            return state;
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
            return { ...state, login: action.payload.value };
        case CHANGE_NAME:
            return { ...state, name: action.payload };
        default:
            return { ...state, errors: errorsReducer(state.errors, action) };
    }
};

export default userRegistrationReducer;
