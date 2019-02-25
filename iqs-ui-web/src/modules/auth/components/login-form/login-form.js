import React, { useState } from 'react';
import http from '../../../../services/axios-http';
import './login-form.scss';
import '../../../../common/styles/iq-form.scss';
import { GetHashCode } from '../../../../common/utils/security';
import IqInput from '../../../../common/ui-kit/iq-input/iq-input';
import IqTitle from '../../../../common/ui-kit/iq-icon-title/iq-icon-title';
import IqLoader from '../../../../common/ui-kit/iq-loader/iq-loader';
import { Toaster } from '../../../../common/ui-kit/notification/notifier';

export default props => {
    const [isLoading, setLoading] = useState(false);

    function onLogin(e) {
        e.preventDefault();

        const loginInputValue = document.getElementById('loginField').value;
        const passInputValue = document.getElementById('passField').value;

        const authData = JSON.stringify({
            username: loginInputValue,
            password: GetHashCode(passInputValue)
        });

        setLoading(true);
        http.post(`${http.getApiUri()}/token`, authData)
            .then(response => {
                Toaster.notifySuccess('Successfully authenticated');
                http.setSecurityTokenData(response);
            })
            .then(() => {
                setLoading(false);
                props.history.push('/profile');
            })
            .catch(e => {
                setLoading(false);
                Toaster.notifyError(e);
            });
            
    }

    function onSignUp(e) {
        e.preventDefault();
        props.history.push('/register');
    }

    return (
        <div className="auth-container">
            {isLoading === true ? <IqLoader /> : ''}
            <div className={`iq-form ${isLoading === true ? 'busy' : ''}`}>
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
