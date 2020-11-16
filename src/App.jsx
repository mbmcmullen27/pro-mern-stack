import React from 'react';
import ReactDOM from 'react-dom';

import IssueList from './IssueList.jsx';//eslint-disable-line

const contentNode = document.getElementById('contents');
ReactDOM.render(<IssueList />, contentNode);

if (module.hot) {
    module.hot.accept();
}
