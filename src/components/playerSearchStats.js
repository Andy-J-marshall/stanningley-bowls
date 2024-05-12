import { useState, useEffect } from 'react';
import { ListGroup, Form, Button, Spinner } from 'react-bootstrap';
import {
    ClearButton,
    Typeahead,
    Menu,
    MenuItem,
} from 'react-bootstrap-typeahead';
import Players from './players';
import stats from '../data/individualPlayer.json';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function PlayerSearchStats() {
    const { playerResults } = stats;

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [value, setValue] = useState(['']);
    const [loaded, setLoaded] = useState(false);
    const [statsToUse, setStatsToUse] = useState(playerResults);
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
        const searchedName = event.target[0].value.toLowerCase().trim();
        setValue(['']);
        await delay(200);
        searchForPlayer(searchedName);
        setLoading(false);
    };

    function showPlayerStats(playerName) {
        return (
            <ListGroup>
                <Players
                    key={playerName}
                    player={playerName}
                    name={playerName}
                    playersStats={statsToUse}
                    showStatSummary={showStatSummary}
                ></Players>
            </ListGroup>
        );
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div id="player-stat" className="center">
            <h1>PLAYER STATS</h1>
            <Form
                id="player-search-form"
                className="center"
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3">
                    <Typeahead
                        id="player-search"
                        placeholder="Player..."
                        // onChange={handleChange}
                        selected={value}
                        size="lg"
                    />
                </Form.Group>
                <Button id="search-button" variant="light" type="submit">
                    Search
                </Button>
                {searchedPlayerName && (
                    <Button
                        id="back-button"
                        style={{
                            margin: '1rem',
                            backgroundColor: '#e7f1ff',
                            color: 'black',
                        }}
                        variant="secondary"
                        onClick={closeButtonCallback}
                    >
                        Back to summary
                    </Button>
                )}
            </Form>

            {/* Shows detailed stats for searched player */}
            {!loading && searchedPlayerName && (
                <div>{showPlayerStats(searchedPlayerName.toLowerCase())}</div>
            )}
        </div>
    );
}

export default PlayerSearchStats;
