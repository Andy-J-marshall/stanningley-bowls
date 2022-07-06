import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import TeamStats from './teamStats';
import PlayerStats from './playerStats';
import Footer from './footer';
import Membership from './membership';
import Contact from './contact';
import Fixtures from './fixtures';
import bowlsStats from '../data/bowlsStats.json';
import smallLogo from '../images/brand-logo-tiny.png';
import logo from '../images/brand-logo.png';
import Records from './records';

function Home() {
    const [showPlayerStats, setShowPlayerStats] = useState(false);
    const [showTeamStats, setShowTeamStats] = useState(false);
    const [showRecords, setShowRecords] = useState(false);
    const [showMembership, setShowMembership] = useState(false);
    const [showFixtures, setShowFixtures] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);
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
            if (url.includes('#membership')) {
                displayMembership();
            }
            if (url.includes('#fixtures')) {
                displayFixtures();
            }
            if (url.includes('#contact')) {
                displayContactInfo();
            }
            setLoaded(true);
        }
    });

    function displayContactInfo() {
        setShowContactInfo(true);
        setShowFixtures(false);
        setShowMembership(false);
        setShowPlayerStats(false);
        setShowTeamStats(false);
        setShowRecords(false);
    }

    function displayFixtures() {
        setShowFixtures(true);
        setShowMembership(false);
        setShowPlayerStats(false);
        setShowTeamStats(false);
        setShowRecords(false);
        setShowContactInfo(false);
    }

    function displayMembership() {
        setShowMembership(true);
        setShowPlayerStats(false);
        setShowTeamStats(false);
        setShowRecords(false);
        setShowFixtures(false);
        setShowContactInfo(false);
    }

    function displayPlayerStats() {
        setShowPlayerStats(true);
        setShowTeamStats(false);
        setShowRecords(false);
        setShowMembership(false);
        setShowFixtures(false);
        setShowContactInfo(false);
    }

    function displayTeamStats() {
        setShowTeamStats(true);
        setShowPlayerStats(false);
        setShowRecords(false);
        setShowMembership(false);
        setShowFixtures(false);
        setShowContactInfo(false);
    }

    function displayRecords() {
        setShowRecords(true);
        setShowPlayerStats(false);
        setShowTeamStats(false);
        setShowMembership(false);
        setShowFixtures(false);
        setShowContactInfo(false);
    }

    /* TODO Home tab? Or move this to app.js? */
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
                        >
                            <Nav.Link
                                onSelect={displayMembership}
                                href="#membership"
                            >
                                MEMBERSHIP
                            </Nav.Link>
                            <Nav.Link
                                onSelect={displayFixtures}
                                href="#fixtures"
                            >
                                FIXTURES
                            </Nav.Link>
                            <Nav.Link
                                onSelect={displayContactInfo}
                                href="#contact"
                            >
                                CONTACT
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
            {/* TODO change this to a proper home page */}
            {showFixtures && <Fixtures />}
            {showContactInfo && <Contact />}
            {showMembership && <Membership />}
            {/* TODO Add current league position into stats */}
            {/* TODO Social media integration */}
            {showRecords && (
                <Records teamStats={teamStats} playersStats={playersStats} />
            )}
            {showPlayerStats && <PlayerStats playersStats={playersStats} />}
            {showTeamStats && (
                <TeamStats teamStats={teamStats} playersStats={playersStats} />
            )}
            {/* TODO add info on supporters */}
            {/* TODO add Results */}
            {/* TODO add a membership page? */}
            <Footer />
        </div>
    );
}

export default Home;
