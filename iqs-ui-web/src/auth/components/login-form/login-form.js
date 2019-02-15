import React from 'react';
import http from '../../../services/axios-http';
import './login-form.scss';
import IqInput from '../../../common/components/infrastructure/iq-input/iq-input';
import IqTitle from '../../../common/components/infrastructure/iq-icon-title/iq-icon-title';

export default (props) => { 

    function onLogin(e) {
        e.preventDefault();

        const loginInputValue = document.getElementById('loginField').value;
        const passInputValue = document.getElementById('passField').value;

        const authData = JSON.stringify({ 
            username: loginInputValue,
            password: passInputValue
        });

        http.post(`${http.getApiUri()}/token`, authData)
            .then(response => {
                console.log('Successfully authenticated')
                http.setSecurityTokenData(response);
            }).catch(e => {
                console.log('Authorizarion error', e);
            }).then(() => {
                props.history.push('/profile');
            });
    }

    function onSupportRequire(e) {
        e.preventDefault();
    }

    return (<div className="auth-container">
        <div className="auth-form">
            <div className="auth-form__item">
                <IqTitle content="Login form" fa-icon-key="fas fa-dove" color="rgb(98, 77, 206)"></IqTitle>
            </div>
            <div className="auth-form__item">
                <IqInput data-key="loginField" title="Username"></IqInput>
            </div>
            <div className="auth-form__item">
                <IqInput hide-chars="true" data-key="passField" title="Password"></IqInput>
            </div>
            <div className="auth-form__actions-panel">
                <input className="auth-form__action" type="submit" id="loginActionBtn" onClick={onLogin} value="SIGN IN" ></input>
                <input className="auth-form__action" type="button" id="helpBtn" onClick={onSupportRequire} value="OPTIONS" ></input>
            </div>
        </div>
    </div>)
};