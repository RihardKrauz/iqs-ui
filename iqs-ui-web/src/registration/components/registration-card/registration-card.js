import React, { useState } from 'react';
import IqTitle from '../../../common/components/infrastructure/iq-icon-title/iq-icon-title';
import IqInput from '../../../common/components/infrastructure/iq-input/iq-input';
import './registration-card.scss';
import http from '../../../services/axios-http';
import { GetHashCode } from '../../../common/utils/security';

export default props => {
    const [loginErrors, setLoginErrors] = useState([]);
    const [nameErrors, setNameErrors] = useState([]);
    const [ageErrors, setAgeErrors] = useState([]);
    const [pass1Errors, setPass1Errors] = useState([]);
    const [pass2Errors, setPass2Errors] = useState([]);

    const [loginValue, setLoginValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [ageValue, setAgeValue] = useState(0);
    const [pass1Value, setPass1Value] = useState('');
    const [pass2Value, setPass2Value] = useState('');

    const [validateLogin, setValidateLoginAction] = useState({});
    const [validateName, setValidateNameAction] = useState({});
    const [validateAge, setValidateAgeAction] = useState({});
    const [validatePass1, setValidatePass1Action] = useState({});
    const [validatePass2, setValidatePass2Action] = useState({});

    const validationProps = {
        login: [{ type: 'required' }],
        name: [{ type: 'required' }, { type: 'length', value: 5 }],
        age: [{ type: 'required' }, { type: 'range', valueFrom: 0, valueTo: 99 }],
        pass1: [{ type: 'required' }, { type: 'equal', value: pass2Value }],
        pass2: [{ type: 'required' }, { type: 'equal', value: pass1Value }]
    };

    function validateFormAndGetAllErrors() {
        return [
            {
                field: 'login',
                errors: validateLogin.event(loginValue, validationProps.login)
            },
            {
                field: 'name',
                errors: validateName.event(nameValue, validationProps.name)
            },
            {
                field: 'age',
                errors: validateAge.event(ageValue, validationProps.age)
            },
            {
                field: 'password1',
                errors: validatePass1.event(pass1Value, validationProps.pass1)
            },
            {
                field: 'password2',
                errors: validatePass2.event(pass2Value, validationProps.pass2)
            }
        ];
    }

    const getErrorsCount = e => e.map(err => err.errors).reduce((acc, val) => acc.concat(val), []).length;
    const getErrorMsg = e => e.map(err => `Errors in field '${err.field}': ${err.errors.join(', ')}`);

    function onCreateBtnClick(e) {
        e.preventDefault();
        const errors = validateFormAndGetAllErrors();
        if (getErrorsCount(errors) === 0) {
            saveUser();
        } else {
            console.error(getErrorMsg(errors));
        }
    }

    function saveUser() {
        const userData = JSON.stringify({
            user: {
                login: loginValue,
                name: nameValue,
                age: ageValue
            },
            password: GetHashCode(pass1Value)
        });

        http.post(`${http.getApiUri()}/user`, userData)
            .then(response => {
                console.log('Successfully created', response);
            })
            .catch(e => {
                console.log('Authorizarion error', e);
            })
            .then(() => {
                props.history.push('/login');
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
                            on-change={setLoginValue}
                            on-validate={setLoginErrors}
                            validation={validationProps.login}
                            bind-validate-action={setValidateLoginAction}
                        />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-key="nameField"
                            title="Name"
                            on-change={setNameValue}
                            on-validate={setNameErrors}
                            validation={validationProps.name}
                            bind-validate-action={setValidateNameAction}
                        />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-type="number"
                            data-key="ageField"
                            on-change={setAgeValue}
                            on-validate={setAgeErrors}
                            validation={validationProps.age}
                            bind-validate-action={setValidateAgeAction}
                            title="Age"
                        />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-type="password"
                            data-key="pass1Field"
                            title="Enter password"
                            on-change={val => {
                                setPass1Value(val);
                                validatePass2.event(val, validationProps.pass1);
                            }}
                            on-validate={setPass1Errors}
                            bind-validate-action={setValidatePass1Action}
                            validation={validationProps.pass1}
                        />
                    </div>
                    <div className="user-form__item">
                        <IqInput
                            data-type="password"
                            data-key="pass2Field"
                            title="Repeat password"
                            on-change={val => {
                                setPass2Value(val);
                                validatePass1.event(val, validationProps.pass2);
                            }}
                            on-validate={setPass2Errors}
                            bind-validate-action={setValidatePass2Action}
                            validation={validationProps.pass2}
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
                    </div>
                </div>
            </div>
        </div>
    );
};
