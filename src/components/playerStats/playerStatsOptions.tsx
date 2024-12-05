import { useState } from 'react';
import {
    Form,
    InputGroup,
    Row,
    Col,
    DropdownButton,
    Dropdown,
} from 'react-bootstrap';
import { config } from '../../config';
import { PlayerStatsOptionsProps } from '../../types/interfaces';
import { capitalizeText, formatTeamName } from '../../helpers/utils';

function PlayerStatsOptions(props: PlayerStatsOptionsProps) {
    const allClubsStatsCallback = props.allClubsStatsCallback;
    const allYearStatsCallback = props.allYearStatsCallback;
    const teamSpecificCallback = props.teamSpecificCallback;
    const clubSpecificCallback = props.clubSpecificCallback;
    const onlySinglesCallback = props.onlySinglesCallback;
    const onlyPairsCallback = props.onlyPairsCallback;
    const onlyHomeCallback = props.onlyHomeCallback;
    const onlyAwayCallback = props.onlyAwayCallback;
    const onlyCupCallback = props.onlyCupCallback;
    const searchedPlayerName = props.searchedPlayerName;
    const teamNames = props.teamNames;

    const defaultTeamDropdownTitle = 'All Teams';

    const [allYearToggle, setAllYearToggle] = useState(false);
    const [allClubsToggle, setAllClubsToggle] = useState(false);
    const [singlesOnlyToggle, setSinglesOnlyToggle] = useState(false);
    const [pairsOnlyToggle, setPairsOnlyToggle] = useState(false);
    const [allGameTypesToggle, setAllGameTypesToggle] = useState(true);
    const [allVenuesToggle, setAllVenuesToggle] = useState(true);
    const [homeOnlyToggle, setHomeOnlyToggle] = useState(false);
    const [awayOnlyToggle, setAwayOnlyToggle] = useState(false);
    const [cupOnlyToggle, setCupOnlyToggle] = useState(false);
    const [disableOtherOptions, setDisableOtherOptions] = useState(false);
    const [disableTeamDropdown, setDisableTeamDropdown] = useState(false);
    const [teamDropdownTitle, setTeamDropdownTitle] = useState(
        defaultTeamDropdownTitle
    );
    const [clubDropdownTitle, setClubDropdownTitle] = useState(
        config.teamNames.shortName
    );

    function toggleAllYearStats(event: React.ChangeEvent<HTMLInputElement>) {
        const allYearStatsToggle = event.currentTarget.checked;
        setAllYearToggle(allYearStatsToggle);
        allYearStatsCallback(allYearStatsToggle);
    }

    function selectSpecificTeamStats(teamName: string) {
        if (!teamName || teamName === '') {
            setTeamDropdownTitle(defaultTeamDropdownTitle);
            teamSpecificCallback('');
            setDisableOtherOptions(false);
        } else {
            setTeamDropdownTitle(formatTeamName(teamName));
            teamSpecificCallback(teamName);

            setAllGameTypesToggle(true);
            setAllVenuesToggle(true);
            setDisableOtherOptions(true);

            setAllClubsToggle(false);
            allClubsStatsCallback(false);

            singles(false);
            pairs(false);
            home(false);
            home(false);
            cup(false);
        }
    }

    function selectClubStats(clubName: string) {
        if (!clubName || clubName === '') {
            setClubDropdownTitle('All Clubs');
            clubSpecificCallback('');

            setAllClubsToggle(true);
            allClubsStatsCallback(true);

            setTeamDropdownTitle(defaultTeamDropdownTitle);
            teamSpecificCallback('');

            setDisableTeamDropdown(true);
        } else {
            setClubDropdownTitle(capitalizeText([clubName]));
            clubSpecificCallback(clubName);

            setAllClubsToggle(false);
            allClubsStatsCallback(false);

            setDisableTeamDropdown(false);
            setDisableOtherOptions(false);
        }
    }

    function toggleAllMatchTypes() {
        setAllGameTypesToggle(true);

        singles(false);
        pairs(false);
    }

    function toggleSinglesOnly() {
        setAllGameTypesToggle(false);
        pairs(false);

        singles(true);
    }

    function togglePairsOnly() {
        setAllGameTypesToggle(false);
        singles(false);

        pairs(true);
    }

    function toggleAllVenues() {
        setAllVenuesToggle(true);

        home(false);
        away(false);
        cup(false);
    }

    function toggleHomeOnly() {
        setAllVenuesToggle(false);

        home(true);
        away(false);
        cup(false);
    }

    function toggleAwayOnlyMatches() {
        setAllVenuesToggle(false);

        home(false);
        away(true);
        cup(false);
    }

    function toggleCupOnlyMatches() {
        setAllVenuesToggle(false);

        home(false);
        away(false);
        cup(true);
    }

    function singles(flag: boolean) {
        setSinglesOnlyToggle(flag);
        onlySinglesCallback(flag);
    }

    function pairs(flag: boolean) {
        setPairsOnlyToggle(flag);
        onlyPairsCallback(flag);
    }

    function home(flag: boolean) {
        setHomeOnlyToggle(flag);
        onlyHomeCallback(flag);
    }

    function away(flag: boolean) {
        setAwayOnlyToggle(flag);
        onlyAwayCallback(flag);
    }

    function cup(flag: boolean) {
        setCupOnlyToggle(flag);
        onlyCupCallback(flag);
    }

    return (
        !searchedPlayerName && (
            <div className="stats-filters center">
                <Form>
                    <Form.Group className="mb-2" controlId="searchOptions">
                        <Row className="g-4 align-items-start">
                            <Col xs={12} md={6} lg={3}>
                                <h6>OPTIONS</h6>
                                <Form.Check
                                    inline
                                    key={crypto.randomUUID()}
                                    id="#all-years-select-switch"
                                    onChange={toggleAllYearStats}
                                    type="switch"
                                    label="Combine all years"
                                    checked={allYearToggle}
                                />
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                <h6>CLUBS & TEAMS</h6>
                                <InputGroup>
                                    <DropdownButton
                                        drop="up"
                                        size="sm"
                                        variant="light"
                                        id="club-select-dropdown"
                                        title={clubDropdownTitle}
                                    >
                                        {config.clubsForPlayersStats.map(
                                            (club, index) => (
                                                <Dropdown.Item
                                                    key={index}
                                                    id={'#club-option-' + club}
                                                    onClick={() =>
                                                        selectClubStats(club)
                                                    }
                                                >
                                                    {capitalizeText([club])}
                                                </Dropdown.Item>
                                            )
                                        )}
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            id="#club-option-all"
                                            onClick={() => selectClubStats('')}
                                        >
                                            All Clubs
                                        </Dropdown.Item>
                                    </DropdownButton>
                                    <div style={{ padding: '0 0.3rem' }}></div>
                                    <DropdownButton
                                        drop="up"
                                        size="sm"
                                        variant="light"
                                        id="team-select-dropdown"
                                        title={teamDropdownTitle}
                                        disabled={disableTeamDropdown}
                                    >
                                        {teamNames.map((teamName, index) => (
                                            <Dropdown.Item
                                                key={index}
                                                id={'#team-option-' + index}
                                                onClick={() =>
                                                    selectSpecificTeamStats(
                                                        teamName
                                                    )
                                                }
                                            >
                                                {formatTeamName(teamName)}
                                            </Dropdown.Item>
                                        ))}
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            id="#team-option-all"
                                            onClick={() =>
                                                selectSpecificTeamStats('')
                                            }
                                        >
                                            {defaultTeamDropdownTitle}
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </InputGroup>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                <h6>GAME TYPE</h6>
                                <InputGroup>
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#all-matches-radio"
                                        onChange={toggleAllMatchTypes}
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
                                        onChange={toggleSinglesOnly}
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
                                        onChange={togglePairsOnly}
                                        name="gameTypeOptions"
                                        type="radio"
                                        label="Pairs"
                                        checked={pairsOnlyToggle}
                                        disabled={disableOtherOptions}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                <h6>VENUE</h6>
                                <InputGroup>
                                    <Form.Check
                                        inline
                                        key={crypto.randomUUID()}
                                        id="#all-venues-radio"
                                        onChange={toggleAllVenues}
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
                                        onChange={toggleHomeOnly}
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
