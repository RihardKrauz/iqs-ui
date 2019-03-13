export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_NAME = 'CHANGE_NAME';
export const ADD_GENERIC_ERROR = 'ADD_GENERIC_ERROR';
export const REMOVE_GENERIC_ERROR = 'REMOVE_GENERIC_ERROR';
export const CLEAR_GENERIC_ERRORS = 'CLEAR_GENERIC_ERRORS';
export const ADD_CUSTOM_ERROR = 'ADD_CUSTOM_ERROR';
export const REMOVE_CUSTOM_ERROR = 'REMOVE_CUSTOM_ERROR';

export const changeLogin = payload => ({ type: CHANGE_LOGIN, payload });
export const changeName = payload => ({ type: CHANGE_NAME, payload });
export const addGenericError = payload => ({ type: ADD_GENERIC_ERROR, payload });
export const removeGenericError = payload => ({ type: REMOVE_GENERIC_ERROR, payload });
export const clearGenericErrors = payload => ({ type: CLEAR_GENERIC_ERRORS, payload });
export const addCustomError = payload => ({ type: ADD_CUSTOM_ERROR, payload });
export const removeCustomError = payload => ({ type: REMOVE_CUSTOM_ERROR, payload });
