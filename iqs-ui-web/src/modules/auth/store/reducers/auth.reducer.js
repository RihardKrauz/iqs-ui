import { CHANGE_CURRENT_USER } from '../actions/auth.actions';

const initialState = {
    currentUser: ''
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
}

export default authReducer;
