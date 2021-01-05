import React from 'react';
import {
    Navbar, Nav, NavDropdown,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

import IssueAddNavItem from './IssueAddNavItem.jsx';

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

export default App;
