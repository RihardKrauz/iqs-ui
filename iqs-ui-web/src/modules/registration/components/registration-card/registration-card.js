import React from 'react';
import IqTitle from '../../../../common/ui-kit/iq-icon-title/iq-icon-title';
import IqInput from '../../../../common/ui-kit/iq-input/iq-input';
import './registration-card.scss';
import http from '../../../../services/axios-http';
import { GetHashCode } from '../../../../common/utils/security';
import { ValidatedField } from '../../../../common/ui-kit/forms/validated-field';
import { Toaster } from '../../../../common/ui-kit/notification/notifier';

export default props => {
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
        Object.keys(f).map(fieldName => ({
            name: f[fieldName].name,
            errors: f[fieldName].validation.validate()
        }));

    const getErrorsCount = e => e.map(err => err.errors).reduce((acc, val) => acc.concat(val), []).length;
    const getErrorMsg = e =>
        e.map(err => (err.errors.length > 0 ? `Errors in field '${err.name}': ${err.errors.join(', ')}` : ''));

    function onCreateBtnClick(e) {
        e.preventDefault();
        const errors = validateFormAndGetAllErrors(fields);
        if (getErrorsCount(errors) === 0) {
            saveUser();
        } else {
            Toaster.notifyError(getErrorMsg(errors).join('\r\n'));
        }
    }

    function onBackBtnClick(e) {
        e.preventDefault();
        props.history.push('/login');
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

        http.post(`${http.getApiUri()}/user`, userData)
            .then(() => {
                Toaster.notifySuccess('Successfully created');
            })
            .then(() => {
                props.history.push('/login');
            })
            .catch(e => {
                Toaster.notifyError(e);
            });
    }

    return (
        <div>
            <div className="register-layout">
                <div className="user-form">
                    <div className="user-form__item">
                        <IqTitle content="Create user" fa-icon-key="far fa-edit" color="rgb(98, 77, 206)" />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-key="loginField"
                            title="Login"
                            on-change={fields['Login'].onChange}
                            validation={fields['Login'].validation.params}
                            bind-validate-action={fields['Login'].validation.bindAction}
                        />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-key="nameField"
                            title="Name"
                            on-change={fields['Name'].onChange}
                            validation={fields['Name'].validation.params}
                            bind-validate-action={fields['Name'].validation.bindAction}
                        />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-type="number"
                            data-key="ageField"
                            on-change={fields['Age'].onChange}
                            validation={fields['Age'].validation.params}
                            bind-validate-action={fields['Age'].validation.bindAction}
                            title="Age"
                        />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-type="password"
                            data-key="pass1Field"
                            title="Enter password"
                            on-change={val => {
                                fields['Password1'].onChange(val);
                                fields['Password2'].validation.validate(val, fields['Password1'].validation.params);
                            }}
                            bind-validate-action={fields['Password1'].validation.bindAction}
                            validation={fields['Password1'].validation.params}
                        />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-type="password"
                            data-key="pass2Field"
                            title="Repeat password"
                            on-change={val => {
                                fields['Password2'].onChange(val);
                                fields['Password1'].validation.validate(val, fields['Password2'].validation.params);
                            }}
                            bind-validate-action={fields['Password2'].validation.bindAction}
                            validation={fields['Password2'].validation.params}
                        />
                    </div>
                    <div className="user-form__actions-panel">
                        <input
                            className="user-form__action"
                            type="submit"
                            id="signUpActionBtn"
                            onClick={onCreateBtnClick}
                            value="Create account"
                        />
                        <input
                            className="user-form__action"
                            type="button"
                            id="backBtn"
                            onClick={onBackBtnClick}
                            value="Back"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};