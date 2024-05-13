import { useState, useEffect } from 'react';
import { ListGroup, Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import Players from './players';
import stats from '../data/individualPlayer.json';

function PlayerSearchStats() {
    const { playerResults } = stats;

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [playerNameValue, setPlayerNameValue] = useState('');
    const [alternativeNameSpelling, setAlternativeNameSpelling] = useState('');
    const [teamNameValue, setTeamNameValue] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);
    });

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        await delay(750);

        const searchedName = event.target[0].value.toLowerCase().trim();
        setPlayerNameValue([searchedName]);
        setSearchedPlayerName(searchedName);

        const alternativeName = event.target[1].value.toLowerCase().trim();
        setAlternativeNameSpelling(alternativeName);

        const teamName = event.target[2].value.toLowerCase().trim();
        setTeamNameValue([teamName]);

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

    // TODO run script with details passed in - need to create express api?
    // TODO how to handle year
    // TODO Error handling if player not found
    // TODO only call api if fields populated
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
                        placeholder='Player name...'
                        aria-label="Player's name"
                        aria-describedby="basic-addon2"
                    />
                    <Form.Control
                        id="alternative-player-name-field"
                        placeholder="Alternative name spelling..."
                        aria-label="Player's alternative name"
                        aria-describedby="basic-addon2"
                    />
                    <Form.Control
                        id="team-name-field"
                        placeholder="Teams played for..."
                        aria-label="Team names"
                        aria-describedby="basic-addon2"
                    />
                    <Button id="search-button" variant="light" type="submit">
                        Search
                    </Button>
                </InputGroup>
            </Form>

            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {/* Shows detailed stats for searched player */}
            {!loading && searchedPlayerName && (
                <div>{showPlayerStats(searchedPlayerName.toLowerCase())}</div>
            )}
        </div>
    );
}

export default PlayerSearchStats;
