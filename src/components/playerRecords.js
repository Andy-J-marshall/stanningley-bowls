import TeamTabs from './teamTabs';
import RecordsTableDisplay from './recordsTableDisplay';
import config from '../config';
import { returnTabName } from '../helpers/teamsHelper';

function PlayerRecords(props) {
    const stats = props.stats;

    const playerResults = stats.playerResults;

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

    function returnTeamRecordComponent(possibleTeamNames, bTeamForLeagueBool) {
        let teamName = '';
        let teamRecord = null;

        for (const team of possibleTeamNames) {
            const tn = team.toLowerCase();
            const tr = teamRecords[tn];
            if (tr && tr.bestTeamAverage > -21) {
                teamRecord = tr;
                teamName = tn;
                break;
            }
            // Check for a team with an (a) suffix if no team found
            const trWithASuffix = teamRecords[tn + ' (a)'];
            if (trWithASuffix && trWithASuffix.bestTeamAverage > -21) {
                teamRecord = trWithASuffix;
                teamName = tn;
                break;
            }
        }

        let bTeamRecord = null;
        if (bTeamForLeagueBool) {
            bTeamRecord = teamRecords[teamName.replace(' (a)', '') + ' (b)'];
        }

        if (teamRecord || bTeamRecord) {
            if (
                teamRecord.bestTeamAveragePlayer.length > 0 ||
                bTeamRecord.bestTeamAveragePlayer.length > 0
            ) {
                return (
                    <div displayname={returnTabName(teamName)} day={teamName}>
                        {bTeamRecord && bTeamRecord.bestTeamAverage > -21 && (
                            <h3>FIRST TEAM</h3>
                        )}
                        {teamRecord && teamRecord.bestTeamAverage > -21 && (
                            <RecordsTableDisplay
                                minGames={teamRecord.minTeamGames}
                                mostWins={teamRecord.mostTeamWins}
                                mostWinsPlayer={teamRecord.mostTeamWinsPlayer}
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
                        {bTeamRecord && bTeamRecord.bestTeamAverage > -21 && (
                            <div>
                                <br />
                                <h3>SECOND TEAM</h3>
                            </div>
                        )}
                        {bTeamRecord && bTeamRecord.bestTeamAverage > -21 && (
                            <RecordsTableDisplay
                                minGames={bTeamRecord.minTeamGames}
                                mostWins={bTeamRecord.mostTeamWins}
                                mostWinsPlayer={bTeamRecord.mostTeamWinsPlayer}
                                bestWinPerc={bTeamRecord.bestTeamWinPerc}
                                bestWinPercPlayer={
                                    bTeamRecord.bestTeamWinPercPlayer
                                }
                                bestAverage={bTeamRecord.bestTeamAverage}
                                bestAveragePlayer={
                                    bTeamRecord.bestTeamAveragePlayer
                                }
                            />
                        )}
                    </div>
                );
            } else {
                return <p>No games played</p>;
            }
        } else {
            return (
                <p>
                    {config.teamNames.shortName} did not play in this league for
                    the selected year
                </p>
            );
        }
    }

    function returnAllComponentsForTeams() {
        const teamInfo = [
            {
                teamNames: [
                    'monday combined leeds',
                    'monday airedale & wharfedale',
                ],
                bTeamForLeagueBool: true,
            },
            {
                teamNames: ['tuesday vets leeds'],
                bTeamForLeagueBool: false,
            },
            {
                teamNames: ['tuesday leeds'],
                bTeamForLeagueBool: false,
            },
            {
                teamNames: [
                    'wednesday half holiday leeds',
                    'wednesday half holiday bradford',
                ],
                bTeamForLeagueBool: true,
            },
            {
                teamNames: ['wednesday pairs airewharfe'],
                bTeamForLeagueBool: true,
            },
            {
                teamNames: ['thursday vets leeds'],
                bTeamForLeagueBool: true,
            },
            {
                teamNames: ['saturday leeds', 'saturday bradford'],
                bTeamForLeagueBool: true,
            },
        ];

        return teamInfo.map((teamData) => {
            return returnTeamRecordComponent(
                teamData.teamNames,
                teamData.bTeamForLeagueBool
            );
        });
    }

    if (mostGames > 0) {
        return (
            <div id="player-records">
                <h1>PLAYER RECORDS</h1>
                <TeamTabs
                    allComponent={combinedRecordsComponent()}
                    teamRecordsComponents={returnAllComponentsForTeams()}
                />
            </div>
        );
    } else {
        return (
            <div className="center">
                <h1>PLAYER RECORDS</h1>
                <p>No games played</p>
            </div>
        );
    }
}

export default PlayerRecords;
