import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PlayerStats from './playerStats';

const url = window.location.href.toLowerCase();

function Stats(props) {
    const updateDate = props.updateDate;
    const playerResults = props.playerResults;

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
                        // activeKey="/stats/player"
                        // TODO change active key to whatever the selected tab is
                    >
                        <Nav.Item>
                            <Nav.Link
                                href="/stats/player"
                                eventKey="/stats/player"
                            >
                                PLAYERS
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/stats/team" eventKey="/stats/team">
                                TEAMS
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="/stats/records"
                                eventKey="/stats/records"
                            >
                                RECORDS
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            {!url.includes('/stats/records') &&
                !url.includes('/player') &&
                !url.includes('/team') && (
                    <PlayerStats playerResults={playerResults} />
                )}
            <Outlet />
            <p>Last Updated: {updateDate}</p>
        </div>
    );
}

export default Stats;
