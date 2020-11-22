import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Redirect, Route, Switch, withRouter
} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found... glub...</p>;
const RoutedApp = () => (
    <Router>
        <Redirect from="/" to="/issues" />
        <Switch>
            <Route exact path="/issues" component={withRouter(IssueList)} />
            <Route path="/issues/:id" component={IssueEdit} />
            <Route path="*"><NoMatch /></Route>
        </Switch>
    </Router>
)
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    module.hot.accept();
}
