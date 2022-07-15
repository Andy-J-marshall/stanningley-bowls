import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    Navbar,
    Nav,
    Container,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap';
import PlayerStats from './playerStats';
import bowlsStats2022 from '../data/bowlsStats2022.json';

const currentYear = new Date().getFullYear();
let startYear = currentYear;
const url = window.location.href.toLowerCase();
console.log(url);
if (url.includes('#20')) {
    const yearFromUrl = url.split('/stats#')[1];
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

// TODO test the year works
function Stats() {
    const [year, setYear] = useState(startYear);
    const [playerResults, setPlayerResults] = useState(
        defaultStats.playerResults
    );
    const [updatedDate, setUpdatedDate] = useState(defaultStats.lastUpdated);

    function changeStatsYear(event) {
        let year = event.replace('#', '').toString();
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
        setUpdatedDate(statsForSelectedYear.lastUpdated);
    }

    return (
        <div id="stats" className="page-component">
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
                        activeKey="/stats/player"
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
            <DropdownButton
                variant="secondary"
                onSelect={changeStatsYear}
                id="dropdown-basic-button"
                title={year + ' Stats'}
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                    margin: '0.5rem 0.5rem 0 0',
                }}
            >
                <Dropdown.Item href="#2022">2022</Dropdown.Item>
            </DropdownButton>
            {!url.includes('/stats/records') &&
                !url.includes('/player') &&
                !url.includes('/team') && (
                    <PlayerStats playersStats={playerResults} />
                )}
            <Outlet />
            <p>Last Updated: {updatedDate}</p>
        </div>
    );
}

export default Stats;
