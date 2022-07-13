import React, { useState, useEffect } from 'react';
import {
    Navbar,
    Nav,
    Container,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap';
import Records from './records';
import TeamStats from './teamStats';
import PlayerStats from './playerStats';
import bowlsStats2022 from '../data/bowlsStats2022.json';

const currentYear = new Date().getFullYear();
let startYear = currentYear;
const url = window.location.href.toLowerCase();
if (url.includes('#stats20')) {
    const yearFromUrl = url.split('#stats')[1];
    startYear = yearFromUrl;
}

// Stats for future years will go in here
const allYearStats = {
    year2022: bowlsStats2022,
};

let defaultStats = allYearStats[`year${startYear}`];
if (!defaultStats) {
    defaultStats = allYearStats[`year${currentYear}`];
    startYear = currentYear;
}

function Stats() {
    const [showPlayerStats, setShowPlayerStats] = useState(true);
    const [showTeamStats, setShowTeamStats] = useState(false);
    const [showRecords, setShowRecords] = useState(false);
    const [year, setYear] = useState(startYear);
    const [loaded, setLoaded] = useState(false);
    const [playerResults, setPlayerResults] = useState(
        defaultStats.playerResults
    );
    const [teamResults, setTeamResults] = useState(defaultStats.teamResults);

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

    function changeStatsYear(event) {
        let year = event.replace('#stats', '').toString();
        let statsForSelectedYear;
        setYear(year);
        switch (year) {
            case '2022':
                statsForSelectedYear = allYearStats['year2022'];
                break;
            default:
                statsForSelectedYear = allYearStats[`year${startYear}`];
                break;
        }
        setPlayerResults(statsForSelectedYear.playerResults);
        setTeamResults(statsForSelectedYear.teamResults);
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
            <DropdownButton
                variant="secondary"
                onSelect={changeStatsYear}
                id="dropdown-basic-button"
                title={year + ' Stats'}
                style={{
                    display: 'flex',
                    justifyContent: 'left',
                    margin: '0.5rem 0 0 0.5rem',
                }}
            >
                <Dropdown.Item href="#stats2022">2022</Dropdown.Item>
            </DropdownButton>
            <div id="stat" className="page-component">
                {showRecords && (
                    <Records
                        teamStats={teamResults}
                        playersStats={playerResults}
                    />
                )}
                {showTeamStats && (
                    <TeamStats
                        teamStats={teamResults}
                        playersStats={playerResults}
                    />
                )}
                {showPlayerStats && (
                    <PlayerStats playersStats={playerResults} />
                )}
            </div>
        </div>
    );
}

export default Stats;
