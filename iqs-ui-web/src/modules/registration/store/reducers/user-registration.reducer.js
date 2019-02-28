import { CHANGE_LOGIN, CHANGE_NAME } from '../actions/user-registration.actions';

const initialState = {
    login: '',
    name: ''
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOGIN:
            return { ...state, login: action.payload };
        case CHANGE_NAME:
            return { ...state, name: action.payload };
        default:
            return state;
    }
}

export default userReducer;
