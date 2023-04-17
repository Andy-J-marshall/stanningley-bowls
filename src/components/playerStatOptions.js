import { useState, useEffect } from 'react';
import { Form, Row, Col, Accordion } from 'react-bootstrap';

function PlayerStatOptions(props) {
    const allTeamStatsCallback = props.allTeamStatsCallback;
    const allYearStatsCallback = props.allYearStatsCallback;
    const onlySinglesCallback = props.onlySinglesCallback;
    const playerSearchedFor = props.playerSearchedFor;

    const [key, setKey] = useState(playerSearchedFor);

    useEffect(() => {
        if (playerSearchedFor !== key) {
            setKey(playerSearchedFor);
        }
    });

    function toggleAllTeamStats(event) {
        const allTeamStatsToggle = event.currentTarget.checked;
        allTeamStatsCallback(allTeamStatsToggle);
    }

    function toggleSinglesOnlyMatches(event) {
        const singlesToggle = event.currentTarget.checked;
        onlySinglesCallback(singlesToggle);
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
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>OPTIONS</Accordion.Header>
                    <Accordion.Body>
                        <Form style={{ display: 'inline-block' }}>
                            <Form.Group
                                className="mb-3"
                                controlId="searchOptions"
                            >
                                <Row>
                                    <Col>
                                        <Form.Check
                                            key={key}
                                            id="#all-stats-select-checkbox"
                                            onClick={toggleAllTeamStats}
                                            type="checkbox"
                                            label="Include stats whilst playing for other teams"
                                        />
                                    </Col>
                                    {!playerSearchedFor && (
                                        <Col>
                                            <Form.Check
                                                key={key}
                                                id="#only-singles-checkbox"
                                                onClick={
                                                    toggleSinglesOnlyMatches
                                                }
                                                type="checkbox"
                                                label="Only show stats for singles games"
                                            />
                                        </Col>
                                    )}
                                    {!playerSearchedFor && (
                                        <Col>
                                            <Form.Check
                                                key={key}
                                                id="#all-years-select-checkbox"
                                                onClick={toggleAllYearStats}
                                                type="checkbox"
                                                label="Show stats summary for all seasons since 2022"
                                            />
                                        </Col>
                                    )}
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
