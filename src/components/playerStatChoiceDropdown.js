import { Dropdown, DropdownButton } from 'react-bootstrap';
import config from '../config';

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

    // TODO change to tick box?
    return (
        <div style={{ padding: '0.2rem' }}>
            <DropdownButton
                variant="light"
                onSelect={toggleAllStats}
                id="all-stats-select-dropdown-button"
                title={dropDownText}
                style={{
                    display: 'flex',
                    justifyContent: 'left',
                }}
            >
                <Dropdown.Item
                    id="team-stats-selector"
                    style={{ color: 'black', backgroundColor: 'white' }}
                    eventKey={config.teamNames.short + 'Stats'}
                >
                    {config.teamNames.short} Stats
                </Dropdown.Item>
                <Dropdown.Item
                    id="all-stats-selector"
                    style={{ color: 'black', backgroundColor: 'white' }}
                    eventKey="All Team Stats"
                >
                    All Team Stats
                </Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default PlayerStatChoiceDropdown;
