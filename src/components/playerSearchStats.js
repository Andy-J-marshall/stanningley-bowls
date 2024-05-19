import axios from 'axios';
import { useState, useEffect } from 'react';
import { ListGroup, Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import Players from './players';
import { returnPlayerStats } from '../helpers/playersHelper';

function PlayerSearchStats() {
    const [playerResults, setPlayerResults] = useState({});
    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [displayValidationError, setDisplayValidationError] = useState(false);
    const [playerNotFound, setPlayerNotFound] = useState(false);

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);
    });

    function getRequestToStatsEndpoint(
        playerName,
        alternativeNameSpelling,
        teamName,
        year
    ) {
        const url = 'http://localhost:3001/stats';
        const params = {
            name: playerName,
            alternativeName: alternativeNameSpelling,
            teams: teamName,
            year: year,
        };

        axios.get(url, { params }).then((response) => {
            const playerResults = response.data.playerResults;
            const stats = returnPlayerStats(playerResults, playerName);
            if (stats && stats.gamesPlayed <= 0) {
                setPlayerNotFound(true);
            } else {
                setPlayerNotFound(false);
                setPlayerResults(playerResults);
            }
        });
    }

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        setPlayerNotFound(false);

        const searchedName = event.target[0].value.toLowerCase().trim();
        setSearchedPlayerName(searchedName);

        const alternativeName = event.target[1].value.toLowerCase().trim();
        const teamName = event.target[2].value.toLowerCase().trim();

        if (searchedName && teamName) {
            setDisplayValidationError(false);
            const date = new Date();
            getRequestToStatsEndpoint(
                searchedName,
                alternativeName,
                teamName,
                date.getFullYear() // TODO give user a choice?
            );
            await delay(500);
        } else {
            setDisplayValidationError(true);
        }

        setLoading(false);
    };

    function showPlayerStats(playerName) {
        return (
            <ListGroup>
                <Players
                    key={playerName}
                    player={playerName}
                    name={playerName}
                    playersStats={playerResults}
                    showStatSummary={true}
                ></Players>
            </ListGroup>
        );
    }

    // TODO how to handle year
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div id="player-search" className="center">
            <h1>SEARCH FOR PLAYER</h1>
            <Form
                id="player-search-form"
                className="center"
                onSubmit={handleSubmit}
            >
                <InputGroup className="mb-3">
                    <Form.Control
                        id="player-name-field"
                        placeholder="e.g. Robert Smith"
                        aria-label="Player's name"
                        aria-describedby="basic-addon2"
                    />
                    <Form.Control
                        id="alternative-player-name-field"
                        placeholder="e.g. Bob Smith, Rob Smith"
                        aria-label="Player's alternative name"
                        aria-describedby="basic-addon2"
                    />
                    <Form.Control
                        id="team-name-field"
                        placeholder="e.g. Farsley, Pudsey, Bramley"
                        aria-label="Team names"
                        aria-describedby="basic-addon2"
                    />
                    <Button id="search-button" variant="light" type="submit">
                        Search
                    </Button>
                </InputGroup>
                {!loading && !searchedPlayerName && (
                    <Form.Text>
                        Enter your name, plus any alternative spellings of your
                        name and the teams you play for separated by commas
                    </Form.Text>
                )}
            </Form>

            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {/* Shows detailed stats for searched player */}
            {!loading && searchedPlayerName && !playerNotFound && (
                <div>{showPlayerStats(searchedPlayerName.toLowerCase())}</div>
            )}

            {/* TODO style this */}
            {/* Displays error message if required fields are not populated */}
            {!loading && searchedPlayerName && displayValidationError && (
                <p>Enter player and team name</p>
            )}

            {/* TODO style this */}
            {/* TODO this is briefly appearing */}
            {/* Displays error message if player not found */}
            {!loading &&
                searchedPlayerName &&
                !displayValidationError &&
                playerNotFound && (
                    <p>
                        No stats found for this player. Check the player's
                        spelling and list of teams
                    </p>
                )}
        </div>
    );
}

export default PlayerSearchStats;
