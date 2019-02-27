import React from 'react';
import { PropTypes } from 'prop-types';
import './iq-icon-title.scss';

IqTitle.propTypes = {
    color: PropTypes.string,
    content: PropTypes.string.isRequired,
    'fa-icon-key': PropTypes.string
};

export default function IqTitle(props) {
    const { color, content, 'fa-icon-key': iconKey } = props;

    return (
        <div className="iq-title">
            <div className="iq-title__icon-container">
                <span className="iq-title__icon-content" style={{ color: color }}>
                    <i className={`${iconKey}`} />
                </span>
            </div>
            <div className="iq-title__content-wrapper">
                <span className="iq-title__title-content">{content}</span>
            </div>
        </div>
    );
}
