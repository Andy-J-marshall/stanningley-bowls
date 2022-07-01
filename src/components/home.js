import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import TeamStats from './teamStats';
import PlayerStats from './playerStats';
import TeamRecords from './teamRecords';
import PlayerRecords from './playerRecords';
import bowlsStats from '../data/bowlsStats.json';

function Home() {
    const [showPlayerStats, setShowPlayerStats] = useState(false);
    const [showTeamStats, setShowTeamStats] = useState(false);
    const [showPlayerRecords, setShowPlayerRecords] = useState(false);
    const [showTeamRecords, setShowTeamRecords] = useState(false);

    const playersStats = bowlsStats.playerResults;
    const teamStats = bowlsStats.teamResults;

    // TODO decide how to display this information. Maybe records together? Use a nav bar?
    // TODO what info should I default to?
    // TODO Handle multiple years worth of stats

    function displayPlayerStats() {
        if (showPlayerStats) {
            setShowPlayerStats(false);
        } else {
            setShowPlayerStats(true);
            setShowTeamStats(false);
            setShowPlayerRecords(false);
            setShowTeamRecords(false);
        }
    }

    function displayTeamStats() {
        if (showTeamStats) {
            setShowTeamStats(false);
        } else {
            setShowTeamStats(true);
            setShowPlayerStats(false);
            setShowPlayerRecords(false);
            setShowTeamRecords(false);
        }
    }

    function displayPlayerRecords() {
        if (showPlayerRecords) {
            setShowPlayerRecords(false);
        } else {
            setShowPlayerRecords(true);
            setShowTeamRecords(false);
            setShowPlayerStats(false);
            setShowTeamStats(false);
        }
    }

    function displayTeamRecords() {
        if (showTeamRecords) {
            setShowTeamRecords(false);
        } else {
            setShowTeamRecords(true);
            setShowPlayerRecords(false);
            setShowPlayerStats(false);
            setShowTeamStats(false);
        }
    }

    return (
        <div id="home">
            <Navbar id='navbar' fixed="top" bg="light" variant="light">
                <Navbar.Brand href="#home">SPBC</Navbar.Brand>
                {/* TODO do this */}
                {/* <Navbar.Brand href='#home'>
                    <img
                        alt='logo'
                        src='/logo.png'
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                    />{' '}
                    SPBC
                </Navbar.Brand> */}
                <Nav className="me-auto">
                    <Nav.Link onSelect={displayPlayerRecords} href="#home">
                        PLAYER RECORDS
                    </Nav.Link>
                    <Nav.Link onSelect={displayTeamRecords} href="#home">
                        TEAM RECORDS
                    </Nav.Link>
                    <Nav.Link onSelect={displayPlayerStats} href="#home">
                        PLAYER STATS
                    </Nav.Link>
                    <Nav.Link onSelect={displayTeamStats} href="#home">
                        TEAM STATS
                    </Nav.Link>
                </Nav>
            </Navbar>
            <div id="header">
                <h1 style={{ fontSize: '4rem' }}>
                    Stanningley Park Bowling Club
                </h1>
            </div>
            {!showPlayerStats &&
                !showTeamStats &&
                !showTeamRecords &&
                !showPlayerRecords && (
                    <div id='welcome-text'>
                        <p>
                            Welcome to Stanningley Park Crown Green Bowling
                            Club's website
                        </p>
                    </div>
                )}
            {showPlayerRecords && <PlayerRecords playersStats={playersStats} />}
            {showTeamRecords && <TeamRecords stats={teamStats} />}
            {showPlayerStats && <PlayerStats />}
            {showTeamStats && <TeamStats />}
        </div>
    );
}

export default Home;
