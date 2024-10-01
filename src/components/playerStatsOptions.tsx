import { useState, useEffect } from 'react';
import { Form, InputGroup, Row, Col, Accordion } from 'react-bootstrap';
import { PlayerStatsOptionsProps } from '../types/interfaces';

function PlayerStatsOptions(props: PlayerStatsOptionsProps) {
    const allTeamStatsCallback = props.allTeamStatsCallback;
    const allYearStatsCallback = props.allYearStatsCallback;
    const onlySinglesCallback = props.onlySinglesCallback;
    const onlyPairsCallback = props.onlyPairsCallback;
    const playerSearchedFor = props.playerSearchedFor;

    const [key, setKey] = useState(playerSearchedFor);
    const [allYearToggle, setAllYearToggle] = useState(false);
    const [allTeamsToggle, setAllTeamsToggle] = useState(false);
    const [singlesOnlyToggle, setSinglesOnlyToggle] = useState(false);
    const [pairsOnlyToggle, setPairsOnlyToggle] = useState(false);
    const [allGameTypesToggle, setAllGameTypesToggle] = useState(true);

    useEffect(() => {
        if (playerSearchedFor !== key) {
            setKey(playerSearchedFor);
        }
    });
    function toggleAllTeamStats(event: React.ChangeEvent<HTMLInputElement>) {
        const allTeamStatsToggle = event.currentTarget.checked;
        setAllTeamsToggle(allTeamStatsToggle);
        allTeamStatsCallback(allTeamStatsToggle);
    }

    function toggleSinglesOnlyMatches() {
        setAllGameTypesToggle(false);

        setPairsOnlyToggle(false);
        onlyPairsCallback(false);

        setSinglesOnlyToggle(true);
        onlySinglesCallback(true);
    }

    function togglePairsOnlyMatches() {
        setAllGameTypesToggle(false);

        setSinglesOnlyToggle(false);
        onlySinglesCallback(false);

        setPairsOnlyToggle(true);
        onlyPairsCallback(true);
    }

    function toggleAllMatches() {
        setAllGameTypesToggle(true);

        setSinglesOnlyToggle(false);
        onlySinglesCallback(false);

        setPairsOnlyToggle(false);
        onlyPairsCallback(false);
    }

    function toggleAllYearStats(event: React.ChangeEvent<HTMLInputElement>) {
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
                                    className="mb-2"
                                    controlId="searchOptions"
                                >
                                    <Row>
                                        <Col className="mb-3">
                                            <Form.Check
                                                key={key}
                                                id="#all-stats-select-checkbox"
                                                onChange={toggleAllTeamStats}
                                                type="checkbox"
                                                label="Include stats from other teams"
                                                checked={allTeamsToggle}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Check
                                                key={key}
                                                id="#all-years-select-checkbox"
                                                onChange={toggleAllYearStats}
                                                type="checkbox"
                                                label="Stats since 2013"
                                                checked={allYearToggle}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h6>GAME TYPES</h6>
                                        <InputGroup>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#all-matches-radio"
                                                    onChange={toggleAllMatches}
                                                    name="gameTypeOptions"
                                                    type="radio"
                                                    label="All"
                                                    checked={allGameTypesToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#only-singles-radio"
                                                    onChange={
                                                        toggleSinglesOnlyMatches
                                                    }
                                                    name="gameTypeOptions"
                                                    type="radio"
                                                    label="Singles"
                                                    checked={singlesOnlyToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#only-pairs-radio"
                                                    onChange={
                                                        togglePairsOnlyMatches
                                                    }
                                                    name="gameTypeOptions"
                                                    type="radio"
                                                    label="Pairs"
                                                    checked={pairsOnlyToggle}
                                                />
                                            </Col>
                                        </InputGroup>
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
