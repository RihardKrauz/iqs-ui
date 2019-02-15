import React from 'react';
import IqTitle from '../../../common/components/infrastructure/iq-icon-title/iq-icon-title';
import IqInput from '../../../common/components/infrastructure/iq-input/iq-input';
import './registration-card.scss';
import http from '../../../services/axios-http';

export default (props) => {
    function onCreate(e) {
        e.preventDefault();

        const userData = JSON.stringify({ 
            user: {
                login: document.getElementById('loginField').value,
                name: document.getElementById('nameField').value,
                age: document.getElementById('ageField').value
            },
            password: document.getElementById('pass1Field').value
        });

        http.post(`${http.getApiUri()}/user`, userData)
            .then(response => {
                console.log('Successfully created', response)
            }).catch(e => {
                console.log('Authorizarion error', e);
            }).then(() => {
                props.history.push('/login');
            });
    }

    return (<div className="register-layout">
        <div className="user-form">
            <div className="user-form__item">
                <IqTitle content="Create user" fa-icon-key="far fa-smile" color="rgb(98, 77, 206)"></IqTitle>
            </div>
            <div className="user-form__item">
                <IqInput data-key="loginField" title="Login"></IqInput>
            </div>
            <div className="user-form__item">
                <IqInput data-key="nameField" title="Name"></IqInput>
            </div>
            <div className="user-form__item">
                <IqInput data-type="number" data-key="ageField" title="Age"></IqInput>
            </div>
            <div className="user-form__item">
                <IqInput data-type="password" data-key="pass1Field" title="Enter password"></IqInput>
            </div>
            <div className="user-form__item">
                <IqInput data-type="password" data-key="pass2Field" title="Repeat password"></IqInput>
            </div>
            <div className="user-form__actions-panel">
                <input className="user-form__action" type="submit" id="signUpActionBtn" onClick={onCreate} value="Create account" ></input>
            </div>
        </div>
    </div>)
};