import { useState, useEffect } from 'react';
import IndividualPlayerStats from '../components/playerStats/IndividualPlayerStats';
import PlayerStatSummary from '../components/playerStats/playerStatSummary';
import PlayerStatsOptions from '../components/playerStats/playerStatsOptions';
import Search from '../components/playerStats/search';
import { returnPlayerStats } from '../helpers/playerStatsHelper';

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
import { returnPlayerStatSummary } from '../helpers/playerStatsSummaryHelper';

function PlayerStats(props: PlayerStatsProps) {
    const allClubStats = props.allClubStats;
    const clubStats = props.clubStats;
    const clubStatsForEveryYearArray = props.clubStatsForEveryYearArray;
    const allClubStatsForEveryYearArray = props.allClubStatsForEveryYearArray;

    const { playerResults } = clubStats;
    const allClubPlayerResults = allClubStats.playerResults;

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [value, setValue] = useState(['']);
    const [loaded, setLoaded] = useState(false);
    const [showStatSummary, setShowStatSummary] = useState(false);
    const [statsToUse, setStatsToUse] = useState(playerResults);
    const [showStatsSinceStart, setShowStatsSinceStart] = useState(false);
    const [teamNameForStats, setTeamNameForStats] = useState('');
    const [allYearsStatsToUseArray, setAllYearsStatsToUseArray] = useState(
        clubStatsForEveryYearArray
    );
    const [showSinglesOnlyBool, setShowSinglesOnlyBool] = useState(false);
    const [showPairsOnlyBool, setShowPairsOnlyBool] = useState(false);
    const [showHomeOnlyBool, setShowHomeOnlyBool] = useState(false);
    const [showAwayOnlyBool, setShowAwayOnlyBool] = useState(false);
    const [showCupOnlyBool, setShowCupOnlyBool] = useState(false);

    // Find list of players for current year
    const players = Object.keys(allClubPlayerResults).sort();
    const playerSearchNameArray = players.map((p) => p.toUpperCase());

    // Find list of players for all years
    const allPlayersSet = new Set<string>();
    allYearsStatsToUseArray.forEach((yearStats) => {
        Object.keys(yearStats.playerResults).forEach((playerName) => {
            allPlayersSet.add(playerName.toUpperCase());
        });
    });
    const allPlayers = Array.from(allPlayersSet).sort();

    // Find list of teams names used in the stats
    const teamNames = returnTeamNamesWithGames(playerResults);
    const teamNamesAllYears = returnTeamNamesWithGamesForAllYears(
        clubStatsForEveryYearArray
    );

    const yearInTitle =
        new Date().getFullYear() !== Number(clubStats.statsYear) &&
        !showStatsSinceStart
            ? `${clubStats.statsYear}`
            : '';

    useEffect(() => {
        if (!loaded) {
            // this prevents scrolling to the top when a different stat filter is selected
            window.scrollTo(0, 0);
        }
        setLoaded(true);

        if (showStatSummary) {
            setStatsToUse(allClubPlayerResults);
            setAllYearsStatsToUseArray(allClubStatsForEveryYearArray);
        } else {
            setStatsToUse(playerResults);
            setAllYearsStatsToUseArray(clubStatsForEveryYearArray);
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

    function allClubStatsCallback(showBool: boolean) {
        setShowStatSummary(showBool);
        if (showBool) {
            setStatsToUse(allClubPlayerResults);
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
        setTeamNameForStats(teamName);

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
                showStatSummary={showStatSummary}
            />
        );
    }

    function returnStatSummaryTable() {
        let playerStatsForSummary:
            | PlayerStatsSummary[]
            | PlayerStatsTeamSummary[] = new Array<PlayerStatsSummary>();

        if (showStatsSinceStart && teamNameForStats) {
            playerStatsForSummary = returnTeamPlayerStatsForAllYears(
                clubStatsForEveryYearArray,
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
                searchList={
                    showStatsSinceStart ? allPlayers : playerSearchNameArray
                }
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
                allTeamStatsCallback={allClubStatsCallback}
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

            <p className="footnote">Last Updated: {clubStats.lastUpdated}</p>
        </div>
    );
}

export default PlayerStats;
