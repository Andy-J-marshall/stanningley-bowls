import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import TeamStats from './teamStats';
import PlayerStats from './playerStats';
import Links from './links';
import Fixtures from './fixtures';
import bowlsStats from '../data/bowlsStats.json';
import smallLogo from '../images/brand-logo-tiny.png';
import logo from '../images/brand-logo.png';
import Records from './Records';

function Home() {
    const [showPlayerStats, setShowPlayerStats] = useState(false);
    const [showTeamStats, setShowTeamStats] = useState(false);
    const [showRecords, setShowRecords] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const playersStats = bowlsStats.playerResults;
    const teamStats = bowlsStats.teamResults;

    // TODO Handle multiple years worth of stats
    useEffect(() => {
        window.scrollTo(0, 0);
        const url = window.location.href.toLowerCase();
        if (loaded === false) {
            if (url.includes('#team-stats')) {
                displayTeamStats();
            }
            if (url.includes('#team-records')) {
                displayTeamRecords();
            }
            if (url.includes('#player-stats')) {
                displayPlayerStats();
            }
            if (url.includes('#player-records')) {
                displayRecords();
            }
            if (url.includes('#home') || url.includes('#info')) {
                displayInfo();
            }
            setLoaded(true);
        }
    });

    function displayInfo() {
        setShowPlayerStats(false);
        setShowTeamStats(false);
        setShowRecords(false);
    }

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
        <div id="home">
            <Navbar
                collapseOnSelect
                id="navbar"
                fixed="top"
                bg="light"
                variant="light"
                expand="md"
            >
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img
                            alt="logo"
                            src={smallLogo}
                            width="50px"
                            height="50px"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    {/* // TODO this isn't working when clicking on home page */}
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto"
                            style={{ maxHeight: '700px' }}
                            navbarScroll
                        >
                            <Nav.Link onSelect={displayInfo} href="#info">
                                INFO
                            </Nav.Link>
                            <Nav.Link
                                onSelect={displayPlayerStats}
                                href="#player-stats"
                            >
                                PLAYER STATS
                            </Nav.Link>
                            <Nav.Link
                                onSelect={displayTeamStats}
                                href="#team-stats"
                            >
                                TEAM STATS
                            </Nav.Link>
                            <Nav.Link onSelect={displayRecords} href="#records">
                                RECORDS
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div id="header">
                <img
                    alt="logo"
                    src={logo}
                    width="240"
                    height="240"
                    className="d-inline-block align-top"
                />
            </div>
            {!showPlayerStats && !showTeamStats && !showRecords && (
                <div id="welcome">
                    <p>
                        Welcome to Stanningley Park Crown Green Bowling Club's
                        website.
                    </p>
                    <Fixtures />
                    <Links />
                </div>
            )}
            {/* TODO link to bowlsnet pages */}
            {/* TODO Add current league position into stats */}
            {/* TODO Social media integration */}
            {/* TODO Contact page */}
            {showRecords && (
                <Records teamStats={teamStats} playersStats={playersStats} />
            )}
            {showPlayerStats && <PlayerStats playersStats={playersStats} />}
            {showTeamStats && (
                <TeamStats teamStats={teamStats} playersStats={playersStats} />
            )}
        </div>
    );
}

export default Home;
