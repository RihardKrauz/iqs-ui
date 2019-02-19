import React from 'react';
import http from '../../../services/axios-http';
import './login-form.scss';
import { GetHashCode } from '../../../common/utils/security';
import IqInput from '../../../common/ui-kit/iq-input/iq-input';
import IqTitle from '../../../common/ui-kit/iq-icon-title/iq-icon-title';

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
                console.log('Successfully authenticated');
                http.setSecurityTokenData(response);
            })
            .catch(e => {
                console.log('Authorizarion error', e);
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
            <div className="auth-form">
                <div className="auth-form__item">
                    <IqTitle content="Login form" fa-icon-key="fas fa-dove" color="rgb(98, 77, 206)" />
                </div>
                <div className="auth-form__item">
                    <IqInput data-key="loginField" title="Username" />
                </div>
                <div className="auth-form__item">
                    <IqInput data-type="password" data-key="passField" title="Password" />
                </div>
                <div className="auth-form__actions-panel">
                    <input
                        className="auth-form__action"
                        type="submit"
                        id="loginActionBtn"
                        onClick={onLogin}
                        value="SIGN IN"
                    />
                    <input
                        className="auth-form__action"
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
