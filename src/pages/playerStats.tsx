import { useState, useEffect } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import IndividualPlayerStats from '../components/IndividualPlayerStats';
import PlayerStatSummary from '../components/playerStatSummary';
import PlayerStatsOptions from '../components/playerStatsOptions';
import Search from '../components/search';
import { collatePlayerStats } from '../helpers/playersHelper';
import { config } from '../config';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { PlayerStatsProps, PlayerStatsSummary } from '../types/interfaces';
import {
    collateStatsFromAllYears,
    returnStatsForPlayersInAllYears,
} from '../helpers/statsHelper';

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
    const [allYearsStatsToUse, setAllYearsStatsToUse] = useState(
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
    allYearsStatsToUse.forEach((yearStats) => {
        Object.keys(yearStats.playerResults).forEach((playerName) => {
            allPlayersSet.add(playerName.toUpperCase());
        });
    });
    const allPlayers = Array.from(allPlayersSet).sort();

    const everyYearStats: PlayerStatsSummary[] =
        returnStatsForPlayersInAllYears(allYearsStatsToUse);
    const statsToDisplayArray: PlayerStatsSummary[] = collatePlayerStats(
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

    function searchForPlayer(searchedName: string) {
        setSearchedPlayerName(searchedName);
        // TODO need to handle if player has no games for year e.g. Andy W in 2013  . What to show?
        if (searchedName && !searchedName.includes('show all')) {
            const teamDaysPlayed = Object.keys(config.days);
            const daysPlayed = combinedPlayerResults[searchedName]?.dayPlayed;
            let anyTeamDays = false;
            if (daysPlayed) {
                daysPlayed.forEach((day: string) => {
                    if (teamDaysPlayed.includes(day.toLowerCase().trim())) {
                        anyTeamDays = true;
                    }
                });
            }
            if (!anyTeamDays) {
                setStatsToUse(combinedPlayerResults);
                setShowStatSummary(true);
            }
        }
    }

    const handleSubmit = async (event: any) => {
        setLoading(true);
        event.preventDefault();
        const searchedName = event.target[0].value.toLowerCase().trim();
        setValue(['']);
        await delay(200);
        searchForPlayer(searchedName);
        setLoading(false);
    };

    const handleChange = async (selected: any) => {
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

    function closeButtonCallback() {
        setValue(['']);
        setSearchedPlayerName('');
    }

    function showPlayerStats(playerName: string) {
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
            return (
                searchedPlayerName.toLowerCase() !== 'show all' && (
                    <h2 style={{ padding: '1rem 0 4rem 0' }}>
                        Player not found
                    </h2>
                )
            );
        }
    }

    // TODO why are these NAN for some players?
    // availableAgg: NaN
    // availableAwayAgg: NaN
    // availableHomeAgg: NaN
    // availablePairsAgg: NaN
    // availablePairsAwayAgg: NaN
    // availablePairsHomeAgg: NaN

    function showPlayerStatsSinceStart(playerName: string) {
        // TODO add check back in
        // const validPlayer = players.find((player) => player == playerName);

        // TODO would need a way of generating the stats to use for all years
        const allYearStats = collateStatsFromAllYears(allYearsStatsToUse);

        // if (validPlayer) {
        return (
            <ListGroup>
                <IndividualPlayerStats
                    key={playerName}
                    player={playerName}
                    name={playerName}
                    playersStats={allYearStats} // TODO change
                    showStatSummary={showStatSummary}
                ></IndividualPlayerStats>
            </ListGroup>
        );
        // } else {
        //     return (
        //         searchedPlayerName.toLowerCase() !== 'show all' && (
        //             <h2 style={{ padding: '1rem 0 4rem 0' }}>
        //                 Player not found
        //             </h2>
        //         )
        //     );
        // }
    }

    function returnStatsTable() {
        const gamesPlayedThisYear = statsToDisplayArray.find(
            (player) => player.games > 0
        );
        const pairsGamesThisYear = statsToDisplayArray.find(
            (player) => player.pairsGames && player.pairsGames > 0
        );

        if (gamesPlayedThisYear && (!showPairsOnlyBool || pairsGamesThisYear)) {
            return (
                <div>
                    <br />
                    <PlayerStatSummary
                        callback={setSearchedPlayerName}
                        playerStats={statsToDisplayArray}
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
                handleSubmitCallback={handleSubmit}
                handleChangeCallback={handleChange}
                closeButtonCallback={closeButtonCallback}
            />
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
                !searchedPlayerName &&
                statsForEveryYearArray.length >= 1 && (
                    <PlayerStatSummary
                        callback={setSearchedPlayerName}
                        playerStats={everyYearStats}
                        showSinglesOnly={showSinglesOnlyBool}
                        showPairsOnly={showPairsOnlyBool}
                    />
                )}

            {/* Shows detailed stats for searched player */}
            {!showStatsSinceStart && !loading && searchedPlayerName && (
                <div>{showPlayerStats(searchedPlayerName.toLowerCase())}</div>
            )}

            {/* Shows detailed stats since start for searched player */}
            {showStatsSinceStart && !loading && searchedPlayerName && (
                <div>
                    {showPlayerStatsSinceStart(
                        searchedPlayerName.toLowerCase()
                    )}
                </div>
            )}

            {/* Shows total player count */}
            <br />
            {!showSinglesOnlyBool &&
                !searchedPlayerName &&
                !showPairsOnlyBool &&
                !showStatSummary &&
                // TODO this is incorrect for all years
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
        </div>
    );
}

export default PlayerStats;
