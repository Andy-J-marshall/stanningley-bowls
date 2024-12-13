import { useState, useEffect } from 'react';
import IndividualPlayerStats from '../components/playerStats/IndividualPlayerStats';
import PlayerStatSummary from '../components/playerStats/playerStatSummary';
import PlayerStatsOptions from '../components/playerStats/playerStatsOptions';
import Search from '../components/playerStats/search';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import {
    ClubStatsMap,
    PlayerStatsProps,
    PlayerStatsSummary,
    PlayerStatsTeamSummary,
} from '../types/interfaces';
import { returnPlayerStats } from '../helpers/playerStatsHelper';
import {
    returnPlayerStatsForTeam,
    returnTeamNamesWithGames,
} from '../helpers/teamStatsHelper';
import { returnPlayerStatSummary } from '../helpers/playerStatsSummaryHelper';

function PlayerStats(props: PlayerStatsProps) {
    const stanningleyStats = props.stanningleyStats;
    const littlemoorStats = props.littlemoorStats;
    const pudseyStats = props.pudseyStats;
    const allClubsStats = props.allClubsStats;

    const [searchedPlayerName, setSearchedPlayerName] = useState('');
    const [value, setValue] = useState(['']);
    const [loaded, setLoaded] = useState(false);
    const [showAllClubsStats, setShowAllClubsStats] = useState(false);
    const [statsToUse, setStatsToUse] = useState(
        stanningleyStats?.playerResults
    );
    const [teamNameForStats, setTeamNameForStats] = useState('');
    const [clubNameForStats, setClubNameForStats] = useState('stanningley');

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
        if (showAllClubsStats) {
            setStatsToUse(allClubsStats?.playerResults);
        } else {
            const clubStatsMap: ClubStatsMap = {
                pudsey: {
                    stats: pudseyStats?.playerResults,
                },
                littlemoor: {
                    stats: littlemoorStats?.playerResults,
                },
                stanningley: {
                    stats: stanningleyStats?.playerResults,
                },
            };

            const selectedStats =
                clubStatsMap[clubNameForStats] || clubStatsMap['stanningley'];

            setStatsToUse(selectedStats.stats);
            setTeamNames(returnTeamNamesWithGames(selectedStats.stats));
        }

        // Find the title and players list fo the selected stats

        setYearInTitle(
            new Date().getFullYear() !== Number(stanningleyStats.statsYear)
                ? allClubsStats.statsYear
                : ''
        );

        setPlayers(Object.keys(allClubsStats?.playerResults).sort());
    }, [
        stanningleyStats,
        littlemoorStats,
        pudseyStats,
        showAllClubsStats,
        clubNameForStats,
        loaded,
    ]);

    function scrollToBottom() {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 0);
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
        const detailedStats = returnPlayerStats(
            statsToUse,
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

        if (teamNameForStats) {
            playerStatsForSummary = returnPlayerStatsForTeam(
                statsToUse,
                teamNameForStats
            );
        }

        if (!teamNameForStats) {
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
            <h1>{yearInTitle.toLowerCase()} player stats</h1>
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
                Last Updated: {allClubsStats.lastUpdated}
            </p>
        </div>
    );
}

export default PlayerStats;
