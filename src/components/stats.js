import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import YearSelectDropdown from './yearSelectDropdown';

function Stats(props) {
    const stats = props.stats;
    const statsCallback = props.statsCallback;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="stats">
            <Navbar
                id="navbar-stats"
                collapseOnSelect
                expand="sm"
                bg="light"
                variant="light"
            >
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav
                            style={{ maxHeight: '700px' }}
                            navbarScroll
                            className="me-auto"
                        >
                            <Nav.Item style={{ padding: '0 0 0 1rem' }}>
                                <LinkContainer to="/stats/player">
                                    <Nav.Link
                                        href="/stats/player"
                                        eventKey="/stats/player"
                                    >
                                        PLAYER STATS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item style={{ padding: '0 0 0 1rem' }}>
                                <LinkContainer to="/stats/team">
                                    <Nav.Link
                                        href="/stats/team"
                                        eventKey="/stats/team"
                                    >
                                        TEAM STATS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item style={{ padding: '0 0 0 1rem' }}>
                                <LinkContainer to="/stats/records">
                                    <Nav.Link
                                        href="/stats/records"
                                        eventKey="/stats/records"
                                    >
                                        RECORDS
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <YearSelectDropdown statsCallback={statsCallback} />
            <Outlet />
            <p>Last Updated: {stats.lastUpdated}</p>
        </div>
    );
}

export default Stats;
