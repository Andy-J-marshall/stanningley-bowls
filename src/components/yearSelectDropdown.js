import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function YearSelectDropdown(props) {
    const statsCallback = props.statsCallback;
    const yearToDisplay = props.yearToDisplay;
    const showOldYears = props.showOldYears;

    const [year, setYear] = useState(yearToDisplay);

    function changeStatsYear(event) {
        const year = event.replace('#', '').toString();
        setYear(year);
        statsCallback(year);
    }

    return (
        <div style={{ padding: '0.2rem' }}>
            <DropdownButton
                variant="light"
                onSelect={changeStatsYear}
                id="year-select-dropdown-button"
                title={year + ' Stats'}
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                }}
            >
                {/* Future years will need to be added here */}
                <div id="full-stat-years-options">
                    <Dropdown.Item id="option2024" eventKey="2024">
                        2024
                    </Dropdown.Item>
                    <Dropdown.Item id="option2023" eventKey="2023">
                        2023
                    </Dropdown.Item>
                    <Dropdown.Item id="option2022" eventKey="2022">
                        2022
                    </Dropdown.Item>
                    <Dropdown.Item id="option2021" eventKey="2021">
                        2021
                    </Dropdown.Item>
                    <Dropdown.Item id="option2019" eventKey="2019">
                        2019
                    </Dropdown.Item>
                    <Dropdown.Item id="option2018" eventKey="2018">
                        2018
                    </Dropdown.Item>
                    <Dropdown.Item id="option2017" eventKey="2017">
                        2017
                    </Dropdown.Item>
                    <Dropdown.Item id="option2016" eventKey="2016">
                        2016
                    </Dropdown.Item>
                    <Dropdown.Item id="option2015" eventKey="2015">
                        2015
                    </Dropdown.Item>
                    <Dropdown.Item id="option2014" eventKey="2014">
                        2014
                    </Dropdown.Item>
                </div>
                {/* These years don't have team stats or results */}
                {showOldYears && (
                    <div id="legacy-stat-years-options">
                        <Dropdown.Item id="option2013" eventKey="2013">
                            2013
                        </Dropdown.Item>
                    </div>
                )}
            </DropdownButton>
        </div>
    );
}

export default YearSelectDropdown;
