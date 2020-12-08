import React from 'react';
import PropTypes from 'prop-types';

export default class NumInput extends React.Component {
    static format(num) {
        return num != null ? num.toString() : ''
    }

    static unformat(str) {
        const val = parseInt(str, 10);
        return Number.isNaN(val) ? null : val;
    }

    constructor(props) {
        super(props);
        this.state = { value: NumInput.format(props.value) }; /*eslint-disable-line*/ 
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onBlur(e) {
        const { ...props } = this.props
        const { value } = this.state
        props.onChange(e, NumInput.unformat(value));
    }

    onChange(e) {
        if (e.target.value.match(/^\d*$/)) {
            this.setState({ value: e.target.value });
        }
    }

    render() {
        const { ...props } = this.props
        const { value } = this.state
        return (
            <input type ="text" {...props} value={value} /*eslint-disable-line*/ 
            onBlur={this.onBlur} onChange={this.onChange}  /*eslint-disable-line*/ 
            />
        )
    }
}

NumInput.proptTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
}
