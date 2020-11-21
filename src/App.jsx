import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, withRouter } from 'react-router';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found... glub...</p>;
const RoutedApp = () => (
    <Router>
        <Redirect from="/" to="/issues" />
        <Switch>
            <Route path="/issues" component={withRouter(IssueList)} />
            <Route path="/issues/:id"><IssueEdit /></Route>
            <Route path="*"><NoMatch /></Route>
        </Switch>
    </Router>
)
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    module.hot.accept();
}
