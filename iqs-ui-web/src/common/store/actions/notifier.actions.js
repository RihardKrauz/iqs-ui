export const SHOW_SUCCESS_MESSAGE = 'SHOW_SUCCESS_MESSAGE';
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

export const showSuccessMessage = payload => ({ type: SHOW_SUCCESS_MESSAGE, payload });
export const showErrorMessage = payload => ({ type: SHOW_ERROR_MESSAGE, payload });
