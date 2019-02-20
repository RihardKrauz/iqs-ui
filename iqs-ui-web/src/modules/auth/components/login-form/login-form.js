import React from 'react';
import http from '../../../../services/axios-http';
import './login-form.scss';
import '../../../../common/styles/iq-form.scss';
import { GetHashCode } from '../../../../common/utils/security';
import IqInput from '../../../../common/ui-kit/iq-input/iq-input';
import IqTitle from '../../../../common/ui-kit/iq-icon-title/iq-icon-title';
import { Toaster } from '../../../../common/ui-kit/notification/notifier';

export default props => {
    function onLogin(e) {
        e.preventDefault();

        const loginInputValue = document.getElementById('loginField').value;
        const passInputValue = document.getElementById('passField').value;

        const authData = JSON.stringify({
            username: loginInputValue,
            password: GetHashCode(passInputValue)
        });

        http.post(`${http.getApiUri()}/token`, authData)
            .then(response => {
                Toaster.notifySuccess('Successfully authenticated');
                http.setSecurityTokenData(response);
            })
            .catch(e => {
                Toaster.notifyError(e);
            })
            .then(() => {
                props.history.push('/profile');
            });
    }

    function onSignUp(e) {
        e.preventDefault();
        props.history.push('/register');
    }

    return (
        <div className="auth-container">
            <div className="iq-form">
                <div className="iq-form__item">
                    <IqTitle content="Login form" fa-icon-key="fas fa-dove" color="rgb(98, 77, 206)" />
                </div>
                <div className="iq-form__item">
                    <IqInput data-key="loginField" title="Username" />
                </div>
                <div className="iq-form__item">
                    <IqInput data-type="password" data-key="passField" title="Password" />
                </div>
                <div className="iq-form__actions-panel">
                    <input
                        className="iq-form__action"
                        type="submit"
                        id="loginActionBtn"
                        onClick={onLogin}
                        value="SIGN IN"
                    />
                    <input
                        className="iq-form__action"
                        type="button"
                        id="signUpActionBtn"
                        onClick={onSignUp}
                        value="SIGN UP"
                    />
                </div>
            </div>
        </div>
    );
};
