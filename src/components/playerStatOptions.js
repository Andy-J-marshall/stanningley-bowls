import { Form, Row, Col, Accordion } from 'react-bootstrap';

function PlayerStatOptions(props) {
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
                margin: '0.8rem',
                textAlign: 'left',
                fontSize: '15px',
            }}
        >
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>OPTIONS</Accordion.Header>
                    <Accordion.Body>
                        <Form style={{ display: 'inline-block' }}>
                            <Form.Group
                                className="mb-3"
                                controlId="searchOptions"
                            >
                                {/* TODO this displays when searching for specific player? */}
                                <Row>
                                    <Col>
                                        <Form.Check
                                            id="#all-stats-select-checkbox"
                                            onClick={toggleAllTeamStats}
                                            type="checkbox"
                                            label="Include stats whilst playing for other teams"
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            id="#all-years-select-checkbox"
                                            onClick={toggleAllYearStats}
                                            type="checkbox"
                                            label="Show stats summary for all seasons since 2022"
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default PlayerStatOptions;
