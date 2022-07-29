import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import config from '../config';

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
                        {config.teamNames.abbreviated}
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto"
                        style={{ maxHeight: '700px' }}
                        navbarScroll
                    >
                        <NavDropdown
                            title="MEMBERSHIP & TEAMS"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item className="tabs navigation">
                                <LinkContainer to="/membership">
                                    <Nav.Link
                                        href="/membership"
                                        eventKey="/membership"
                                    >
                                        MEMBERSHIP
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item className="tabs navigation">
                                <LinkContainer to="/team-and-social">
                                    <Nav.Link
                                        href="/team-and-social"
                                        eventKey="/team-and-social"
                                    >
                                        TEAM & SOCIAL BOWLING
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="FIXTURES & RESULTS"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item className="tabs navigation">
                                <LinkContainer to="/fixtures">
                                    <Nav.Link
                                        href="/fixtures"
                                        eventKey="/fixtures"
                                    >
                                        FIXTURES
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item className="tabs navigation">
                                <LinkContainer to="/results">
                                    <Nav.Link
                                        href="/results"
                                        eventKey="/results"
                                    >
                                        RESULTS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="STATS"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item className="tabs">
                                <LinkContainer to="/stats/player">
                                    <Nav.Link
                                        href="/stats/player"
                                        eventKey="/stats/player"
                                    >
                                        PLAYER STATS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item className="tabs">
                                <LinkContainer to="/stats/team">
                                    <Nav.Link
                                        href="/stats/team"
                                        eventKey="/stats/team"
                                    >
                                        TEAM STATS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item className="tabs">
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
