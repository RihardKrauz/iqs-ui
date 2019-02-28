import React, { useState } from 'react';
import IqTitle from '../../../../common/ui-kit/iq-icon-title/iq-icon-title';
import IqInput from '../../../../common/ui-kit/iq-input/iq-input';
import IqLoader from '../../../../common/ui-kit/iq-loader/iq-loader';
import './registration-card.scss';
import '../../../../common/styles/iq-form.scss';
import http from '../../../../services/axios-http';
import { GetHashCode } from '../../../../common/utils/security';
import { ValidatedField } from '../../../../common/ui-kit/forms/validated-field';
import { Toaster } from '../../../../common/ui-kit/notification/notifier';

export default function RegistrationCard({ history }) {
    const [isLoading, setLoading] = useState(false);

    const fields = {
        Login: new ValidatedField('Login', '', [{ type: 'required' }]),
        Name: new ValidatedField('Name', '', [{ type: 'required' }, { type: 'length', value: 5 }]),
        Age: new ValidatedField('Age', 0, [{ type: 'required' }, { type: 'range', valueFrom: 0, valueTo: 99 }]),
        Password1: new ValidatedField('Password1', '', [{ type: 'required' }]),
        Password2: new ValidatedField('Password2', '', [{ type: 'required' }])
    };

    fields['Password1'].addValidationParam('equal', fields['Password2'].value);
    fields['Password2'].addValidationParam('equal', fields['Password1'].value);

    const validateFormAndGetAllErrors = f =>
        Object.keys(f).map(fieldName => {
            const { errors, customErrors } = f[fieldName].validation.validate();
            return {
                name: f[fieldName].name,
                errors: [...errors, ...customErrors]
            };
        });

    const getErrorsCount = e => e.map(err => err.errors).reduce((acc, val) => acc.concat(val), []).length;
    const getErrorMsg = e =>
        e.map(err => (err.errors.length > 0 ? `Errors in field '${err.name}': ${err.errors.join(', ')}` : ''));

    function onCreateBtnClick(e) {
        e.preventDefault();
        const errors = validateFormAndGetAllErrors(fields);
        if (getErrorsCount(errors) === 0) {
            saveUser();
        } else {
            getErrorMsg(errors)
                .filter(e => e !== '')
                .forEach(Toaster.notifyError);
        }
    }

    function validateLoginUniqueness(login) {
        const loginHasTakenErrorMessage = `Login has been already taken`;

        fields['Login'].validation.removeCustomError(loginHasTakenErrorMessage);
        http.get(`${http.getApiUri()}/login/${login}`)
            .then(result => {
                if (result === true) {
                    fields['Login'].validation.addCustomError(loginHasTakenErrorMessage);
                }
            })
            .catch(Toaster.notifyError);
    }

    function onChangeLoginField(e) {
        fields['Login'].onChange(e);
        validateLoginUniqueness(e);
    }

    function onBackBtnClick(e) {
        e.preventDefault();
        history.push('/login');
    }

    function saveUser() {
        const userData = JSON.stringify({
            user: {
                login: fields['Login'].value,
                name: fields['Name'].value,
                age: fields['Age'].value
            },
            password: GetHashCode(fields['Password1'].value)
        });

        setLoading(true);

        http.post(`${http.getApiUri()}/user`, userData)
            .then(() => {
                Toaster.notifySuccess('Successfully created');
            })
            .then(() => {
                setLoading(false);
                history.push('/login');
            })
            .catch(e => {
                setLoading(false);
                Toaster.notifyError(e);
            });
    }

    return (
        <div className="register-layout">
            {isLoading === true ? <IqLoader /> : ''}
            <div className={`iq-form ${isLoading === true ? 'busy' : ''}`}>
                <div className="iq-form__item">
                    <IqTitle content="Create user" fa-icon-key="far fa-edit" color="rgb(98, 77, 206)" />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-key="loginField"
                        title="Login"
                        debounce-time="500"
                        on-change={onChangeLoginField}
                        validation={fields['Login'].validation.params}
                        bind-events={fields['Login'].bindEvents}
                    />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-key="nameField"
                        title="Name"
                        on-change={fields['Name'].onChange}
                        validation={fields['Name'].validation.params}
                        bind-events={fields['Name'].bindEvents}
                    />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-type="number"
                        data-key="ageField"
                        on-change={fields['Age'].onChange}
                        validation={fields['Age'].validation.params}
                        bind-events={fields['Age'].bindEvents}
                        title="Age"
                    />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-type="password"
                        data-key="pass1Field"
                        title="Enter password"
                        on-change={val => {
                            fields['Password1'].onChange(val);
                            fields['Password2'].validation.validate(val, fields['Password1'].validation.params);
                        }}
                        bind-events={fields['Password1'].bindEvents}
                        validation={fields['Password1'].validation.params}
                    />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-type="password"
                        data-key="pass2Field"
                        title="Repeat password"
                        on-change={val => {
                            fields['Password2'].onChange(val);
                            fields['Password1'].validation.validate(val, fields['Password2'].validation.params);
                        }}
                        bind-events={fields['Password2'].bindEvents}
                        validation={fields['Password2'].validation.params}
                    />
                </div>
                <div className="iq-form__actions-panel">
                    <input
                        className="iq-form__action"
                        type="submit"
                        id="signUpActionBtn"
                        onClick={onCreateBtnClick}
                        value="Create account"
                    />
                    <input
                        className="iq-form__action"
                        type="button"
                        id="backBtn"
                        onClick={onBackBtnClick}
                        value="Back"
                    />
                </div>
            </div>
        </div>
    );
}
