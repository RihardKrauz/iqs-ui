import UsersRegistrationEffects from '../../../modules/registration/store/effects/user-registration.effects';
import NotifierEffects from '../effects/notifier.effects';

export default [...UsersRegistrationEffects, ...NotifierEffects];
