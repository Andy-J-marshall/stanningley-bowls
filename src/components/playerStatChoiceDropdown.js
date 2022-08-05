import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function PlayerStatChoiceDropdown(props) {
    const statsCallback = props.statsCallback;

    const [currentOption, setCurrentOption] = useState('Stanningley');

    function toggleAllStats(event) {
        const option = event.replace('#', '').toString();
        let allStatsToggle;
        if (option.toLowerCase().includes('all')) {
            allStatsToggle = true;
        } else {
            allStatsToggle = false;
        }
        setCurrentOption(option);
        statsCallback(allStatsToggle);
    }

    // TODO all stats toggle is adding 1 to things e.g. games played?

    return (
        <div id="allStatsSelectDropDown">
            <DropdownButton
                variant="light"
                onSelect={toggleAllStats}
                id="dropdown-basic-button"
                title={currentOption + ' Stats'}
                style={{
                    display: 'flex',
                    justifyContent: 'left',
                }}
            >
                <Dropdown.Item eventKey="Stanningley">
                    Stanningley
                </Dropdown.Item>
                <Dropdown.Item eventKey="All Teams">All Teams</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default PlayerStatChoiceDropdown;
