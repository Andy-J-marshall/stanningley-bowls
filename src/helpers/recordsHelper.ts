import { config } from '../config';
import {
    Records,
    PlayerResultsStatsFile,
    ConfigTeamData,
} from '../types/interfaces';

// TODO add tests for this file

export function findLeaguesAvailableInData(
    playerResults: PlayerResultsStatsFile
) {
    const players = Object.keys(playerResults);

    const initialTeamRecords: any = {};
    let teamsFound: string[] = [];

    players.forEach((player) => {
        const p = playerResults[player];

        // Find list of team stats
        const possibleTeamNames = config.allTeamsInLeaguesSince2013;

        const propertyNames = Object.keys(p);
        teamsFound = propertyNames.filter((property) =>
            possibleTeamNames.includes(property.toLowerCase())
        );

        possibleTeamNames.forEach((team) => {
            initialTeamRecords[team] = {
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

    return { initialTeamRecords, teamsFound };
}

export function findMinNumberOfGames(
    playerResults: PlayerResultsStatsFile,
    teamsFound: string[],
    initialTeamRecords: Records
) {
    const players = Object.keys(playerResults);
    const teamRecords = initialTeamRecords;
    let highestTotalGames = 0;

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

        teamsFound.forEach((team: string) => {
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

    return { highestTotalGames, teamRecords };
}

export function findPlayerRecords(
    playerResults: PlayerResultsStatsFile,
    teamsFound: string[],
    teamRecords: Records,
    highestTotalGames: number
) {
    const players = Object.keys(playerResults);

    const minGamesForOverallRecords = 15;
    const minGamesForTeamRecords = 11;

    let minTotalGames = 1;
    let mostGamesPlayer: string[] = [];
    let mostGames = 0;
    let mostWinsPlayer: string[] = [];
    let mostWins = 0;
    let bestWinPercPlayer: string[] = [];
    let bestWinPerc = 0;
    let bestAveragePlayer: string[] = [];
    let bestAverage = -27;

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

    return {
        minTotalGames,
        mostGamesPlayer,
        mostGames,
        mostWinsPlayer,
        mostWins,
        bestWinPercPlayer,
        bestWinPerc,
        bestAveragePlayer,
        bestAverage,
    };
}

export function findTeamRecords(
    teamData: ConfigTeamData,
    teamRecords: Records
) {
    let teamName = '';
    let teamRecord = null;

    // Find A team stats
    for (const team of teamData.teamNames) {
        const nameLowerCase = team.toLowerCase();
        const tr = teamRecords[nameLowerCase];
        if (tr) {
            if (tr.bestTeamAverage > -21) {
                teamRecord = tr;
                teamName = nameLowerCase;
                break;
            }
        }

        // Check for a team with an (a) suffix if no team found
        const trWithASuffix = teamRecords[nameLowerCase + ' (a)'];
        if (trWithASuffix && trWithASuffix.bestTeamAverage > -21) {
            teamRecord = trWithASuffix;
            teamName = nameLowerCase;
            break;
        }
    }

    // Find B team stats if they exist
    let bTeamRecord = null;
    if (teamData.bTeamForLeagueBool) {
        bTeamRecord = teamRecords[teamName.replace(' (a)', '') + ' (b)'];
    }

    return { teamName, teamRecord, bTeamRecord };
}
