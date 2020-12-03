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

const App = () => (
    <div>
        <div className="header">
            <h1>Issue Tracker</h1>
        </div>
        <div className="contents">
            <Switch>
                <Route exact path="/issues" component={withRouter(IssueList)} />
                <Route path="/issues/:id" component={IssueEdit} />
                <Route path="*"><NoMatch /></Route>
            </Switch>
        </div>
        <div className="footer">
            Full source available at
            <span> </span>
            <a href="https://github.com/mbmcmullen27/pro-mern-stack">Glub...</a>
        </div>
    </div>
)

const RoutedApp = () => (
    <Router>
        <Redirect from="/" to={{ ...location, pathname: '/issues' }} />
        <Route path="/" component={App} />
    </Router>
)
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    module.hot.accept();
}
