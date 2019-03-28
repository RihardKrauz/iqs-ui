import React from 'react';
import { PropTypes } from 'prop-types';
import './iq-select.scss';

class IqSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };

        this.setFocused = this.setFocused.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    setFocused(val) {
        this.setState({
            focused: val
        });
    }

    onFocus() {
        this.setFocused(true);
    }

    onBlur() {
        this.setFocused(false);
    }

    render() {
        const elementId = `${this.props.id}-el`;

        return !this.props.items || this.props.items.length < 1 ? (
            <div>Loading...</div>
        ) : (
            <div className="iq-select">
                <div className={`iq-select__title ${this.state.focused === true ? 'active' : ''}`}>
                    <label className="iq-select__title-content" htmlFor={elementId}>
                        {this.props.title}
                    </label>
                </div>
                <div className="iq-select__list-wrapper">
                    <select
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        className="iq-select__list"
                        onChange={this.props.handleChange}
                        id={elementId}
                        defaultValue={this.props.defaultValue}
                    >
                        {this.props.items.map(i => (
                            <option className="iq-select__item" key={i.id} value={i.id}>
                                {i.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

IqSelect.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string.isRequired,
    items: PropTypes.array,
    defaultValue: PropTypes.string,
    handleChange: PropTypes.func
};

export default IqSelect;
