import React from 'react';
import { PropTypes } from 'prop-types';
import './iq-input.scss';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const ErrorItem = props => <li className="iq-input__error-item">{props.value}</li>;

ErrorItem.propTypes = {
    value: PropTypes.string
};

export default class IqInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            value: '',
            errors: [],
            customErrors: []
        };

        this.setFocused = this.setFocused.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.setCustomErrors = this.setCustomErrors.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onFocusInput = this.onFocusInput.bind(this);
        this.onBlurInput = this.onBlurInput.bind(this);
        this.addCustomError = this.addCustomError.bind(this);
        this.removeCustomError = this.removeCustomError.bind(this);

        this.input$ = new Subject();
        this.inputChangeSubscription = null;
    }

    setFocused(val) {
        this.setState({
            focused: val
        });
    }

    setValue(val) {
        this.setState({
            value: val
        });
    }

    setErrors(val) {
        this.setState({
            errors: val
        });
    }

    setCustomErrors(val) {
        this.setState({
            customErrors: val
        });
    }

    checkValidity(val, customValidationProps) {
        val = val || '';
        customValidationProps = customValidationProps || this.props['validation'];

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

            this.setErrors(errorList);

            if (this.props['on-validate']) {
                this.props['on-validate'](errorList);
            }

            return { errors: errorList, customErrors: this.state.customErrors };
        }

        return {};
    }

    addCustomError(error) {
        this.setCustomErrors([...this.state.customErrors, error]);
    }

    removeCustomError(error) {
        this.setCustomErrors(this.state.customErrors.filter(e => e !== error));
    }

    componentDidMount() {
        if (this.props['bind-events']) {
            const { checkValidity, addCustomError, removeCustomError } = this;
            this.props['bind-events']({ checkValidity, addCustomError, removeCustomError });
        }

        this.inputChangeSubscription = this.input$
            .pipe(
                debounceTime(this.props['debounce-time']),
                distinctUntilChanged()
            )
            .subscribe(val => {
                if (this.props['on-change']) {
                    this.props['on-change'](val);
                }
            });
    }

    componentWillUnmount() {
        this.inputChangeSubscription.unsubscribe();
    }

    onChangeInput(e) {
        const { value } = e.currentTarget;
        this.setValue(value);
        this.checkValidity(value);
        this.input$.next(value);
    }

    onFocusInput() {
        this.setFocused(true);
    }

    onBlurInput() {
        this.setFocused(false);
    }

    render() {
        return (
            <div className="iq-input">
                <div
                    className={`iq-input__title ${this.state.focused === true ? 'active' : ''} ${
                        this.state.value !== '' ? 'not-empty' : ''
                    }`}
                >
                    <label className="iq-input__title-el" htmlFor={this.props['data-key']}>
                        {this.props.title}
                    </label>
                </div>
                <div className="iq-input__value">
                    <input
                        type={this.props['data-type'] ? this.props['data-type'] : 'text'}
                        className={`iq-input__value-el ${
                            this.state.errors.length + this.state.customErrors.length > 0 ? 'invalid' : ''
                        }`}
                        id={this.props['data-key']}
                        onFocus={this.onFocusInput}
                        onBlur={this.onBlurInput}
                        onChange={this.onChangeInput}
                    />
                </div>
                <div className={'iq-input__validation'}>
                    {this.state.errors.length + this.state.customErrors.length > 0 && (
                        <ul className="iq-input__error-list">
                            {this.state.errors.concat(this.state.customErrors).map((e, idx) => (
                                <ErrorItem key={this.props['data-key'] + idx} value={e} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    }
}

IqInput.propTypes = {
    title: PropTypes.string,
    validation: PropTypes.array,
    'on-validate': PropTypes.func,
    'bind-events': PropTypes.func,
    'on-change': PropTypes.func,
    'data-key': PropTypes.string,
    'data-type': PropTypes.string,
    'debounce-time': PropTypes.string
};
