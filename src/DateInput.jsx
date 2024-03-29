import React from 'react';
import PropTypes from 'prop-types';

export default class DateInput extends React.Component {
    static displayFormat(date) {
        return (date != null) ? date.toDateString() : '';
    }

    static editFormat(date) {
        return (date != null) ? date.toISOString().substr(0, 10) : '';
    }

    static unformat(str) {
        const val = new Date(str);
        return Number.isNaN(val.getTime()) ? null : val;
    }

    constructor(props) {
        super(props);
        this.state = { value: DateInput.editFormat(props.value), focused: false, valid: true };
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onFocus() {
        this.setState({ focused: true });
    }

    onBlur(e) {
        const { ...state } = this.state;
        const { ...props } = this.props;
        const value = DateInput.unformat(state.value);
        const valid = value === '' || value != null;
        if (valid !== state.valid && props.onValidityChange) {
            props.onValidityChange(e, value);
        }
        this.setState({ focused: false, valid });
        if (valid) props.onChange(e, value);
    }

    onChange(e) {
        if (e.target.value.match(/^[\d-]*$/)) {
            this.setState({ value: e.target.value })
        }
    }

    render() {
        const { ...state } = this.state;
        const { ...props } = this.props;
        const value = (state.focused || !state.valid)
            ? state.value : DateInput.displayFormat(props.value);
        const childProps = { ...props };
        delete childProps.onValidityChange;
        return (
            <input
                type="text"
                { ...childProps } //eslint-disable-line
                value={value} placeholder={state.focused ? 'yyyy-mm-dd' : null} //eslint-disable-line
                onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} //eslint-disable-line
            />
        )
    }
}

DateInput.propTypes = {
    value: PropTypes.object, //eslint-disable-line
    onChange: PropTypes.func.isRequired,
    onValidityChange: PropTypes.func, //eslint-disable-line
    name: PropTypes.string.isRequired
}
