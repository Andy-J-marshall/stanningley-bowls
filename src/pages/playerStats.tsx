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
import {
    PlayerStatsProps,
    PlayerStatsSummary,
    PlayerStatsTeamSummary,
} from '../types/interfaces';
import {
    returnPlayerStatsForAllYears,
    returnPlayerStatSummaryForAllYears,
    returnTeamNamesWithGamesForAllYears,
    returnTeamPlayerStatsForAllYears,
} from '../helpers/allYearPlayerStatsHelper';
import {
    returnPlayerStatsForTeam,
    returnTeamNamesWithGames,
} from '../helpers/teamStatsHelper';
import TeamStats from './teamStats';

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
    const [teamNameForSpecificStats, setTeamSpecificStats] = useState('');
    const [allYearsStatsToUseArray, setAllYearsStatsToUseArray] = useState(
        statsForEveryYearArray
    );
    const [loading, setLoading] = useState(false);
    const [showSinglesOnlyBool, setShowSinglesOnlyBool] = useState(false);
    const [showPairsOnlyBool, setShowPairsOnlyBool] = useState(false);
    const [showHomeOnlyBool, setShowHomeOnlyBool] = useState(false);
    const [showAwayOnlyBool, setShowAwayOnlyBool] = useState(false);
    const [showCupOnlyBool, setShowCupOnlyBool] = useState(false);

    // TODO refactor these a bit?

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
    const teamNames = returnTeamNamesWithGames(playerResults);
    const teamNamesAllYears = returnTeamNamesWithGamesForAllYears(
        statsForEveryYearArray
    );

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
            // this prevents scrolling to the top when a different stat filter is selected
            window.scrollTo(0, 0);
        }
        setLoaded(true);

        if (showStatSummary) {
            setStatsToUse(combinedPlayerResults);
            setAllYearsStatsToUseArray(combinedStatsForEveryYearArray);
        } else {
            setStatsToUse(playerResults);
            setAllYearsStatsToUseArray(statsForEveryYearArray);
        }
    });

    function scrollToBottom() {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 0);
    }

    function allYearStatsCallback(showBool: boolean) {
        setShowStatsSinceStart(showBool);

        scrollToBottom();
    }

    function allTeamStatsCallback(showBool: boolean) {
        setShowStatSummary(showBool);
        if (showBool) {
            setStatsToUse(combinedPlayerResults);
        } else {
            setStatsToUse(playerResults);
        }

        scrollToBottom();
    }

    function onlySinglesCallback(showBool: boolean) {
        setShowSinglesOnlyBool(showBool);

        scrollToBottom();
    }

    function onlyPairsCallback(showBool: boolean) {
        setShowPairsOnlyBool(showBool);

        scrollToBottom();
    }

    function onlyHomeCallback(showBool: boolean) {
        setShowHomeOnlyBool(showBool);

        scrollToBottom();
    }

    function onlyAwayCallback(showBool: boolean) {
        setShowAwayOnlyBool(showBool);

        scrollToBottom();
    }

    function onlyCupCallback(showBool: boolean) {
        setShowCupOnlyBool(showBool);

        scrollToBottom();
    }

    function teamSpecificCallback(teamName: string) {
        setTeamSpecificStats(teamName);

        scrollToBottom();
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
                    <h3>Player not found for {stats.statsYear}</h3>
                )
            );
        }
    }

    function returnStatSummaryTable() {
        let playerStatsForSummary:
            | PlayerStatsSummary[]
            | PlayerStatsTeamSummary[];

        // TODO refactor
        // TODO there are still some crashes when switching years
        if (teamNameForSpecificStats) {
            if (showStatsSinceStart) {
                if (!teamNamesAllYears.includes(teamNameForSpecificStats)) {
                    return (
                        <h3>
                            No stats for {teamNameForSpecificStats} stats in{' '}
                            {stats.statsYear}
                        </h3>
                    );
                }
                playerStatsForSummary = returnTeamPlayerStatsForAllYears(
                    statsForEveryYearArray,
                    teamNameForSpecificStats
                );
            } else {
                if (!teamNames.includes(teamNameForSpecificStats)) {
                    return (
                        <h3>
                            No stats for {teamNameForSpecificStats} stats in{' '}
                            {stats.statsYear}
                        </h3>
                    );
                }
                playerStatsForSummary = returnPlayerStatsForTeam(
                    statsToUse,
                    teamNameForSpecificStats
                );
            }
        } else {
            playerStatsForSummary = showStatsSinceStart
                ? everyYearStatsSummaryArray
                : statsSummaryArray;
        }

        return (
            <PlayerStatSummary
                callback={setSearchedPlayerName}
                playerStats={playerStatsForSummary}
                showSinglesOnly={showSinglesOnlyBool}
                showPairsOnly={showPairsOnlyBool}
                showHomeOnly={showHomeOnlyBool}
                showAwayOnly={showAwayOnlyBool}
                showCupOnly={showCupOnlyBool}
            />
        );
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

            <PlayerStatsOptions
                allTeamStatsCallback={allTeamStatsCallback}
                allYearStatsCallback={allYearStatsCallback}
                teamSpecificCallback={teamSpecificCallback}
                onlySinglesCallback={onlySinglesCallback}
                onlyPairsCallback={onlyPairsCallback}
                onlyHomeCallback={onlyHomeCallback}
                onlyAwayCallback={onlyAwayCallback}
                onlyCupCallback={onlyCupCallback}
                searchedPlayerName={searchedPlayerName}
                teamNames={showStatsSinceStart ? teamNamesAllYears : teamNames}
            />
            <p className="footnote">Last Updated: {stats.lastUpdated}</p>
        </div>
    );
}

export default PlayerStats;
