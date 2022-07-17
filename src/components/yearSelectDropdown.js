import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function YearSelectDropdown(props) {
    const statsCallback = props.statsCallback;

    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);

    function changeStatsYear(event) {
        const year = event.replace('#', '').toString();
        setYear(year);
        statsCallback(year);
    }

    return (
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
        </DropdownButton>
    );
}

export default YearSelectDropdown;
