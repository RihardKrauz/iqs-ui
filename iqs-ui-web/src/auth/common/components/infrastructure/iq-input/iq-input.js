import React, { useState } from 'react';
import './iq-input.scss';

export default (props) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const onFocusInput = () => {
        setFocused(true);
    }

    const onBlurInput = () => {
        setFocused(false);
    }

    const onChangeInput = (e) => {
        setValue(e.currentTarget.value);
    }

    return (<div className="iq-input">
        <div className={`iq-input__title ${focused === true ? 'active' : ''} ${value !== '' ? 'not-empty' : ''}`}>
            <label 
                className="iq-input__title-el"
                htmlFor={props['data-key']}>{props.title}</label>
        </div>
        <div className="iq-input__value">
            <input className="iq-input__value-el" id={props['data-key']} onFocus={onFocusInput} onBlur={onBlurInput} onChange={onChangeInput}></input>
        </div>
    </div>);
};