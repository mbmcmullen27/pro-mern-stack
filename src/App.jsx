import React from 'react';
import ReactDOM from 'react-dom';
import {
    Navbar, Nav, NavDropdown,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

import {
    BrowserRouter as Router,
    Redirect, Route, Switch, withRouter
} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found... glub...</p>;

const Header = () => (
    <Navbar className="container-fluid">
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
        <Nav className="mr-auto">
            <LinkContainer to="/issues">
                <Nav.Link>Issues</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reports">
                <Nav.Link>Reports</Nav.Link>
            </LinkContainer>
        </Nav>
        <Nav className="ml-auto">
            <IssueAddNavItem />
            <NavDropdown id="user-dropdown" title={<i className="fa fa-ellipsis-h" aria-hidden="true" />}>
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
                        Full source available at&nbsp;
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
