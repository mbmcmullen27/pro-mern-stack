import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found... glub...</p>;
const RoutedApp = () => (
    <Router>
        <Redirect from="/" to="/issues" />
        <Route path="/issues" component={IssueList} />
        <Route path="/issues/:id" component={IssueEdit} />
        <Route path="*" component={NoMatch} />
    </Router>
)
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    module.hot.accept();
}
