import { useState, useEffect } from 'react';
import { ListGroup, Form, Button, Spinner } from 'react-bootstrap';
import {
    ClearButton,
    Typeahead,
    Menu,
    MenuItem,
} from 'react-bootstrap-typeahead';
import Player from './players';
import PlayerStatSummary from './playerStatSummary';
import PlayerStatOptions from './playerStatOptions';
import AllTimePlayerStats from './allTimePlayerStats';
import { returnPlayerStats } from '../helpers/playersHelper';
import config from '../config';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function PlayerStats(props) {
    const combinedStats = props.combinedStats;
    const stats = props.stats;
    const statsForEveryYearArray = props.statsForEveryYearArray;
    const combinedStatsForEveryYearArray = props.combinedStatsForEveryYearArray;

    const { playerResults } = stats;
    const combinedPlayerResults = combinedStats.playerResults;

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [value, setValue] = useState(['']);
    const [loaded, setLoaded] = useState(false);
    const [showStatSummary, setShowStatSummary] = useState(false);
    const [statsToUse, setStatsToUse] = useState(playerResults);
    const [showStatsSinceStart, setShowStatsSinceStart] = useState(false);
    const [allYearsStatsToUse, setAllYearsStatsToUse] = useState(
        statsForEveryYearArray
    );
    const [playerFound, setPlayerFound] = useState(false);
    const [loading, setLoading] = useState(false);

    const players = Object.keys(combinedPlayerResults).sort();
    const playerSearchNameArray = players.map((p) => p.toUpperCase());
    const statsToDisplayArray = [];
    // TODO add ability to click on a player for their detailed stats?

    players.sort().forEach((player) => {
        const playerStats = returnPlayerStats(statsToUse, player);
        if (playerStats) {
            const stats = {
                player,
                games: playerStats.gamesPlayed,
                wins: playerStats.totalWins,
                agg: playerStats.totalAgg,
                aggAgainst: playerStats.totalAggAgainst,
                average:
                    (playerStats.totalAgg - playerStats.totalAggAgainst) /
                    playerStats.gamesPlayed,
            };
            statsToDisplayArray.push(stats);
        }
    });

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);

        if (showStatSummary) {
            setStatsToUse(combinedPlayerResults);
            setAllYearsStatsToUse(combinedStatsForEveryYearArray);
        } else {
            setStatsToUse(playerResults);
            setAllYearsStatsToUse(statsForEveryYearArray);
        }
    });

    function allTeamStatsCallback(showAllBoolean) {
        if (showAllBoolean) {
            setStatsToUse(combinedPlayerResults);
            setShowStatSummary(true);
        } else {
            setStatsToUse(playerResults);
            setShowStatSummary(false);
        }
    }

    function allYearStatsCallback(showAllBoolean) {
        if (showAllBoolean) {
            setShowStatsSinceStart(true);
        } else {
            setShowStatsSinceStart(false);
        }
    }

    function searchForPlayer(searchedName) {
        setShowStatSummary(false);
        setShowStatsSinceStart(false);
        setStatsToUse(playerResults);
        setSearchedPlayerName(searchedName);

        const validPlayer =
            searchedName &&
            playerSearchNameArray.includes(searchedName.toUpperCase())
                ? true
                : false;
        if (validPlayer && !searchedName.includes('show all')) {
            setPlayerFound(true);
            const teamDaysPlayed = Object.keys(config.days);
            const daysPlayed = combinedPlayerResults[searchedName].dayPlayed;
            let anyTeamDays = false;
            daysPlayed.forEach((day) => {
                const formattedDay = day.split(' (')[0].toLowerCase().trim();
                if (teamDaysPlayed.includes(formattedDay)) {
                    anyTeamDays = true;
                }
            });
            if (!anyTeamDays) {
                setStatsToUse(combinedPlayerResults);
                setShowStatSummary(true);
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
            ></Player>
        );
    }

    function returnStatsTable() {
        const gamesPlayedThisYear = statsToDisplayArray.find(
            (player) => player.games > 0
        );
        if (gamesPlayedThisYear) {
            return (
                <div>
                    <h2 style={{ padding: '1rem 0 0 0' }}>SUMMARY</h2>
                    <PlayerStatSummary playerStats={statsToDisplayArray} />
                </div>
            );
        } else {
            return <h5>No stats available for the selected year</h5>;
        }
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
                        options={['SHOW ALL'].concat(playerSearchNameArray)}
                        selected={value}
                        size="lg"
                        renderMenu={(players, menuProps) => (
                            <Menu {...menuProps}>
                                {players.map((result, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={(e) => e.target.focus()}
                                        option={result}
                                        position={index}
                                    >
                                        {result}
                                    </MenuItem>
                                ))}
                            </Menu>
                        )}
                    >
                        {({ onClear, selected }) => (
                            <div className="rbt-aux">
                                {!!selected.length && selected[0] && (
                                    <ClearButton onClick={onClear} />
                                )}
                            </div>
                        )}
                    </Typeahead>
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

            {/* Shows Summary of all players stats for selected year */}
            {!showStatsSinceStart &&
                !loading &&
                (!searchedPlayerName ||
                    searchedPlayerName.toLowerCase() === 'show all') &&
                returnStatsTable()}

            {/* Shows Summary of all players stats since 2022 */}
            {showStatsSinceStart &&
                !loading &&
                statsForEveryYearArray.length > 1 && (
                    <AllTimePlayerStats statsArray={allYearsStatsToUse} />
                )}

            {/* Shows detailed stats for searched player */}
            {!showStatsSinceStart && !loading && searchedPlayerName && (
                <ListGroup>
                    {players.map((p, index) => {
                        const playerName = players[index];
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

            {!loading &&
                searchedPlayerName &&
                !playerFound &&
                !searchedPlayerName.toLowerCase() === 'show all' && (
                    <h2 style={{ padding: '1rem 0 4rem 0' }}>
                        Player not found
                    </h2>
                )}

            <PlayerStatOptions
                allTeamStatsCallback={allTeamStatsCallback}
                allYearStatsCallback={allYearStatsCallback}
                playerSearchedFor={searchedPlayerName}
            />
        </div>
    );
}

export default PlayerStats;
