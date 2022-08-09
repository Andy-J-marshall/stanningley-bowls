import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function PlayerStatChoiceDropdown(props) {
    const statsCallback = props.statsCallback;
    const dropDownText = props.dropDownText;

    function toggleAllStats(event) {
        const option = event.replace('#', '').toString();
        let allStatsToggle;
        if (option.toLowerCase().includes('all')) {
            allStatsToggle = true;
        } else {
            allStatsToggle = false;
        }
        statsCallback(allStatsToggle);
    }

    return (
        <div id="allStatsSelectDropDown">
            <DropdownButton
                variant="light"
                onSelect={toggleAllStats}
                id="allStatsSelectDropDown-button"
                title={dropDownText}
                style={{
                    display: 'flex',
                    justifyContent: 'left',
                }}
            >
                <Dropdown.Item eventKey="Stanningley Stats">
                    Stanningley Stats
                </Dropdown.Item>
                <Dropdown.Item eventKey="All Team Stats">
                    All Team Stats
                </Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default PlayerStatChoiceDropdown;
