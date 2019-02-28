import AuthReducer from '../../modules/auth/store/reducers/auth.reducer';
import UserRegistrationReducer from '../../modules/registration/store/reducers/user-registration.reducer';
import { combineReducers } from 'redux';

export default combineReducers({ auth: AuthReducer, userRegistration: UserRegistrationReducer });
