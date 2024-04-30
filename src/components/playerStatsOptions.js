import { useState, useEffect } from 'react';
import { Form, InputGroup, Row, Col, Accordion } from 'react-bootstrap';

function PlayerStatsOptions(props) {
    const allTeamStatsCallback = props.allTeamStatsCallback;
    const allYearStatsCallback = props.allYearStatsCallback;
    const onlySinglesCallback = props.onlySinglesCallback;
    const onlyPairsCallback = props.onlyPairsCallback;
    const specificDayPlayerStatsCallback = props.specificDayPlayerStatsCallback;
    const playerSearchedFor = props.playerSearchedFor;

    const [key, setKey] = useState(playerSearchedFor);
    const [allYearToggle, setAllYearToggle] = useState(false);
    const [allTeamsToggle, setAllTeamsToggle] = useState(false);
    const [singlesOnlyToggle, setSinglesOnlyToggle] = useState(false);
    const [pairsOnlyToggle, setPairsOnlyToggle] = useState(false);
    const [allGameTypesToggle, setAllGameTypesToggle] = useState(true);
    const [allDayPlayerStatsToggle, setAllDayPlayerStatsToggle] = useState(true);
    const [mondayPlayerStatsToggle, setMondayPlayerStatsToggle] = useState(false);
    const [tuesVetsPlayerStatsToggle, setTuesVetsPlayerStatsToggle] = useState(false);
    const [tuesdayPlayerStatsToggle, setTuesdayPlayerStatsToggle] = useState(false);
    const [wednesdayPlayerStatsToggle, setWednesdayPlayerStatsToggle] = useState(false);
    const [wedPairsPlayerStatsToggle, setWedPairsPlayerStatsToggle] = useState(false);
    const [thurVetsPlayerStatsToggle, setThurVetsPlayerStatsToggle] = useState(false);
    const [saturdayPlayerStatsToggle, setSaturdayPlayerStatsToggle] = useState(false);
    const [saturdayBPlayerStatsToggle, setSaturdayBPlayerStatsToggle] = useState(false);

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

    function toggleAllYearStats(event) {
        const allYearStatsToggle = event.currentTarget.checked;
        setAllYearToggle(allYearStatsToggle);
        allYearStatsCallback(allYearStatsToggle);
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

    function toggleMondayPlayedStats() {
        setMondayPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('monday combined leeds');
        
        setAllDayPlayerStatsToggle(false);
    }

    function toggleTuesVetsPlayedStats() {
        setTuesVetsPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('tuesday vets leeds');
        
        setAllDayPlayerStatsToggle(false);
    }

    function toggleTuesdayPlayedStats() {
        setTuesdayPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('tuesday leeds');
        
        setAllDayPlayerStatsToggle(false);
    }

    function toggleWednesdayPlayedStats() {
        setWednesdayPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('wednesday half holiday leeds');
        
        setAllDayPlayerStatsToggle(false);
    }

    function toggleWedPairsPlayedStats() {
        setWedPairsPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('wednesday pairs airewharfe');
        
        setAllDayPlayerStatsToggle(false);
    }

    function toggleThurVetsPlayedStats() {
        setThurVetsPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('thursday vets leeds');
        
        setAllDayPlayerStatsToggle(false);
    }

    function toggleSaturdayPlayedStats() {
        setSaturdayPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('saturday leeds');
        
        setAllDayPlayerStatsToggle(false);
    }

    function toggleSaturdayBPlayedStats() {
        setSaturdayBPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('saturday leeds (b)');
        
        setAllDayPlayerStatsToggle(false);
    }

    // TODO not fully working yet, especially when selecting a team with no stats for a particular year

    function toggleAllDaysPlayedStats() {
        setAllDayPlayerStatsToggle(true);
        specificDayPlayerStatsCallback('');

        setMondayPlayerStatsToggle(false);
        setTuesVetsPlayerStatsToggle(false);
        setTuesdayPlayerStatsToggle(false);
        setWednesdayPlayerStatsToggle(false);
        setWedPairsPlayerStatsToggle(false);
        setThurVetsPlayerStatsToggle(false);
        setSaturdayPlayerStatsToggle(false);
        setSaturdayBPlayerStatsToggle(false);
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
                                                label="Stats since 2022"
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
                                                    onChange={toggleSinglesOnlyMatches}
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
                                                    onChange={togglePairsOnlyMatches}
                                                    name="gameTypeOptions"
                                                    type="radio"
                                                    label="Pairs"
                                                    checked={pairsOnlyToggle}
                                                />
                                            </Col>
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <h6>DAYS PLAYED</h6>
                                        <InputGroup>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#all-days-players-radio"
                                                    onChange={toggleAllDaysPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="All"
                                                    checked={allDayPlayerStatsToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#monday-players-radio"
                                                    onChange={toggleMondayPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="Monday"
                                                    checked={mondayPlayerStatsToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#tues-vets-players-radio"
                                                    onChange={toggleTuesVetsPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="Tuesday Vets"
                                                    checked={tuesVetsPlayerStatsToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#tuesday-players-radio"
                                                    onChange={toggleTuesdayPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="Tuesday"
                                                    checked={tuesdayPlayerStatsToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#wednesday-players-radio"
                                                    onChange={toggleWednesdayPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="Wednesday"
                                                    checked={wednesdayPlayerStatsToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#wed-pairs-players-radio"
                                                    onChange={toggleWedPairsPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="Wednesday Pairs"
                                                    checked={wedPairsPlayerStatsToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#thur-vets-players-radio"
                                                    onChange={toggleThurVetsPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="Thursday Vets"
                                                    checked={thurVetsPlayerStatsToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#saturday-players-radio"
                                                    onChange={toggleSaturdayPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="Saturday A"
                                                    checked={saturdayPlayerStatsToggle}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    key={key}
                                                    id="#saturday-b-players-radio"
                                                    onChange={toggleSaturdayBPlayedStats}
                                                    name="dayPlayersOptions"
                                                    type="radio"
                                                    label="Saturday B"
                                                    checked={saturdayBPlayerStatsToggle}
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
