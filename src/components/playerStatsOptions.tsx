import { useState } from 'react';
import { Form, InputGroup, Row, Col, Accordion } from 'react-bootstrap';
import { PlayerStatsOptionsProps } from '../types/interfaces';

function PlayerStatsOptions(props: PlayerStatsOptionsProps) {
    const allTeamStatsCallback = props.allTeamStatsCallback;
    const allYearStatsCallback = props.allYearStatsCallback;
    const onlySinglesCallback = props.onlySinglesCallback;
    const onlyPairsCallback = props.onlyPairsCallback;
    const onlyHomeCallback = props.onlyHomeCallback;
    const onlyAwayCallback = props.onlyAwayCallback;
    const onlyCupCallback = props.onlyCupCallback;
    const playerSearchedFor = props.playerSearchedFor;

    const [allYearToggle, setAllYearToggle] = useState(false);
    const [allTeamsToggle, setAllTeamsToggle] = useState(false);
    const [singlesOnlyToggle, setSinglesOnlyToggle] = useState(false);
    const [pairsOnlyToggle, setPairsOnlyToggle] = useState(false);
    const [allGameTypesToggle, setAllGameTypesToggle] = useState(true);
    const [allVenuesToggle, setAllVenuesToggle] = useState(true);
    const [homeOnlyToggle, setHomeOnlyToggle] = useState(false);
    const [awayOnlyToggle, setAwayOnlyToggle] = useState(false);
    const [cupOnlyToggle, setCupOnlyToggle] = useState(false);

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

    function toggleAllVenuesMatches() {
        setAllVenuesToggle(true);

        setHomeOnlyToggle(false);
        onlyHomeCallback(false);

        setAwayOnlyToggle(false);
        onlyAwayCallback(false);

        setCupOnlyToggle(false);
        onlyCupCallback(false);
    }

    function toggleHomeOnlyMatches() {
        setAllVenuesToggle(false);

        setHomeOnlyToggle(true);
        onlyHomeCallback(true);

        setAwayOnlyToggle(false);
        onlyAwayCallback(false);

        setCupOnlyToggle(false);
        onlyCupCallback(false);
    }

    function toggleAwayOnlyMatches() {
        setAllVenuesToggle(false);

        setHomeOnlyToggle(false);
        onlyHomeCallback(false);

        setAwayOnlyToggle(true);
        onlyAwayCallback(true);

        setCupOnlyToggle(false);
        onlyCupCallback(false);
    }

    function toggleCupOnlyMatches() {
        setAllVenuesToggle(false);

        setHomeOnlyToggle(false);
        onlyHomeCallback(false);

        setAwayOnlyToggle(false);
        onlyAwayCallback(false);

        setCupOnlyToggle(true);
        onlyCupCallback(true);
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
            {/* TODO improve layout */}
            {!playerSearchedFor && (
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>FILTERS</Accordion.Header>
                        <Accordion.Body>
                            {/* TODO remove */}
                            {/* <Form style={{ display: 'inline-block' }}> */}
                            <Form>
                                <Form.Group
                                    className="mb-2"
                                    controlId="searchOptions"
                                >
                                    {/* TODO */}
                                    {/* flex-wrap: wrap; This is causing an issue */}
                                    {/* box-sizing: border-box; Mabe this too? */}
                                    {/* TODO try .form-check padding */}
                                    <Row className="g-4 align-items-start">
                                        <Col xs={12} sm={6} lg={3}>
                                            <h6>TEAMS</h6>
                                            <Form.Check
                                                key={crypto.randomUUID()}
                                                id="#all-stats-select-switch"
                                                onChange={toggleAllTeamStats}
                                                type="switch"
                                                label="Include other team stats"
                                                checked={allTeamsToggle}
                                            />
                                        </Col>
                                        <Col xs={12} sm={6} lg={3}>
                                            <h6>YEARS</h6>
                                            <Form.Check
                                                key={crypto.randomUUID()}
                                                id="#all-years-select-switch"
                                                onChange={toggleAllYearStats}
                                                type="switch"
                                                label="Stats since 2013"
                                                checked={allYearToggle}
                                            />
                                        </Col>
                                        <Col xs={12} sm={6} lg={3}>
                                            <h6>GAME TYPES</h6>
                                            <InputGroup>
                                                <Form.Check
                                                    key={crypto.randomUUID()}
                                                    id="#all-matches-radio"
                                                    onChange={toggleAllMatches}
                                                    name="gameTypeOptions"
                                                    type="radio"
                                                    label="All"
                                                    checked={allGameTypesToggle}
                                                />
                                                <Form.Check
                                                    key={crypto.randomUUID()}
                                                    id="#only-singles-radio"
                                                    onChange={
                                                        toggleSinglesOnlyMatches
                                                    }
                                                    name="gameTypeOptions"
                                                    type="radio"
                                                    label="Singles"
                                                    checked={singlesOnlyToggle}
                                                />
                                                <Form.Check
                                                    key={crypto.randomUUID()}
                                                    id="#only-pairs-radio"
                                                    onChange={
                                                        togglePairsOnlyMatches
                                                    }
                                                    name="gameTypeOptions"
                                                    type="radio"
                                                    label="Pairs"
                                                    checked={pairsOnlyToggle}
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col xs={12} sm={6} lg={3}>
                                            <h6>VENUE</h6>
                                            <InputGroup>
                                                <Form.Check
                                                    key={crypto.randomUUID()}
                                                    id="#all-venues-radio"
                                                    onChange={
                                                        toggleAllVenuesMatches
                                                    }
                                                    name="gameVenueOptions"
                                                    type="radio"
                                                    label="All"
                                                    checked={allVenuesToggle}
                                                />
                                                <Form.Check
                                                    key={crypto.randomUUID()}
                                                    id="#only-home-radio"
                                                    onChange={
                                                        toggleHomeOnlyMatches
                                                    }
                                                    name="gameVenueOptions"
                                                    type="radio"
                                                    label="Home"
                                                    checked={homeOnlyToggle}
                                                />
                                                <Form.Check
                                                    key={crypto.randomUUID()}
                                                    id="#only-away-radio"
                                                    onChange={
                                                        toggleAwayOnlyMatches
                                                    }
                                                    name="gameVenueOptions"
                                                    type="radio"
                                                    label="Away"
                                                    checked={awayOnlyToggle}
                                                />
                                                <Form.Check
                                                    key={crypto.randomUUID()}
                                                    id="#only-cup-radio"
                                                    onChange={
                                                        toggleCupOnlyMatches
                                                    }
                                                    name="gameVenueOptions"
                                                    type="radio"
                                                    label="Cup"
                                                    checked={cupOnlyToggle}
                                                />
                                            </InputGroup>
                                        </Col>
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
