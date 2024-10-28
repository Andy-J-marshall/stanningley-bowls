import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import IndividualPlayerStats from '../components/IndividualPlayerStats';
import PlayerStatSummary from '../components/playerStatSummary';
import PlayerStatsOptions from '../components/playerStatsOptions';
import Search from '../components/search';
import {
    returnPlayerStatSummary,
    returnPlayerStats,
} from '../helpers/playerStatsHelper';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { PlayerStatsProps, PlayerStatsSummary } from '../types/interfaces';
import {
    returnPlayerStatsForAllYears,
    returnPlayerStatSummaryForAllYears,
} from '../helpers/allYearPlayerStatsHelper';

function PlayerStats(props: PlayerStatsProps) {
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
    const [allYearsStatsToUseArray, setAllYearsStatsToUseArray] = useState(
        statsForEveryYearArray
    );
    const [loading, setLoading] = useState(false);
    const [showSinglesOnlyBool, setShowSinglesOnlyBool] = useState(false);
    const [showPairsOnlyBool, setShowPairsOnlyBool] = useState(false);
    const [totalPlayersUsed, setTotalPlayersUsed] = useState(0);

    // Find list of players and save to an array
    const players = Object.keys(combinedPlayerResults).sort();
    const playerSearchNameArray = players.map((p) => p.toUpperCase());
    const allPlayersSet = new Set<string>();
    allYearsStatsToUseArray.forEach((yearStats) => {
        Object.keys(yearStats.playerResults).forEach((playerName) => {
            allPlayersSet.add(playerName.toUpperCase());
        });
    });
    const allPlayers = Array.from(allPlayersSet).sort();

    const everyYearStatsSummaryArray: PlayerStatsSummary[] =
        returnPlayerStatSummaryForAllYears(allYearsStatsToUseArray);
    const statsSummaryArray: PlayerStatsSummary[] = returnPlayerStatSummary(
        statsToUse,
        players
    );

    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) && !showStatsSinceStart
            ? `${stats.statsYear}`
            : '';

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);

        let playersWithGames = [];
        if (showStatsSinceStart) {
            playersWithGames = everyYearStatsSummaryArray.filter(
                (player) => player.games > 0
            );
        } else {
            playersWithGames = statsSummaryArray.filter(
                (player) => player.games > 0
            );
        }
        setTotalPlayersUsed(playersWithGames.length);

        if (showStatSummary) {
            setStatsToUse(combinedPlayerResults);
            setAllYearsStatsToUseArray(combinedStatsForEveryYearArray);
        } else {
            setStatsToUse(playerResults);
            setAllYearsStatsToUseArray(statsForEveryYearArray);
        }
    });

    function allTeamStatsCallback(showAllBoolean: boolean) {
        if (showAllBoolean) {
            setStatsToUse(combinedPlayerResults);
            setShowStatSummary(true);
        } else {
            setStatsToUse(playerResults);
            setShowStatSummary(false);
        }
    }

    function onlySinglesCallback(showSinglesBoolean: boolean) {
        if (showSinglesBoolean) {
            setShowSinglesOnlyBool(true);
        } else {
            setShowSinglesOnlyBool(false);
        }
    }

    function onlyPairsCallback(showPairsBoolean: boolean) {
        if (showPairsBoolean) {
            setShowPairsOnlyBool(true);
        } else {
            setShowPairsOnlyBool(false);
        }
    }

    function allYearStatsCallback(showAllBoolean: boolean) {
        if (showAllBoolean) {
            setShowStatsSinceStart(true);
        } else {
            setShowStatsSinceStart(false);
        }
    }

    const handleSearchChange = async (selected: any) => {
        setValue(selected);
        const searchedPlayerName = selected[0];
        if (searchedPlayerName) {
            setValue([searchedPlayerName]);
            setLoading(true);
            await delay(300);
            setSearchedPlayerName(searchedPlayerName.toLowerCase().trim());
        }
        setLoading(false);
    };

    function closeButtonCallback() {
        setValue(['']);
        setSearchedPlayerName('');
    }

    function showDetailedPlayerStats(playerName: string) {
        const playerLower = playerName.toLowerCase();
        const individualStats = showStatsSinceStart
            ? returnPlayerStatsForAllYears(allYearsStatsToUseArray)
            : statsToUse;

        const playersListToUse = showStatsSinceStart ? allPlayers : players;
        const validPlayer = playersListToUse.find(
            (player) => player.toLowerCase() === playerLower
        );

        const detailedPlayerStats = returnPlayerStats(
            individualStats,
            playerLower
        );

        if (
            validPlayer &&
            detailedPlayerStats &&
            detailedPlayerStats.gamesPlayed > 0
        ) {
            return (
                <IndividualPlayerStats
                    name={playerLower}
                    playersStats={detailedPlayerStats}
                    showStatSummary={showStatSummary}
                ></IndividualPlayerStats>
            );
        } else {
            return (
                searchedPlayerName.toLowerCase() !== 'show all' && (
                    <h2 style={{ padding: '1rem 0 4rem 0' }}>
                        Player not found for {stats.statsYear}
                    </h2>
                )
            );
        }
    }

    function returnStatSummaryTable() {
        const statsArray = showStatsSinceStart
            ? everyYearStatsSummaryArray
            : statsSummaryArray;
        const gamesPlayedThisYear = statsArray.find(
            (player) => player.games > 0
        );
        const pairsGamesThisYear = statsArray.find(
            (player) => player.pairsGames && player.pairsGames > 0
        );

        if (gamesPlayedThisYear && (!showPairsOnlyBool || pairsGamesThisYear)) {
            return (
                <div>
                    <br />
                    <PlayerStatSummary
                        callback={setSearchedPlayerName}
                        playerStats={statsArray}
                        showSinglesOnly={showSinglesOnlyBool}
                        showPairsOnly={showPairsOnlyBool}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <h5>No stats available for {stats.statsYear}</h5>
                </div>
            );
        }
    }

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div id="player-stat">
            <h1>{yearInTitle} PLAYER STATS</h1>
            <Search
                searchList={
                    showStatsSinceStart ? allPlayers : playerSearchNameArray
                }
                value={value}
                searchedName={searchedPlayerName}
                handleChangeCallback={handleSearchChange}
                closeButtonCallback={closeButtonCallback}
            />
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {/* Shows Summary of all players stats */}
            {!loading &&
                (!searchedPlayerName ||
                    searchedPlayerName.toLowerCase() === 'show all') &&
                returnStatSummaryTable()}

            {/* Shows detailed stats for searched player */}
            {!loading && searchedPlayerName && (
                <div>{showDetailedPlayerStats(searchedPlayerName)}</div>
            )}

            {/* Shows total player count */}
            <br />
            {!showSinglesOnlyBool &&
                !searchedPlayerName &&
                !showPairsOnlyBool &&
                !showStatSummary && (
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
        </div>
    );
}

export default PlayerStats;
