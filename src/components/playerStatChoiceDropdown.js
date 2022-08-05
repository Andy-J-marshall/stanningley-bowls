import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function PlayerStatChoiceDropdown(props) {
    const statsCallback = props.statsCallback;

    const [allStats, setAllStats] = useState(true);
    const [currentOption, setCurrentOption] = useState('Stanningley Stats');

    function toggleAllStats(event) {
        const allStatsToggle = event.replace('#', '').toString();
        if (allStatsToggle.toLowerCase() === 'all') {
            setAllStats(false);
        } else {
            setAllStats(true);
        }
        setCurrentOption(allStatsToggle);
        statsCallback(allStatsToggle);
    }

    return (
        <div>
            <DropdownButton
                variant="light"
                onSelect={toggleAllStats}
                id="dropdown-basic-button"
                title={currentOption}
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                }}
            >
                <Dropdown.Item eventKey="Stanningley">
                    Stanningley
                </Dropdown.Item>
                <Dropdown.Item eventKey="All">All</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default PlayerStatChoiceDropdown;
