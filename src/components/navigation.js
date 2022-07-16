import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import smallLogo from '../images/logos/brand-logo-tiny.png';

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
                    <Navbar.Brand href="/home">
                        <img
                            alt="logo"
                            src={smallLogo}
                            width="52px"
                            height="52px"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto"
                        style={{ maxHeight: '700px' }}
                        navbarScroll
                    >
                        <Nav.Item>
                            <LinkContainer to="/home">
                                <Nav.Link href="/home" eventKey="/home">
                                    HOME
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/membership">
                                <Nav.Link
                                    href="/membership"
                                    eventKey="/membership"
                                >
                                    MEMBERSHIP
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/fixtures-and-results">
                                <Nav.Link
                                    href="/fixtures-and-results"
                                    eventKey="/fixtures-and-results"
                                >
                                    FIXTURES & RESULTS
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/stats/player">
                                <Nav.Link href="/stats/player" eventKey="/stats/player">
                                    STATS
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
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
