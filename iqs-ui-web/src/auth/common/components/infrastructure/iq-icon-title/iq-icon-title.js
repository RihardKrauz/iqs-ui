import React from 'react';
import './iq-icon-title.scss';

export default (props) => {
    return (<div className="iq-title">
        <div className="iq-title__icon-container">
            <span className="iq-title__icon-content" style={{color: props.color}}><i className={`${props['fa-icon-key']}`}></i></span>
        </div>
        <div className="iq-title__content-wrapper">
            <span className="iq-title__title-content">{props.content}</span>
        </div>
    </div>)
};