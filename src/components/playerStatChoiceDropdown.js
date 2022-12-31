import { Form } from 'react-bootstrap';

function PlayerStatChoiceDropdown(props) {
    const allTeamStatsCallback = props.allTeamStatsCallback;
    const allYearStatsCallback = props.allYearStatsCallback;

    function toggleAllTeamStats(event) {
        const allTeamStatsToggle = event.currentTarget.checked;
        allTeamStatsCallback(allTeamStatsToggle);
    }

    function toggleAllYearStats(event) {
        const allYearStatsToggle = event.currentTarget.checked;
        allYearStatsCallback(allYearStatsToggle);
    }

    return (
        <div
            style={{
                marginLeft: '1.5rem',
                textAlign: 'left',
                fontSize: '15px'
            }}
        >
            <Form>
                {/* TODO left align? Show on same row? */}
                <Form.Group className="mb-3" controlId="searchOptions">
                    <Form.Check
                        onClick={toggleAllTeamStats}
                        type="checkbox"
                        label="Include Stats For Other Teams?"
                    />
                    <Form.Check
                        onClick={toggleAllYearStats}
                        type="checkbox"
                        label="Show All Stats Since 2022"
                    />
                    {/* TODO this displays when searching for specific player? */}
                </Form.Group>
            </Form>
        </div>
    );
}

export default PlayerStatChoiceDropdown;
