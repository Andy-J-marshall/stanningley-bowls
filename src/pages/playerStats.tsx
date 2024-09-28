import { useState, useEffect } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import IndividualPlayerStats from '../components/IndividualPlayerStats';
import PlayerStatSummary from '../components/playerStatSummary';
import PlayerStatsOptions from '../components/playerStatsOptions';
import AllTimePlayerStats from '../components/allTimePlayerStats';
import Search from '../components/search';
import { collatePlayerStats } from '../helpers/playersHelper';
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
    const [showSinglesOnlyBool, setShowSinglesOnlyBool] = useState(false);
    const [showPairsOnlyBool, setShowPairsOnlyBool] = useState(false);
    const [totalPlayersUsed, setTotalPlayersUsed] = useState(0);
    const statsToDisplayArray = collatePlayerStats(statsToUse, players);

    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) ? `${stats.statsYear}` : '';

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);

        const playersWithGames = statsToDisplayArray.filter(
            (player) => player.games > 0
        );
        setTotalPlayersUsed(playersWithGames.length);

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

    function onlySinglesCallback(showSinglesBoolean) {
        if (showSinglesBoolean) {
            setShowSinglesOnlyBool(true);
        } else {
            setShowSinglesOnlyBool(false);
        }
    }

    function onlyPairsCallback(showPairsBoolean) {
        if (showPairsBoolean) {
            setShowPairsOnlyBool(true);
        } else {
            setShowPairsOnlyBool(false);
        }
    }

    function allYearStatsCallback(showAllBoolean) {
        if (showAllBoolean) {
            setShowStatsSinceStart(true);
        } else {
            setShowStatsSinceStart(false);
        }
    }

    function searchForPlayer(searchedName: string) {
        setShowStatsSinceStart(false);
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

    function displayPlayerCallback(playerName: string) {
        setSearchedPlayerName(playerName);
    }

    function closeButtonCallback() {
        setValue(['']);
        setSearchedPlayerName(null);
    }

    function showPlayerStats(playerName) {
        const validPlayer = players.find((player) => player == playerName);

        if (validPlayer) {
            return (
                <ListGroup>
                    <IndividualPlayerStats
                        key={playerName}
                        player={playerName}
                        name={playerName}
                        playersStats={statsToUse}
                        showStatSummary={showStatSummary}
                    ></IndividualPlayerStats>
                </ListGroup>
            );
        } else {
            return <h5>Player not found</h5>;
        }
    }

    function returnStatsTable() {
        const gamesPlayedThisYear = statsToDisplayArray.find(
            (player) => player.games > 0
        );
        const pairsGamesThisYear = statsToDisplayArray.find(
            (player) => player.pairsGames > 0
        );

        if (gamesPlayedThisYear && (!showPairsOnlyBool || pairsGamesThisYear)) {
            return (
                <div>
                    <br />
                    <PlayerStatSummary
                        callback={displayPlayerCallback}
                        playerStats={statsToDisplayArray}
                        showSinglesOnly={showSinglesOnlyBool}
                        showPairsOnly={showPairsOnlyBool}
                    />
                </div>
            );
        } else {
            return (
                <div className="page-component center">
                    <h5>No stats available for {stats.statsYear}</h5>
                </div>
            );
        }
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div id="player-stat" className="center">
            <h1>{yearInTitle} PLAYER STATS</h1>
            {!showStatsSinceStart && (
                <Search
                    searchList={playerSearchNameArray}
                    value={value}
                    searchedName={searchedPlayerName}
                    handleSubmitCallback={handleSubmit}
                    handleChangeCallback={handleChange}
                    closeButtonCallback={closeButtonCallback}
                />
            )}
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

            {/* Shows Summary of all players stats since 2013 */}
            {showStatsSinceStart &&
                !loading &&
                statsForEveryYearArray.length >= 1 && (
                    <AllTimePlayerStats
                        statsArray={allYearsStatsToUse}
                        showSinglesOnly={showSinglesOnlyBool}
                        showPairsOnly={showPairsOnlyBool}
                    />
                )}

            {/* Shows detailed stats for searched player */}
            {!showStatsSinceStart && !loading && searchedPlayerName && (
                <div>{showPlayerStats(searchedPlayerName.toLowerCase())}</div>
            )}

            {!loading &&
                searchedPlayerName &&
                !playerFound &&
                // TODO fix
                !searchedPlayerName.toLowerCase() === 'show all' && (
                    <h2 style={{ padding: '1rem 0 4rem 0' }}>
                        Player not found
                    </h2>
                )}

            {/* Shows total player count */}
            <br />
            {!showSinglesOnlyBool &&
                !searchedPlayerName &&
                !showPairsOnlyBool &&
                !showStatSummary &&
                !showStatsSinceStart && (
                    <p id="total-player-count">
                        Total players: {totalPlayersUsed}
                    </p>
                )}

            <PlayerStatsOptions
                allTeamStatsCallback={allTeamStatsCallback}
                allYearStatsCallback={allYearStatsCallback}
                onlySinglesCallback={onlySinglesCallback}
                onlyPairsCallback={onlyPairsCallback}
                playerSearchedFor={searchedPlayerName}
            />
            <br />
            <p className="footnote">Last Updated: {stats.lastUpdated}</p>
            <br />
        </div>
    );
}

export default PlayerStats;
