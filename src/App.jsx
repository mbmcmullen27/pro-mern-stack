import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {
    BrowserRouter as Router,
    Redirect, Route, Switch, withRouter
} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found... glub...</p>;

function App(props) {
    const { children } = props;
    return (
        <div>
            <div className="header">
                <h1>Issue Tracker</h1>
            </div>
            <div className="contents">
                {children}
            </div>
            <div className="footer">
                Full source available at
                <span> </span>
                <a href="https://github.com/mbmcmullen27/pro-mern-stack">Glub...</a>
            </div>
        </div>
    )
}

App.propTypes = {
    children: PropTypes.object.isRequired, //eslint-disable-line
}

const RoutedApp = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/issues" component={withRouter(IssueList)} />
                <Route path="/issues/:id" component={withRouter(IssueEdit)} />
                <Redirect from="/" to="/issues" />
                <Route path="*"><NoMatch /></Route>
            </Switch>
        </App>
    </Router>
)
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    module.hot.accept();
}
