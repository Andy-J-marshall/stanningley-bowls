import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function YearSelectDropdown(props) {
    const startYear = props.startYear;
    const allYearStats = props.allYearStats;
    const updateDateCallback = props.setUpdateDate;
    const playerResultsCallback = props.setPlayerResults;
    const teamResultsCallback = props.setTeamResults;

    const [year, setYear] = useState(startYear);

    function changeStatsYear(event) {
        let year = event.replace('#', '').toString();
        let statsForSelectedYear;
        switch (year) {
            case '2022':
                statsForSelectedYear = allYearStats['year2022'];
                break;
            default:
                statsForSelectedYear = allYearStats[`year${startYear}`];
                break;
        }
        setYear(year);
        playerResultsCallback(statsForSelectedYear.playerResults);
        teamResultsCallback(statsForSelectedYear.teamResults);
        updateDateCallback(statsForSelectedYear.lastUpdated);
    }

    return (
        <DropdownButton
            variant="secondary"
            onSelect={changeStatsYear}
            id="dropdown-basic-button"
            title={year + ' Stats'}
            style={{
                display: 'flex',
                justifyContent: 'right',
            }}
        >
            <Dropdown.Item href="#2022">2022</Dropdown.Item>
        </DropdownButton>
    );
}

export default YearSelectDropdown;
