export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_NAME = 'CHANGE_NAME';
export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const ADD_CUSTOM_ERROR = 'ADD_CUSTOM_ERROR';
export const REMOVE_CUSTOM_ERROR = 'REMOVE_CUSTOM_ERROR';

export const changeLogin = payload => ({ type: CHANGE_LOGIN, payload });
export const changeName = payload => ({ type: CHANGE_NAME, payload });
export const addError = payload => ({ type: ADD_ERROR, payload });
export const removeError = payload => ({ type: REMOVE_ERROR, payload });
export const clearErrors = payload => ({ type: CLEAR_ERRORS, payload });
export const addCustomError = payload => ({ type: ADD_CUSTOM_ERROR, payload });
export const removeCustomError = payload => ({ type: REMOVE_CUSTOM_ERROR, payload });
