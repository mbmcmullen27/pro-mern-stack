import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Glub from '../src/Glub.jsx';

const contentNode = document.getElementById('contents'); // eslint-disable-line
ReactDOM.render(<Glub {...window.__INITIAL_STATE__} />, contentNode); // eslint-disable-line

if (module.hot) {
    module.hot.accept();
}
