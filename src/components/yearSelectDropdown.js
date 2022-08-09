import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function YearSelectDropdown(props) {
    const statsCallback = props.statsCallback;
    const yearsToDisplay = props.yearsToDisplay;

    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);

    function changeStatsYear(event) {
        const year = event.replace('#', '').toString();
        setYear(year);
        statsCallback(year);
    }

    return (
        <div id="yearSelectDropDown">
            {yearsToDisplay > 1 && (
                <DropdownButton
                    variant="light"
                    onSelect={changeStatsYear}
                    id="dropdown-basic-button"
                    title={year + ' Stats'}
                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                    }}
                >
                    <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
                    {/* Future years will need to be added here */}
                </DropdownButton>
            )}
        </div>
    );
}

export default YearSelectDropdown;
