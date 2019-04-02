import React from 'react';
import IqTitle from '../../../../common/ui-kit/iq-icon-title/iq-icon-title';
import IqInput, { VALIDATION_TYPES } from '../../../../common/ui-kit/iq-input/iq-input';
import IqLoader from '../../../../common/ui-kit/iq-loader/iq-loader';
import IqSelect from '../../../../common/ui-kit/iq-select/iq-select';
import './registration-card.scss';
import '../../../../common/styles/iq-form.scss';
import http from '../../../../common/services/axios-http';
import { GetHashCode } from '../../../../common/services/security';
import { ValidatedField } from '../../../../common/ui-kit/forms/validated-field';
import { connect } from 'react-redux';
import {
    changeLogin,
    addGenericError,
    clearErrors,
    startLoading,
    endLoading
} from '../../store/actions/user-registration.actions';
import { showSuccessMessage, showErrorMessage } from '../../../../common/store/actions/notifier.actions';
import { getErrorMessages } from '../../store/selectors/user-registration.selector';

const DEBOUNCE_TIME_IN_MS = '500';

/* eslint react/prop-types: 0 */
const RegistrationCard = ({ isBusy, errorMessages, history, dispatch }) => {
    const [spec, setSpec] = React.useState('');
    const [specList, setSpecList] = React.useState([]);

    const [department, setDepartment] = React.useState('');
    const [departmentList, setDepartmentList] = React.useState([]);

    React.useEffect(() => {
        http.get(`${http.getApiUri()}/specializations`)
            .then(values => {
                const items = values.map(v => ({ id: v.id, title: v.name }));
                setSpecList(items);

                if (items.length > 0) {
                    setSpec(items[0].id);
                } else {
                    dispatch(showErrorMessage('Cant find any specializations in database'));
                }
            })
            .catch(e => dispatch(showErrorMessage(e)));

        http.get(`${http.getApiUri()}/departments`)
            .then(values => {
                const items = values.map(v => ({ id: v.id, title: v.name }));
                setDepartmentList(items);

                if (items.length > 0) {
                    setDepartment(items[0].id);
                } else {
                    dispatch(showErrorMessage('Cant find any departments in database'));
                }
            })
            .catch(e => dispatch(showErrorMessage(e)));
    }, []);

    const fields = {
        Login: new ValidatedField('Login', '', [
            { type: VALIDATION_TYPES.required },
            { type: VALIDATION_TYPES.pattern, value: /^\S+$/ }
        ]),
        Name: new ValidatedField('Name', '', [
            { type: VALIDATION_TYPES.required },
            { type: VALIDATION_TYPES.length, value: 5 }
        ]),
        Age: new ValidatedField('Age', 0, [
            { type: VALIDATION_TYPES.required },
            { type: VALIDATION_TYPES.range, valueFrom: 0, valueTo: 99 }
        ]),
        Password1: new ValidatedField('Password1', '', [{ type: VALIDATION_TYPES.required }]),
        Password2: new ValidatedField('Password2', '', [{ type: VALIDATION_TYPES.required }])
    };

    fields['Password1'].addValidationParam(VALIDATION_TYPES.equal, fields['Password2'].value);
    fields['Password2'].addValidationParam(VALIDATION_TYPES.equal, fields['Password1'].value);

    const validateFormAndGetAllErrors = f =>
        Object.keys(f).map(fieldName => {
            const { errors, customErrors } = f[fieldName].validation.validate();
            return {
                name: f[fieldName].name,
                errors: [...errors, ...customErrors]
            };
        });

    const getErrorsCount = e => e.map(err => err.errors).reduce((acc, val) => acc.concat(val), []).length;

    function onCreateBtnClick(e) {
        e.preventDefault();
        const errors = validateFormAndGetAllErrors(fields);
        if (getErrorsCount(errors) === 0) {
            saveUser();
        } else {
            errors
                .filter(err => err.errors.length > 0)
                .map(err => `Errors in field '${err.name}': ${err.errors.join(', ')}`)
                .forEach(em => dispatch(showErrorMessage(em)));
        }
    }

    const setErrorState = field => {
        return (errorList = []) => {
            dispatch(clearErrors({ fieldName: field.name }));
            errorList.forEach(e => {
                dispatch(addGenericError({ fieldName: field.name, message: e }));
            });
        };
    };

    function onChangeLoginField(e) {
        fields['Login'].onChange(e);
        dispatch(changeLogin({ field: fields['Login'], value: e }));
    }

    function onBackBtnClick(e) {
        e.preventDefault();
        history.push('/login');
    }

    function onSpecificationChange(e) {
        setSpec(e.target.value);
    }

    function onDepartmentChange(e) {
        setDepartment(e.target.value);
    }

    function saveUser() {
        const userData = JSON.stringify({
            user: {
                login: fields['Login'].value,
                name: fields['Name'].value,
                age: fields['Age'].value,
                specializationId: spec,
                departmentId: department
            },
            password: GetHashCode(fields['Password1'].value)
        });

        dispatch(startLoading());

        http.post(`${http.getApiUri()}/users`, userData)
            .then(() => {
                dispatch(showSuccessMessage('Successfully created'));
            })
            .then(() => {
                dispatch(endLoading());
                history.push('/login');
            })
            .catch(e => {
                dispatch(endLoading());
                dispatch(showErrorMessage(e));
            });
    }

    return (
        <div className="register-layout">
            {isBusy === true ? <IqLoader /> : ''}
            <div className={`iq-form ${isBusy === true ? 'busy' : ''}`}>
                <div className="iq-form__item">
                    <IqTitle content="Create user" fa-icon-key="far fa-edit" color="rgb(98, 77, 206)" />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-key="loginField"
                        title="Login"
                        debounce-time={DEBOUNCE_TIME_IN_MS}
                        on-change={onChangeLoginField}
                        on-validate={setErrorState(fields['Login'])}
                        validation={fields['Login'].validation.params}
                        bind-events={fields['Login'].bindEvents}
                    />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-key="nameField"
                        title="Name"
                        debounce-time={DEBOUNCE_TIME_IN_MS}
                        on-change={fields['Name'].onChange}
                        on-validate={setErrorState(fields['Name'])}
                        validation={fields['Name'].validation.params}
                        bind-events={fields['Name'].bindEvents}
                    />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-type="number"
                        data-key="ageField"
                        debounce-time={DEBOUNCE_TIME_IN_MS}
                        on-change={fields['Age'].onChange}
                        on-validate={setErrorState(fields['Age'])}
                        validation={fields['Age'].validation.params}
                        bind-events={fields['Age'].bindEvents}
                        title="Age"
                    />
                </div>
                <div className="iq-form__item">
                    <IqSelect
                        title="Specialization"
                        id="specField"
                        items={specList}
                        handleChange={onSpecificationChange}
                    />
                </div>
                <div className="iq-form__item">
                    <IqSelect
                        title="Department"
                        id="deptField"
                        items={departmentList}
                        handleChange={onDepartmentChange}
                    />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-type="password"
                        data-key="pass1Field"
                        title="Enter password"
                        debounce-time={DEBOUNCE_TIME_IN_MS}
                        on-change={val => {
                            fields['Password1'].onChange(val);
                            fields['Password2'].validation.validate(val, fields['Password1'].validation.params);
                        }}
                        bind-events={fields['Password1'].bindEvents}
                        on-validate={setErrorState(fields['Password1'])}
                        validation={fields['Password1'].validation.params}
                    />
                </div>
                <div className="iq-form__item">
                    <IqInput
                        data-type="password"
                        data-key="pass2Field"
                        title="Repeat password"
                        debounce-time={DEBOUNCE_TIME_IN_MS}
                        on-change={val => {
                            fields['Password2'].onChange(val);
                            fields['Password1'].validation.validate(val, fields['Password2'].validation.params);
                        }}
                        bind-events={fields['Password2'].bindEvents}
                        on-validate={setErrorState(fields['Password2'])}
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
};

const mapStateToProps = state => {
    return {
        errorsMessages: getErrorMessages(state),
        isBusy: state.isLoading
    };
};

export default connect(mapStateToProps)(RegistrationCard);
