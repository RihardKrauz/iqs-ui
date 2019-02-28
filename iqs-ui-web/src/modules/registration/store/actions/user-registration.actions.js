export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_NAME = 'CHANGE_NAME';

export const changeLogin = payload => ({ type: CHANGE_LOGIN, payload });
export const changeName = payload => ({ type: CHANGE_NAME, payload });
