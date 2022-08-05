import React, { useState, Fragment, useEffect } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Player from './players';
import PlayerStatChoiceDropdown from './playerStatChoiceDropdown';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function PlayerStats(props) {
    const combinedStats = props.combinedStats;
    const stats = props.stats;

    const { playerResults } = stats;
    const combinedPlayerResults = combinedStats.playerResults;

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [value, setValue] = useState(['']);
    const [loaded, setLoaded] = useState(false);
    const [statsToUse, setStatsToUse] = useState(playerResults);

    const keys = Object.keys(playerResults).sort();
    const playerNameArray = keys.map((p) => p.toUpperCase());

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);
    });

    function statsCallback(showAllBoolean) {
        if (showAllBoolean) {
            setStatsToUse(combinedPlayerResults);
        } else {
            setStatsToUse(playerResults);
        }
    }

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
                playersStats={statsToUse}
            ></Player>
        );
    }

    return (
        <div id="player-stat" className="center">
            <h1>PLAYER STATS</h1>
            <PlayerStatChoiceDropdown statsCallback={statsCallback} />
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
            {/*  TODO need to give people an option to show all or only stanningley players */}
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
