import React from 'react';
import http from '../../../services/http';

export default () => { 

    function onLogin(e) {
        e.preventDefault();

        const loginInputValue = document.getElementById('loginInput').value;
        const passInputValue = document.getElementById('passInput').value;

        const authData = JSON.stringify({ 
            username: loginInputValue,
            password: passInputValue
        });

        http.post('http://localhost:1056/token', authData)
            .then(response => {
                console.log('Successfully authenticated')
                http.setSecurityTokenData(response);
            }).catch(e => {
                console.log('Authorizarion error', e);
            });
    }

    function onLogout(e) {
        e.preventDefault();
        http.clearSecurityTokenData();
    }

    // function onGetData(e) {
    //     e.preventDefault();

    //     http.get('http://localhost:1056/api/values/5'  )
    //         .catch((ex) => {
    //             console.error('Exception on requesting values', ex);
    //         }).then((value) => {
    //             console.log('We ve successfully got the value: ', value);
    //         });
    // }

    return (<div className="auth-form">
        <div className="auth-form__header">
            <div className="title">
                <div className="title__icon-container">
                    <span>ico</span>
                </div>
                <div className="title__content">
                    <span>Authorization form</span>
                </div>
            </div>
        </div>
        <div className="auth-form__field">
            <label htmlFor="loginInput">login</label>
            <input id="loginInput"></input>
        </div>
        <div className="auth-form__field">
            <label htmlFor="passInput">password</label>
            <input id="passInput"></input>
        </div>
        <div className="auth-form__actions-panel">
            <input className="auth-form__action" type="submit" id="loginActionBtn" onClick={onLogin} value="login" ></input>
            <input className="auth-form__action" type="button" id="logoffActionBtn" onClick={onLogout} value="logoff" ></input>
        </div>
    </div>)
};