import { useState, useEffect } from 'react';
import { Form, Row, Col, Accordion } from 'react-bootstrap';

function PlayerStatsOptions(props) {
    const allTeamStatsCallback = props.allTeamStatsCallback;
    const allYearStatsCallback = props.allYearStatsCallback;
    const onlySinglesCallback = props.onlySinglesCallback;
    const playerSearchedFor = props.playerSearchedFor;

    const [key, setKey] = useState(playerSearchedFor);
    const [allYearToggle, setAllYearToggle] = useState(false);
    const [allTeamsToggle, setAllTeamsToggle] = useState(false);
    const [singlesOnlyToggle, setSinglesOnlyToggle] = useState(false);

    useEffect(() => {
        if (playerSearchedFor !== key) {
            setKey(playerSearchedFor);
        }
    });

    function toggleAllTeamStats(event) {
        const allTeamStatsToggle = event.currentTarget.checked;
        setAllTeamsToggle(allTeamStatsToggle);
        allTeamStatsCallback(allTeamStatsToggle);
    }

    function toggleSinglesOnlyMatches(event) {
        const singlesToggle = event.currentTarget.checked;
        setSinglesOnlyToggle(singlesToggle);
        onlySinglesCallback(singlesToggle);
    }

    function toggleAllYearStats(event) {
        const allYearStatsToggle = event.currentTarget.checked;
        setAllYearToggle(allYearStatsToggle);
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
            {!playerSearchedFor && (
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
                                        {!playerSearchedFor && (
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#all-stats-select-checkbox"
                                                    onChange={toggleAllTeamStats}
                                                    type="checkbox"
                                                    label="Include stats whilst playing for other teams"
                                                    checked={allTeamsToggle}
                                                />
                                            </Col>
                                        )}
                                        {!playerSearchedFor && (
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#only-singles-checkbox"
                                                    onChange={
                                                        toggleSinglesOnlyMatches
                                                    }
                                                    type="checkbox"
                                                    label="Only show stats for singles games"
                                                    checked={singlesOnlyToggle}
                                                />
                                            </Col>
                                        )}
                                        {!playerSearchedFor && (
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#all-years-select-checkbox"
                                                    onChange={toggleAllYearStats}
                                                    type="checkbox"
                                                    label="Show stats summary for all seasons since 2022"
                                                    checked={allYearToggle}
                                                />
                                            </Col>
                                        )}
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
        </div>
    );
}

export default PlayerStatsOptions;
