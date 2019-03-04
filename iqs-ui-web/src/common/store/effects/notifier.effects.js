import { SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE } from '../actions/notifier.actions';
import { Toaster } from '../../ui-kit/notification/notifier';

const onShowSuccessMessage = store => next => action => {
    if (action.type === SHOW_SUCCESS_MESSAGE) {
        Toaster.notifySuccess(action.payload);
    }

    let result = next(action);
    return result;
};

const onShowErrorMessage = store => next => action => {
    if (action.type === SHOW_ERROR_MESSAGE) {
        Toaster.notifyError(action.payload);
    }

    let result = next(action);
    return result;
};

export default [onShowSuccessMessage, onShowErrorMessage];
