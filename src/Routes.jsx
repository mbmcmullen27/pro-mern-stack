import React from 'react';
import {
    Route, withRouter, Redirect, Switch
} from 'react-router-dom';

import App from './App.jsx';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const NoMatch = () => <p>Page Not Glub</p>;

export default (
    <App>
        <Switch>
            <Route exact path="/issues" component={withRouter(IssueList)} />
            <Route path="/issues/:id" component={withRouter(IssueEdit)} />
            <Route path="*"><NoMatch /></Route>
        </Switch>
    </App>
)
