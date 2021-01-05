import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ContextWrapper from '../src/ContextWrapper.jsx';
import routes from '../src/Routes.jsx'

const WrappedApp = (props) => (
    <ContextWrapper {...props}>
        <Router>
            {routes}
        </Router>
    </ContextWrapper>
)

const contentNode = document.getElementById('contents'); // eslint-disable-line
ReactDOM.render(<WrappedApp {...window.__INITIAL_STATE__} />, contentNode); // eslint-disable-line

if (module.hot) {
    module.hot.accept();
}
