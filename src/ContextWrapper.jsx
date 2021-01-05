import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const InitialState = createContext('initial')

const ContextWrapper = (props) => {
    const { initialState, children } = props
    return (
        <InitialState.Provider value={initialState}>
            {children}
        </InitialState.Provider>
    )
}

ContextWrapper.propTypes = {
    children: PropTypes.object.isRequired, //eslint-disable-line
    initialState: PropTypes.object // eslint-disable-line
}

export default ContextWrapper;
