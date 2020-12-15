import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Navbar, Nav, NavItem, NavDropdown
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Redirect, Route, Switch, withRouter
} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found... glub...</p>;

const Header = () => (
    <Navbar fluid="true">
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
        <Nav justify variant="pills">
            <LinkContainer to="/issues">
                <Nav.Item>Issues</Nav.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/reports">
                <Nav.Item>Reports</Nav.Item>
            </LinkContainer>
            <NavDropdown.Divider />
        </Nav>
        <Nav className="ml-auto">
            <Nav.Item><i className="fa fa-bomb" aria-hidden="true" /> Create Issue</Nav.Item>
            <NavDropdown id="user-dropdown" title="logout">
                <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    </Navbar>
)

function App(props) {
    const { children } = props;
    return (
        <div>
            <Header />
            <div className="container-fluid">
                {children}
                <hr />
                <h5>
                    <small>
                        Full source available at
                        <a href="https://github.com/mbmcmullen27/pro-mern-stack">Glub...</a>
                    </small>
                </h5>
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
