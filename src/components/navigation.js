import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Navigation() {
    return (
        <Navbar
            collapseOnSelect
            id="navbar"
            fixed="top"
            bg="light"
            variant="light"
            expand="md"
        >
            <Container fluid>
                <LinkContainer to="/home">
                    <Navbar.Brand className="navigation" href="/home">
                        S.P.B.C.
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto"
                        style={{ maxHeight: '700px' }}
                        navbarScroll
                    >
                        <Nav.Item className="navigation">
                            <LinkContainer to="/membership">
                                <Nav.Link
                                    href="/membership"
                                    eventKey="/membership"
                                >
                                    MEMBERSHIP
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="navigation">
                            <LinkContainer to="/fixtures-and-results">
                                <Nav.Link
                                    href="/fixtures-and-results"
                                    eventKey="/fixtures-and-results"
                                >
                                    FIXTURES & RESULTS
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <NavDropdown
                            title="STATS"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item>
                                <LinkContainer to="/stats/player">
                                    <Nav.Link
                                        href="/stats/player"
                                        eventKey="/stats/player"
                                    >
                                        PLAYER STATS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/stats/team">
                                    <Nav.Link
                                        href="/stats/team"
                                        eventKey="/stats/team"
                                    >
                                        TEAM STATS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/stats/records">
                                    <Nav.Link
                                        href="/stats/records"
                                        eventKey="/stats/records"
                                    >
                                        RECORDS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </NavDropdown>
                        <Nav.Item className="navigation">
                            <LinkContainer to="/contact">
                                <Nav.Link href="/contact" eventKey="/contact">
                                    CONTACT
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
