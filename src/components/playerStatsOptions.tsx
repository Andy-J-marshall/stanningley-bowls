import { useState } from 'react';
import {
    Form,
    InputGroup,
    Row,
    Col,
    DropdownButton,
    Dropdown,
} from 'react-bootstrap';
import { PlayerStatsOptionsProps } from '../types/interfaces';
import { capitalizeText } from '../helpers/utils';

function PlayerStatsOptions(props: PlayerStatsOptionsProps) {
    const allTeamStatsCallback = props.allTeamStatsCallback;
    const allYearStatsCallback = props.allYearStatsCallback;
    const teamSpecificCallback = props.teamSpecificCallback;
    const onlySinglesCallback = props.onlySinglesCallback;
    const onlyPairsCallback = props.onlyPairsCallback;
    const onlyHomeCallback = props.onlyHomeCallback;
    const onlyAwayCallback = props.onlyAwayCallback;
    const onlyCupCallback = props.onlyCupCallback;
    const playerSearchedFor = props.playerSearchedFor;
    const teamNames = props.teamNames;

    const [allYearToggle, setAllYearToggle] = useState(false);
    const [allTeamsToggle, setAllTeamsToggle] = useState(false);
    const [singlesOnlyToggle, setSinglesOnlyToggle] = useState(false);
    const [pairsOnlyToggle, setPairsOnlyToggle] = useState(false);
    const [allGameTypesToggle, setAllGameTypesToggle] = useState(true);
    const [allVenuesToggle, setAllVenuesToggle] = useState(true);
    const [homeOnlyToggle, setHomeOnlyToggle] = useState(false);
    const [awayOnlyToggle, setAwayOnlyToggle] = useState(false);
    const [cupOnlyToggle, setCupOnlyToggle] = useState(false);
    const [disableOtherOptions, setDisableOtherOptions] = useState(false);
    const [teamDropdownTitle, setTeamDropdownTitle] = useState('Teams');

    function toggleAllTeamStats(event: React.ChangeEvent<HTMLInputElement>) {
        const allTeamStatsToggle = event.currentTarget.checked;
        setAllTeamsToggle(allTeamStatsToggle);
        allTeamStatsCallback(allTeamStatsToggle);
    }

    function toggleSpecificTeamStats(teamName: string) {
        if (!teamName || teamName === '') {
            setAllTeamsToggle(false);
            teamSpecificCallback('');
            setDisableOtherOptions(false);
            setTeamDropdownTitle('Teams');
        } else {
            setTeamDropdownTitle(capitalizeText([teamName]));
            teamSpecificCallback(teamName);

            setAllGameTypesToggle(true);
            setAllVenuesToggle(true);
            setDisableOtherOptions(true);

            // TODO not necessarily be false?
            setAllYearToggle(false);
            allYearStatsCallback(false);

            setAllTeamsToggle(false);
            allTeamStatsCallback(false);

            setSinglesOnlyToggle(false);
            onlySinglesCallback(false);

            setPairsOnlyToggle(false);
            onlyPairsCallback(false);

            setHomeOnlyToggle(false);
            onlyHomeCallback(false);

            setAwayOnlyToggle(false);
            onlyAwayCallback(false);

            setCupOnlyToggle(false);
            onlyCupCallback(false);
        }
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
        // TODO sort out display of options
        !playerSearchedFor && (
            <div className="stats-filters center">
                <Form>
                    <Form.Group className="mb-2" controlId="searchOptions">
                        <Row className="g-4 align-items-start">
                            <Col xs={12} md={3}>
                                <h6>OPTIONS</h6>
                                <Form.Check
                                    inline
                                    key={crypto.randomUUID()}
                                    id="#all-stats-select-switch"
                                    onChange={toggleAllTeamStats}
                                    type="switch"
                                    label="Include other teams"
                                    checked={allTeamsToggle}
                                    disabled={disableOtherOptions}
                                />
                                {/* TODO could possibly show all year options? */}
                                <Form.Check
                                    inline
                                    key={crypto.randomUUID()}
                                    id="#all-years-select-switch"
                                    onChange={toggleAllYearStats}
                                    type="switch"
                                    label="Combine all years"
                                    checked={allYearToggle}
                                    disabled={disableOtherOptions}
                                />
                            </Col>
                            <Col xs={12} md={3}>
                                <h6>TEAMS</h6>
                                <DropdownButton
                                    size="sm" // TODO or lg?
                                    // variant="Secondary" // TODO or secondary?
                                    id="team-select-dropdown"
                                    title={teamDropdownTitle}
                                >
                                    {teamNames.map((teamName, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            id={'#team-option-' + index}
                                            onClick={() =>
                                                toggleSpecificTeamStats(
                                                    teamName
                                                )
                                            }
                                        >
                                            {/* TODO also need to capitalise the (b)? */}
                                            {capitalizeText([teamName])}
                                        </Dropdown.Item>
                                    ))}
                                    <Dropdown.Item
                                        id="#team-option-all"
                                        onClick={() =>
                                            toggleSpecificTeamStats('')
                                        }
                                    >
                                        All Teams
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Col>
                            <Col xs={12} md={3}>
                                <h6>GAME TYPES</h6>
                                <InputGroup>
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#all-matches-radio"
                                        onChange={toggleAllMatches}
                                        name="gameTypeOptions"
                                        type="radio"
                                        label="All"
                                        checked={allGameTypesToggle}
                                        disabled={disableOtherOptions}
                                    />
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#only-singles-radio"
                                        onChange={toggleSinglesOnlyMatches}
                                        name="gameTypeOptions"
                                        type="radio"
                                        label="Singles"
                                        checked={singlesOnlyToggle}
                                        disabled={disableOtherOptions}
                                    />
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#only-pairs-radio"
                                        onChange={togglePairsOnlyMatches}
                                        name="gameTypeOptions"
                                        type="radio"
                                        label="Pairs"
                                        checked={pairsOnlyToggle}
                                        disabled={disableOtherOptions}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={12} md={3}>
                                <h6>VENUE</h6>
                                <InputGroup>
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#all-venues-radio"
                                        onChange={toggleAllVenuesMatches}
                                        name="gameVenueOptions"
                                        type="radio"
                                        label="All"
                                        checked={allVenuesToggle}
                                        disabled={disableOtherOptions}
                                    />
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#only-home-radio"
                                        onChange={toggleHomeOnlyMatches}
                                        name="gameVenueOptions"
                                        type="radio"
                                        label="Home"
                                        checked={homeOnlyToggle}
                                        disabled={disableOtherOptions}
                                    />
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#only-away-radio"
                                        onChange={toggleAwayOnlyMatches}
                                        name="gameVenueOptions"
                                        type="radio"
                                        label="Away"
                                        checked={awayOnlyToggle}
                                        disabled={disableOtherOptions}
                                    />
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#only-cup-radio"
                                        onChange={toggleCupOnlyMatches}
                                        name="gameVenueOptions"
                                        type="radio"
                                        label="Cup"
                                        checked={cupOnlyToggle}
                                        disabled={disableOtherOptions}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </div>
        )
    );
}

export default PlayerStatsOptions;
