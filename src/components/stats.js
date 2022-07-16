import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import YearSelectDropdown from './yearSelectDropdown';

function Stats(props) {
    const stats = props.stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="stats">
            <Navbar
                collapseOnSelect
                id="navbar-stats"
                bg="light"
                variant="light"
            >
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Nav
                        className="me-auto center"
                        style={{ maxHeight: '700px' }}
                        navbarScroll
                    >
                        <Nav.Item>
                            <LinkContainer to="/stats/player">
                                <Nav.Link
                                    href="/stats/player"
                                    eventKey="/stats/player"
                                >
                                    PLAYERS
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/stats/team">
                                <Nav.Link
                                    href="/stats/team"
                                    eventKey="/stats/team"
                                >
                                    TEAMS
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
                    </Nav>
                </Container>
            </Navbar>
            {/* TODO implement year drop down */}
            {/* TODO display year in drop down from the URL? */}
            {/* <YearSelectDropdown
                startYear={startYear}
                defaultStats={stats}
                setUpdateDate={setUpdateDate}
                setPlayerResults={setPlayerResults}
                setTeamResults={setTeamResults}
                allYearStats={allYearStats}
            /> */}
            <Outlet />
            <p>Last Updated: {stats.lastUpdated}</p>
        </div>
    );
}

export default Stats;
