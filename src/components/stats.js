import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Records from './records';
import TeamStats from './teamStats';
import PlayerStats from './playerStats';

function Stats(props) {
    const [showPlayerStats, setShowPlayerStats] = useState(true);
    const [showTeamStats, setShowTeamStats] = useState(false);
    const [showRecords, setShowRecords] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const playersStats = props.playerResults;
    const teamStats = props.teamResults;

    useEffect(() => {
        window.scrollTo(0, 0);
        const url = window.location.href.toLowerCase();
        if (loaded === false) {
            if (url.includes('#team-stats')) {
                displayTeamStats();
            }
            if (url.includes('#player-stats')) {
                displayPlayerStats();
            }
            if (url.includes('#records')) {
                displayRecords();
            }
            setLoaded(true);
        }
    });

    function displayPlayerStats() {
        setShowPlayerStats(true);
        setShowTeamStats(false);
        setShowRecords(false);
    }

    function displayTeamStats() {
        setShowTeamStats(true);
        setShowPlayerStats(false);
        setShowRecords(false);
    }

    function displayRecords() {
        setShowRecords(true);
        setShowPlayerStats(false);
        setShowTeamStats(false);
    }

    return (
        <div>
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
                        activeKey="/player-stats"
                        onSelect={(selectedKey) => {
                            if (selectedKey === '#player-stats') {
                                displayPlayerStats();
                            }
                            if (selectedKey === '#team-stats') {
                                displayTeamStats();
                            }
                            if (selectedKey === '#records') {
                                displayRecords();
                            }
                        }}
                    >
                        <Nav.Item>
                            <Nav.Link
                                href="#player-stats"
                                eventKey="#player-stats"
                            >
                                PLAYERS
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#team-stats" eventKey="#team-stats">
                                TEAMS
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#records" eventKey="#records">
                                RECORDS
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            <div id="stat" className="page-component">
                {showRecords && (
                    <Records
                        teamStats={teamStats}
                        playersStats={playersStats}
                    />
                )}
                {showTeamStats && (
                    <TeamStats
                        teamStats={teamStats}
                        playersStats={playersStats}
                    />
                )}
                {showPlayerStats && <PlayerStats playersStats={playersStats} />}
            </div>
        </div>
    );
}

export default Stats;
