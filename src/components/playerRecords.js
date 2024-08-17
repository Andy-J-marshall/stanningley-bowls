import TeamTabs from './teamTabs';
import RecordsTableDisplay from './recordsTableDisplay';
import config from '../config';
import { returnTabName } from '../helpers/teamsHelper';

function PlayerRecords(props) {
    const stats = props.stats;

    const playerResults = stats.playerResults;
    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) ? `${stats.statsYear}` : '';
    const players = Object.keys(playerResults);

    const minGamesForOverallRecords = 15;
    const minGamesForTeamRecords = 11;

    // Total
    let minTotalGames = 1;
    let mostGamesPlayer = [];
    let mostGames = 0;
    let mostWinsPlayer = [];
    let mostWins = 0;
    let bestWinPercPlayer = [];
    let bestWinPerc = 0;
    let bestAveragePlayer = [];
    let bestAverage = -27;
    let highestTotalGames = 0;

    // This finds the leagues available in the data
    const teamRecords = {};
    let teamsFound = [];
    players.forEach((player) => {
        const p = playerResults[player];

        // Find list of team stats
        const possibleTeamNames = config.allTeamsInLeaguesSince2013;

        const propertyNames = Object.keys(p);
        teamsFound = propertyNames.filter((property) =>
            possibleTeamNames.includes(property.toLowerCase())
        );

        possibleTeamNames.forEach((team) => {
            teamRecords[team] = {
                minTeamGames: 1,
                highestTeamGames: 0,
                mostTeamWins: 0,
                bestTeamAverage: -27,
                bestTeamWinPerc: 0,
                mostTeamWinsPlayer: [],
                bestTeamAveragePlayer: [],
                bestTeamWinPercPlayer: [],
            };
        });
    });

    // This sets the minimum number of games required for the stats to be counted
    players.forEach((player) => {
        const p = playerResults[player];

        const totalGames =
            p.awayWins +
            p.homeWins +
            p.cupWins +
            p.awayLosses +
            p.homeLosses +
            p.cupLosses;

        if (totalGames >= highestTotalGames) {
            highestTotalGames = totalGames;
        }

        teamsFound.forEach((team) => {
            const teamRecord = teamRecords[team];
            const playerStats = p[team];

            if (
                teamRecord &&
                playerStats &&
                playerStats.games >= teamRecord.highestTeamGames
            ) {
                teamRecords[team].highestTeamGames = playerStats.games;
            }
        });
    });

    // This finds the records for the players
    players.forEach((player) => {
        const p = playerResults[player];

        // Team specific stats
        teamsFound.forEach((team) => {
            const teamStats = p[team];

            const games = teamStats.games;
            if (games > 0) {
                const wins = teamStats.wins;
                const avg = teamStats.aggDiff / games;
                const winPerc = (wins / games) * 100;

                let teamRecord = teamRecords[team];
                let minTeamGames = teamRecord.minTeamGames;
                let highestTeamGames = teamRecord.highestTeamGames;
                let mostTeamWins = teamRecord.mostTeamWins;
                let bestTeamAverage = teamRecord.bestTeamAverage;
                let bestTeamWinPerc = teamRecord.bestTeamWinPerc;

                if (highestTeamGames > minTeamGames) {
                    if (highestTeamGames >= minGamesForTeamRecords) {
                        minTeamGames = minGamesForTeamRecords;
                    } else {
                        minTeamGames = highestTeamGames;
                    }
                }

                if (avg >= bestTeamAverage && games >= minTeamGames) {
                    if (avg > bestTeamAverage) {
                        teamRecords[team].bestTeamAveragePlayer = [];
                        bestTeamAverage = avg;
                    }
                    teamRecords[team].bestTeamAveragePlayer.push(player);
                }

                if (wins >= mostTeamWins) {
                    if (wins > mostTeamWins) {
                        teamRecords[team].mostTeamWinsPlayer = [];
                        mostTeamWins = wins;
                    }
                    teamRecords[team].mostTeamWinsPlayer.push(player);
                }

                if (winPerc >= bestTeamWinPerc && games >= minTeamGames) {
                    if (winPerc > bestTeamWinPerc) {
                        teamRecords[team].bestTeamWinPercPlayer = [];
                        bestTeamWinPerc = winPerc;
                    }
                    teamRecords[team].bestTeamWinPercPlayer.push(player);
                }

                teamRecords[team].minTeamGames = minTeamGames;
                teamRecords[team].highestTeamGames = highestTeamGames;
                teamRecords[team].mostTeamWins = mostTeamWins;
                teamRecords[team].bestTeamAverage = bestTeamAverage;
                teamRecords[team].bestTeamWinPerc = bestTeamWinPerc;
            }
        });

        // Total
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;

        const winPerc = (totalWins / totalGames) * 100;
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;

        if (highestTotalGames > minTotalGames) {
            if (highestTotalGames >= minGamesForOverallRecords) {
                minTotalGames = minGamesForOverallRecords;
            } else {
                minTotalGames = highestTotalGames;
            }
        }
        const playedMinGames = totalGames >= minTotalGames ? true : false;

        if (totalGames >= mostGames) {
            if (totalGames > mostGames) {
                mostGamesPlayer = [];
                mostGames = totalGames;
            }
            mostGamesPlayer.push(player);
        }
        if (totalWins >= mostWins) {
            if (totalWins > mostWins) {
                mostWinsPlayer = [];
                mostWins = totalWins;
            }
            mostWinsPlayer.push(player);
        }
        if (winPerc >= bestWinPerc && playedMinGames) {
            if (winPerc > bestWinPerc) {
                bestWinPercPlayer = [];
                bestWinPerc = winPerc;
            }
            bestWinPercPlayer.push(player);
        }
        if (average >= bestAverage && playedMinGames) {
            if (average > bestAverage) {
                bestAveragePlayer = [];
                bestAverage = average;
            }
            bestAveragePlayer.push(player);
        }
    });

    function combinedRecordsComponent() {
        if (mostGames > 0) {
            return (
                <RecordsTableDisplay
                    minGames={minTotalGames}
                    mostGames={mostGames}
                    mostGamesPlayer={mostGamesPlayer}
                    mostWins={mostWins}
                    mostWinsPlayer={mostWinsPlayer}
                    bestWinPerc={bestWinPerc}
                    bestWinPercPlayer={bestWinPercPlayer}
                    bestAverage={bestAverage}
                    bestAveragePlayer={bestAveragePlayer}
                />
            );
        } else {
            return <p>No games played</p>;
        }
    }

    function returnAllComponentsForTeams() {
        return config.historicTeamInfo.map((teamData) => {
            let teamName = '';
            let displayname = returnTabName(teamData.teamNames[0]);
            let teamRecord = null;

            // Find A team stats
            for (const team of teamData.teamNames) {
                const tn = team.toLowerCase();
                const tr = teamRecords[tn];
                if (tr) {
                    if (tr.bestTeamAverage > -21) {
                        teamRecord = tr;
                        teamName = tn;
                        break;
                    }
                }

                // Check for a team with an (a) suffix if no team found
                const trWithASuffix = teamRecords[tn + ' (a)'];
                if (trWithASuffix && trWithASuffix.bestTeamAverage > -21) {
                    teamRecord = trWithASuffix;
                    teamName = tn;
                    break;
                }
            }

            // Find B team stats if they exist
            let bTeamRecord = null;
            if (teamData.bTeamForLeagueBool) {
                bTeamRecord =
                    teamRecords[teamName.replace(' (a)', '') + ' (b)'];
            }

            if (teamRecord || bTeamRecord) {
                if (
                    teamRecord.bestTeamAveragePlayer.length > 0 ||
                    bTeamRecord.bestTeamAveragePlayer.length > 0
                ) {
                    return (
                        <div displayname={displayname}>
                            {teamRecord && teamRecord.bestTeamAverage > -21 && (
                                <RecordsTableDisplay
                                    day={teamName.replace(' (a)', '')}
                                    minGames={teamRecord.minTeamGames}
                                    mostWins={teamRecord.mostTeamWins}
                                    mostWinsPlayer={
                                        teamRecord.mostTeamWinsPlayer
                                    }
                                    bestWinPerc={teamRecord.bestTeamWinPerc}
                                    bestWinPercPlayer={
                                        teamRecord.bestTeamWinPercPlayer
                                    }
                                    bestAverage={teamRecord.bestTeamAverage}
                                    bestAveragePlayer={
                                        teamRecord.bestTeamAveragePlayer
                                    }
                                />
                            )}
                            {bTeamRecord && <hr />}
                            {bTeamRecord &&
                                bTeamRecord.bestTeamAverage > -21 && (
                                    <RecordsTableDisplay
                                        day={
                                            teamName.replace(' (a)', '') +
                                            ' (b)'
                                        }
                                        minGames={bTeamRecord.minTeamGames}
                                        mostWins={bTeamRecord.mostTeamWins}
                                        mostWinsPlayer={
                                            bTeamRecord.mostTeamWinsPlayer
                                        }
                                        bestWinPerc={
                                            bTeamRecord.bestTeamWinPerc
                                        }
                                        bestWinPercPlayer={
                                            bTeamRecord.bestTeamWinPercPlayer
                                        }
                                        bestAverage={
                                            bTeamRecord.bestTeamAverage
                                        }
                                        bestAveragePlayer={
                                            bTeamRecord.bestTeamAveragePlayer
                                        }
                                    />
                                )}
                        </div>
                    );
                } else {
                    return <p displayname={displayname}>No games played</p>;
                }
            } else {
                return (
                    <div displayname={displayname}>
                        <p>
                            {config.teamNames.shortName} did not play on this
                            day for the selected year
                        </p>
                    </div>
                );
            }
        });
    }

    if (mostGames > 0) {
        return (
            <div id="player-records">
                <h1>{yearInTitle} RECORDS</h1>
                <TeamTabs
                    allCombinedComponent={combinedRecordsComponent()}
                    teamComponents={returnAllComponentsForTeams()}
                />
            </div>
        );
    } else {
        return (
            <div className="center">
                <h1>{yearInTitle} RECORDS</h1>
                <p>No games played</p>
            </div>
        );
    }
}

export default PlayerRecords;
