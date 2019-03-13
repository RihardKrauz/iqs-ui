import {
    CHANGE_LOGIN,
    CHANGE_NAME,
    ADD_GENERIC_ERROR,
    CLEAR_ERRORS,
    REMOVE_GENERIC_ERROR,
    ADD_CUSTOM_ERROR,
    REMOVE_CUSTOM_ERROR,
    START_LOADING,
    END_LOADING
} from '../actions/user-registration.actions';

const initialState = {
    login: '',
    name: '',
    age: 0,
    password1: '',
    password2: '',
    isLoading: false,
    errors: {}
};

const applyFieldErrorByType = (state, fieldName, errorType, message) => {
    let result = state;
    if (!result[fieldName]) {
        result[fieldName] = {};
    }
    if (!result[fieldName][errorType]) {
        result[fieldName][errorType] = [];
    }

    result[fieldName][errorType] = [...result[fieldName][errorType], message];
    return result;
};

const removeFieldErrorByType = (state, fieldName, errorType, message) => {
    let result = state;
    if (!result[fieldName]) {
        result[fieldName] = {};
    }
    if (!result[fieldName][errorType]) {
        result[fieldName][errorType] = [];
    }

    result[fieldName][errorType] = [...result[fieldName][errorType].filter(msg => msg !== message)];
    return result;
};

const errorsReducer = (state = initialState.errors, action) => {
    switch (action.type) {
        case ADD_GENERIC_ERROR: {
            const { fieldName, message } = action.payload;
            return applyFieldErrorByType(state, fieldName, 'generic', message);
        }
        case REMOVE_GENERIC_ERROR: {
            const { fieldName, message } = action.payload;
            return removeFieldErrorByType(state, fieldName, 'generic', message);
        }
        case ADD_CUSTOM_ERROR: {
            const { field, message } = action.payload;
            return applyFieldErrorByType(state, field.name, 'custom', message);
        }
        case REMOVE_CUSTOM_ERROR: {
            const { field, message } = action.payload;
            return removeFieldErrorByType(state, field.name, 'custom', message);
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
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        default:
            return { ...state, errors: errorsReducer(state.errors, action) };
    }
};

export default userRegistrationReducer;
