import { useState, useEffect } from 'react';
import IndividualPlayerStats from '../components/playerStats/IndividualPlayerStats';
import PlayerStatSummary from '../components/playerStats/playerStatSummary';
import PlayerStatsOptions from '../components/playerStats/playerStatsOptions';
import Search from '../components/playerStats/search';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { config } from '../config';
import {
    PlayerStatsProps,
    PlayerStatsSummary,
    PlayerStatsTeamSummary,
} from '../types/interfaces';
import { returnPlayerStats } from '../helpers/playerStatsHelper';
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
import { returnPlayerStatSummary } from '../helpers/playerStatsSummaryHelper';

function PlayerStats(props: PlayerStatsProps) {
    const stanningleyStats = props.stanningleyStats;
    const stanningleyStatsForEveryYearArray =
        props.stanningleyStatsForEveryYearArray;

    const littlemoorStats = props.littlemoorStats;
    const littlemoorStatsForEveryYearArray =
        props.littlemoorStatsForEveryYearArray;

    const pudseyStats = props.pudseyStats;
    const pudseyStatsForEveryYearArray = props.pudseyStatsForEveryYearArray;

    const allClubsStats = props.allClubsStats;
    const allClubsStatsForEveryYearArray = props.allClubsStatsForEveryYearArray;

    const clubName = config.teamNames.shortName.toLowerCase();

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [value, setValue] = useState(['']);
    const [loaded, setLoaded] = useState(false);
    const [showAllClubsStats, setShowAllClubsStats] = useState(false);
    const [statsToUse, setStatsToUse] = useState(
        stanningleyStats?.playerResults
    );
    const [showStatsSinceStart, setShowStatsSinceStart] = useState(false);
    const [teamNameForStats, setTeamNameForStats] = useState('');
    const [clubNameForStats, setClubNameForStats] = useState(clubName);
    const [allYearsStatsToUseArray, setAllYearsStatsToUseArray] = useState(
        stanningleyStatsForEveryYearArray
    );
    const [showSinglesOnlyBool, setShowSinglesOnlyBool] = useState(false);
    const [showPairsOnlyBool, setShowPairsOnlyBool] = useState(false);
    const [showHomeOnlyBool, setShowHomeOnlyBool] = useState(false);
    const [showAwayOnlyBool, setShowAwayOnlyBool] = useState(false);
    const [showCupOnlyBool, setShowCupOnlyBool] = useState(false);
    const [teamNames, setTeamNames] = useState(
        returnTeamNamesWithGames(stanningleyStats?.playerResults)
    );
    const [players, setPlayers] = useState(['']);
    const [yearInTitle, setYearInTitle] = useState('');

    useEffect(() => {
        // Prevent scrolling to the top when a different stat filter is selected
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);

        // Set which stats to show
        if (!showAllClubsStats) {
            switch (clubNameForStats) {
                case 'pudsey':
                    setStatsToUse(pudseyStats?.playerResults);
                    setAllYearsStatsToUseArray(pudseyStatsForEveryYearArray);
                    setTeamNames(
                        showStatsSinceStart
                            ? returnTeamNamesWithGamesForAllYears(
                                  pudseyStatsForEveryYearArray
                              )
                            : returnTeamNamesWithGames(
                                  pudseyStats?.playerResults
                              )
                    );
                    break;
                case 'littlemoor':
                    setStatsToUse(littlemoorStats?.playerResults);
                    setAllYearsStatsToUseArray(
                        littlemoorStatsForEveryYearArray
                    );
                    setTeamNames(
                        showStatsSinceStart
                            ? returnTeamNamesWithGamesForAllYears(
                                  littlemoorStatsForEveryYearArray
                              )
                            : returnTeamNamesWithGames(
                                  littlemoorStats?.playerResults
                              )
                    );
                    break;
                case clubName:
                default:
                    setStatsToUse(stanningleyStats?.playerResults);
                    setAllYearsStatsToUseArray(
                        stanningleyStatsForEveryYearArray
                    );
                    setTeamNames(
                        showStatsSinceStart
                            ? returnTeamNamesWithGamesForAllYears(
                                  stanningleyStatsForEveryYearArray
                              )
                            : returnTeamNamesWithGames(
                                  stanningleyStats?.playerResults
                              )
                    );
                    break;
            }
        } else {
            setStatsToUse(allClubsStats?.playerResults);
            setAllYearsStatsToUseArray(allClubsStatsForEveryYearArray);
        }

        // Find the title and players list fo the selected stats
        if (showStatsSinceStart) {
            setYearInTitle('');

            const playerListAllYears = allYearsStatsToUseArray.flatMap(
                (yearStats) => Object.keys(yearStats.playerResults)
            );
            setPlayers(Array.from(new Set(playerListAllYears)).sort());
        } else {
            setYearInTitle(
                new Date().getFullYear() !== Number(stanningleyStats.statsYear)
                    ? allClubsStats.statsYear
                    : ''
            );

            setPlayers(Object.keys(allClubsStats?.playerResults).sort());
        }
    }, [
        stanningleyStats,
        stanningleyStatsForEveryYearArray,
        littlemoorStats,
        littlemoorStatsForEveryYearArray,
        pudseyStats,
        pudseyStatsForEveryYearArray,
        showAllClubsStats,
        showStatsSinceStart,
        clubNameForStats,
        loaded,
    ]);

    function scrollToBottom() {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 0);
    }

    function allYearStatsCallback(showBool: boolean) {
        setShowStatsSinceStart(showBool);

        scrollToBottom();
    }

    function allClubsStatsCallback(showBool: boolean) {
        setShowAllClubsStats(showBool);

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
        setTeamNameForStats(teamName);

        scrollToBottom();
    }

    function clubSpecificCallback(chosenClubName: string) {
        setClubNameForStats(chosenClubName);

        scrollToBottom();
    }

    const handleSearchChange = async (selected: any) => {
        setValue(selected);
        const searchedPlayerName = selected[0];
        if (searchedPlayerName) {
            setValue([searchedPlayerName]);
            setSearchedPlayerName(searchedPlayerName.toLowerCase().trim());
        }
    };

    function closeButtonCallback() {
        setValue(['']);
        setSearchedPlayerName('');
    }

    function showDetailedPlayerStats(playerName: string) {
        const individualStats = showStatsSinceStart
            ? returnPlayerStatsForAllYears(allYearsStatsToUseArray)
            : statsToUse;

        const detailedStats = returnPlayerStats(
            individualStats,
            playerName.toLowerCase()
        );

        return (
            <IndividualPlayerStats
                name={playerName.toLowerCase()}
                playersStats={detailedStats}
                showAllClubsStats={showAllClubsStats}
            />
        );
    }

    function returnStatSummaryTable() {
        let playerStatsForSummary:
            | PlayerStatsSummary[]
            | PlayerStatsTeamSummary[] = new Array<PlayerStatsSummary>();

        if (showStatsSinceStart && teamNameForStats) {
            playerStatsForSummary = returnTeamPlayerStatsForAllYears(
                allYearsStatsToUseArray,
                teamNameForStats
            );
        }

        if (showStatsSinceStart && !teamNameForStats) {
            playerStatsForSummary = returnPlayerStatSummaryForAllYears(
                allYearsStatsToUseArray
            );
        }

        if (!showStatsSinceStart && teamNameForStats) {
            playerStatsForSummary = returnPlayerStatsForTeam(
                statsToUse,
                teamNameForStats
            );
        }

        if (!showStatsSinceStart && !teamNameForStats) {
            playerStatsForSummary = returnPlayerStatSummary(
                statsToUse,
                players
            );
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

    return (
        <div id="player-stat">
            <h1>{yearInTitle} player stats</h1>
            <Search
                searchList={players}
                value={value}
                searchedName={searchedPlayerName}
                handleChangeCallback={handleSearchChange}
                closeButtonCallback={closeButtonCallback}
            />

            {/* Shows Summary of all players stats */}
            {(!searchedPlayerName ||
                searchedPlayerName.toLowerCase() === 'show all') &&
                returnStatSummaryTable()}

            {/* Shows detailed stats for searched player */}
            {searchedPlayerName && (
                <div>{showDetailedPlayerStats(searchedPlayerName)}</div>
            )}

            <PlayerStatsOptions
                allClubsStatsCallback={allClubsStatsCallback}
                allYearStatsCallback={allYearStatsCallback}
                teamSpecificCallback={teamSpecificCallback}
                clubSpecificCallback={clubSpecificCallback}
                onlySinglesCallback={onlySinglesCallback}
                onlyPairsCallback={onlyPairsCallback}
                onlyHomeCallback={onlyHomeCallback}
                onlyAwayCallback={onlyAwayCallback}
                onlyCupCallback={onlyCupCallback}
                searchedPlayerName={searchedPlayerName}
                teamNames={teamNames}
            />

            <p className="footnote">
                Last Updated: {stanningleyStats.lastUpdated}
            </p>
        </div>
    );
}

export default PlayerStats;
