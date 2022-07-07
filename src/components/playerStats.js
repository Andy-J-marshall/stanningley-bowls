import React, { useState, Fragment } from 'react';
import Player from './players';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function PlayerStats(props) {
    const playersStats = props.playersStats;

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [value, setValue] = useState(['']);

    const keys = Object.keys(playersStats);
    const playerNameArray = keys.sort().map((p) => p.toUpperCase());

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue(['']);
        const searchedName = event.target[0].value.trim();
        setSearchedPlayerName(searchedName.toLowerCase());
    };

    const handleChange = (selected) => {
        setValue(selected);
    };

    function showPlayerStats(index, player, playerName) {
        return (
            <Player
                key={index}
                player={player}
                name={playerName}
                playersStats={playersStats}
            ></Player>
        );
    }

    return (
        <div id="player-stats">
            <h1>PLAYER STATS</h1>
            <Form
                id="player-search-form"
                className="center"
                onSubmit={handleSubmit}
            >
                <Fragment>
                    <Form.Group className="mb-3">
                        <Typeahead
                            id="player-search"
                            placeholder="Player..."
                            onChange={handleChange}
                            options={['SHOW ALL'].concat(playerNameArray)}
                            selected={value}
                            size="lg"
                        />
                    </Form.Group>
                </Fragment>
                <Button variant="light" type="submit">
                    Search
                </Button>
            </Form>
            <br />

            {/* Shows all players */}
            {(!searchedPlayerName ||
                searchedPlayerName.toLowerCase() === 'show all') && (
                <ListGroup>
                    {keys.map((p, index) => {
                        const playerName = keys[index];
                        {
                            return showPlayerStats(index, p, playerName);
                        }
                    })}
                </ListGroup>
            )}

            {/* Only shows searched for player */}
            {searchedPlayerName && (
                <ListGroup>
                    {keys.map((p, index) => {
                        const playerName = keys[index];
                        if (
                            playerName.toLowerCase() ===
                            searchedPlayerName.toLowerCase()
                        ) {
                            {
                                return showPlayerStats(index, p, playerName);
                            }
                        }
                    })}
                </ListGroup>
            )}
        </div>
    );
}

export default PlayerStats;
