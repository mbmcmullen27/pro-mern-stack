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
        this.sate = { value: DateInput.editFormat(props.value), focused: false, valid: true };
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
        const valid = state.value === '' || value != null;
        if (valid !== state.valid && props.onValidityChange) {
            props.onValidityChange(e, value);
        }
    }

    onChange(e) {
        if (e.target.value.match(/^[\d-]*$/)) {
            this.setState({ value: e.target.value })
        }
    }

    render() {
        const { ...state } = this.state;
        const { ...props } = this.props;
        const className = (!state.valid && !state.focused) ? 'invalid' : null;
        const value = (state.focused || !state.valid)
            ? state.value : DateInput.displayFormat(props.value);
        return (
            <input
                type="text" size={20} name={props.name} className={className} //eslint-disable-line
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
