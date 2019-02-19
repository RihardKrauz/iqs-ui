import React, { useState, useEffect } from 'react';
import './iq-input.scss';

const ErrorItem = props => <li className="iq-input__error-item">{props.value}</li>;

export default props => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState([]);

    const checkValidity = (val, customValidationProps) => {
        val = val || '';
        customValidationProps = customValidationProps || props['validation'];

        if (customValidationProps) {
            const errorList = customValidationProps
                .map(validationItem => {
                    switch (validationItem.type) {
                        case 'required':
                            if (val === '' || !val) {
                                return 'This value is required';
                            }
                            break;
                        case 'length':
                            if (!val || val.length < +validationItem.value) {
                                return `This value's length should be more than ${validationItem.value} chars`;
                            }
                            break;
                        case 'equal':
                            if (val !== validationItem.value) {
                                return `Values should be equal`;
                            }
                            break;
                        case 'range':
                            if (+val < +validationItem.valueFrom || +val > +validationItem.valueTo) {
                                return `Values should be in range from ${validationItem.valueFrom} to ${
                                    validationItem.valueTo
                                }`;
                            }
                            break;
                        default:
                            return '';
                    }
                    return '';
                })
                .filter(err => err !== '');

            setErrors(errorList);

            if (props['on-validate']) {
                props['on-validate'](errorList);
            }

            return errorList;
        }

        return [];
    };

    useEffect(() => {
        if (props['bind-validate-action']) {
            let handler = {};
            handler.event = (data, value) => {
                return checkValidity(data, value);
            };
            props['bind-validate-action'](handler);
        }
    }, []);

    const onFocusInput = () => {
        setFocused(true);
    };

    const onBlurInput = () => {
        setFocused(false);
    };

    const onChangeInput = e => {
        setValue(e.currentTarget.value);
        checkValidity(e.currentTarget.value);
        if (props['on-change']) {
            props['on-change'](e.currentTarget.value);
        }
    };

    return (
        <div className="iq-input">
            <div className={`iq-input__title ${focused === true ? 'active' : ''} ${value !== '' ? 'not-empty' : ''}`}>
                <label className="iq-input__title-el" htmlFor={props['data-key']}>
                    {props.title}
                </label>
            </div>
            <div className="iq-input__value">
                <input
                    type={props['data-type'] ? props['data-type'] : 'text'}
                    className={`iq-input__value-el ${errors.length > 0 ? 'invalid' : ''}`}
                    id={props['data-key']}
                    onFocus={onFocusInput}
                    onBlur={onBlurInput}
                    onChange={onChangeInput}
                />
            </div>
            <div className={'iq-input__validation'}>
                {errors.length > 0 && (
                    <ul className="iq-input__error-list">
                        {errors.map((e, idx) => (
                            <ErrorItem key={props['data-key'] + idx} value={e} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
