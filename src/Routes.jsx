import React from 'react';
import {
    Route, withRouter, Redirect, Switch
} from 'react-router-dom';

import App from './App.jsx';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const NoMatch = () => <p>Page Not Found</p>;

export default (
    <App>
        <Switch>
            <Route exact path="/issues" component={withRouter(IssueList)} />
            <Route path="/issues/:id" component={withRouter(IssueEdit)} />
            <Redirect from="/" to="/issues" />
            <Route path="*"><NoMatch /></Route>
        </Switch>
    </App>
)
