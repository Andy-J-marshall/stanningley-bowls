import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
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
                <Navbar.Brand href="/home">
                    <img
                        alt="logo"
                        src={smallLogo}
                        width="52px"
                        height="52px"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto"
                        style={{ maxHeight: '700px' }}
                        navbarScroll
                        activeKey="/home"
                    >
                        <Nav.Item>
                            <Nav.Link href="/home" eventKey="/home">
                                HOME
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/membership" eventKey="/membership">
                                MEMBERSHIP
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="/fixtures-and-results"
                                eventKey="/fixtures-and-results"
                            >
                                FIXTURES & RESULTS
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/stats" eventKey="/stats">
                                STATS
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/contact" eventKey="/contact">
                                CONTACT
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
