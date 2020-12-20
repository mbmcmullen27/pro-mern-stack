import React from 'react';
import { Alert, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Toast extends React.Component {
    componentDidUpdate() {
        const { ...props } = this.props;
        if (props.showing) {
            clearTimeout(this.dismissTimer);
            this.dismissTimer = setTimeout(props.onDismiss, 5000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.dismissTimer);
    }

    render() {
        const { ...props } = this.props;
        const divStyle = {
            position: 'fixed',
            top: 30,
            left: 0,
            right: 0,
            textAlign: 'center'
        }

        return (
            <Collapse in={props.showing}>
                <div style={divStyle}>
                    <Alert
                        variant={props.variant}
                        onClose={props.onDismiss}
                        style={{ display: 'inline-block', width: 500 }}
                    >
                        {props.message}
                    </Alert>
                </div>
            </Collapse>
        )
    }
}

Toast.propTypes = {
    showing: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    variant: PropTypes.string,
    message: PropTypes.any.isRequired // eslint-disable-line
}

Toast.defaultProps = {
    variant: 'success'
}
