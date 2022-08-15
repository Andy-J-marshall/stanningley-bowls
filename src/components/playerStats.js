import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Button, Spinner } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Player from './players';
import PlayerStatChoiceDropdown from './playerStatChoiceDropdown';
import config from '../config';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function PlayerStats(props) {
    const combinedStats = props.combinedStats;
    const stats = props.stats;

    const { playerResults } = stats;
    const combinedPlayerResults = combinedStats.playerResults;

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [value, setValue] = useState(['']);
    const [loaded, setLoaded] = useState(false);
    const [showStatSummary, setShowStatSummary] = useState(false);
    const [showStatSelectionDropdown, setShowStatSelectionDropdown] =
        useState(false);
    const [statsToUse, setStatsToUse] = useState(playerResults);
    const defaultDropDownText = 'Stanningley Stats';
    const [dropDownText, setDropDownText] = useState(defaultDropDownText);
    const [playerFound, setPlayerFound] = useState(false);
    const [loading, setLoading] = useState(false);

    const keys = Object.keys(combinedPlayerResults).sort();
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
            setShowStatSummary(true);
            setDropDownText('All Team Stats');
        } else {
            setStatsToUse(playerResults);
            setShowStatSummary(false);
            setDropDownText(defaultDropDownText);
        }
    }

    function searchForPlayer(searchedName) {
        setShowStatSelectionDropdown(false);
        setShowStatSummary(false);
        setStatsToUse(playerResults);
        setDropDownText(defaultDropDownText);
        setSearchedPlayerName(searchedName);

        const validPlayer =
            searchedName && playerNameArray.includes(searchedName.toUpperCase())
                ? true
                : false;
        if (validPlayer && !searchedName.includes('show all')) {
            setPlayerFound(true);
            const stanDays = Object.keys(config.days);
            const daysPlayed = combinedPlayerResults[searchedName].dayPlayed;
            let anyTeamDays = false;
            daysPlayed.forEach((day) => {
                const formattedDay = day.split(' (')[0].toLowerCase().trim();
                if (!stanDays.includes(formattedDay)) {
                    setShowStatSelectionDropdown(true);
                }
                if (stanDays.includes(formattedDay)) {
                    anyTeamDays = true;
                }
            });
            if (!anyTeamDays) {
                setStatsToUse(combinedPlayerResults);
                setShowStatSummary(true);
                setShowStatSelectionDropdown(false);
            }
        } else {
            setPlayerFound(false);
        }
    }

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const searchedName = event.target[0].value.toLowerCase().trim();
        setValue(['']);
        await delay(200);
        searchForPlayer(searchedName);
        setLoading(false);
    };

    const handleChange = async (selected) => {
        setValue(selected);
        const searchedPlayerName = selected[0];
        if (searchedPlayerName) {
            setValue([searchedPlayerName]);
            setLoading(true);
            await delay(400);
            searchForPlayer(searchedPlayerName.toLowerCase().trim());
        }
        setLoading(false);
    };

    function showPlayerStats(index, player, playerName) {
        return (
            <Player
                key={index}
                player={player}
                name={playerName}
                playersStats={statsToUse}
                showStatSummary={showStatSummary}
                playedForOtherTeam={showStatSelectionDropdown}
            ></Player>
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
                        onChange={handleChange}
                        options={['SHOW ALL'].concat(playerNameArray)}
                        selected={value}
                        size="lg"
                    />
                </Form.Group>
                <Button variant="light" type="submit">
                    Search
                </Button>
            </Form>
            <br />

            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {/* Shows all players */}
            {((!loading && !searchedPlayerName) ||
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
            {!loading && searchedPlayerName && (
                <ListGroup>
                    {showStatSelectionDropdown && (
                        <PlayerStatChoiceDropdown
                            dropDownText={dropDownText}
                            statsCallback={statsCallback}
                        />
                    )}
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
            {!loading && searchedPlayerName && !playerFound && (
                <h2 style={{ padding: '1rem 0 4rem 0' }}>Player not found</h2>
            )}
        </div>
    );
}

export default PlayerStats;
