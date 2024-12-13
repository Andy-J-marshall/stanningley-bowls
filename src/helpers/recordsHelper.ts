import { config } from '../config';
import {
    TeamRecords,
    PlayerResultsStatsFile,
    ConfigTeamData,
    RecordStats,
} from '../types/interfaces';

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
                minGames: 1,
                mostGames: 0,
                mostWins: 0,
                bestAverage: -27,
                bestWinPerc: 0,
                mostWinsPlayer: [],
                bestAveragePlayer: [],
                bestWinPercPlayer: [],
            };
        });
    });

    return { initialTeamRecords, teamsFound };
}

export function findMinNumberOfGames(
    playerResults: PlayerResultsStatsFile,
    teamsFound: string[],
    initialTeamRecords: TeamRecords
) {
    const players = Object.keys(playerResults);
    const teamRecordsWithMinGames = initialTeamRecords;
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
            const teamRecord = teamRecordsWithMinGames[team];
            const playerStats = p[team];

            if (
                playerStats &&
                teamRecord &&
                playerStats.games >= teamRecord.mostGames
            ) {
                teamRecordsWithMinGames[team].mostGames = playerStats.games;
            }
        });
    });

    return {
        highestTotalGames,
        teamRecordsWithMinGames,
    };
}

export function findPlayerRecords(
    playerResults: PlayerResultsStatsFile,
    teamsFound: string[],
    teamRecords: TeamRecords,
    highestTotalGames: number
) {
    const players = Object.keys(playerResults);

    const minGamesForOverallRecords = 15;
    const minGamesForTeamRecords = 11;

    let minGames = 1;
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

            const games = teamStats?.games;
            if (games > 0) {
                const wins = teamStats.wins;
                const avg = teamStats.aggDiff / games;
                const winPerc = (wins / games) * 100;

                let teamRecord = teamRecords[team];
                let minTeamGames = teamRecord.minGames;
                let mostTeamGames = teamRecord.mostGames;
                let mostTeamWins = teamRecord.mostWins;
                let bestTeamAverage = teamRecord.bestAverage;
                let bestTeamWinPerc = teamRecord.bestWinPerc;

                if (mostTeamGames && mostTeamGames > minTeamGames) {
                    if (mostTeamGames >= minGamesForTeamRecords) {
                        minTeamGames = minGamesForTeamRecords;
                    } else {
                        minTeamGames = mostTeamGames;
                    }
                }

                if (avg >= bestTeamAverage && games >= minTeamGames) {
                    if (avg > bestTeamAverage) {
                        teamRecords[team].bestAveragePlayer = [];
                        bestTeamAverage = avg;
                    }
                    teamRecords[team].bestAveragePlayer.push(player);
                }

                if (wins >= mostTeamWins) {
                    if (wins > mostTeamWins) {
                        teamRecords[team].mostWinsPlayer = [];
                        mostTeamWins = wins;
                    }
                    teamRecords[team].mostWinsPlayer.push(player);
                }

                if (winPerc >= bestTeamWinPerc && games >= minTeamGames) {
                    if (winPerc > bestTeamWinPerc) {
                        teamRecords[team].bestWinPercPlayer = [];
                        bestTeamWinPerc = winPerc;
                    }
                    teamRecords[team].bestWinPercPlayer.push(player);
                }

                teamRecords[team].minGames = minTeamGames;
                teamRecords[team].mostGames = mostTeamGames;
                teamRecords[team].mostWins = mostTeamWins;
                teamRecords[team].bestAverage = bestTeamAverage;
                teamRecords[team].bestWinPerc = bestTeamWinPerc;
            }
        });

        // Total
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;

        const winPerc = (totalWins / totalGames) * 100;
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;

        if (highestTotalGames > minGames) {
            if (highestTotalGames >= minGamesForOverallRecords) {
                minGames = minGamesForOverallRecords;
            } else {
                minGames = highestTotalGames;
            }
        }
        const playedMinGames = totalGames >= minGames ? true : false;

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

    const combinedStats = {
        minGames,
        mostGamesPlayer,
        mostGames,
        mostWinsPlayer,
        mostWins,
        bestWinPercPlayer,
        bestWinPerc,
        bestAveragePlayer,
        bestAverage,
    };

    return {
        teamRecords,
        combinedStats,
    };
}

export function findTeamRecords(
    teamData: ConfigTeamData,
    teamRecords: TeamRecords
) {
    let teamName = '';
    let teamRecord = null;

    // Find A team stats
    for (const team of teamData.teamNames) {
        const nameLowerCase = team.toLowerCase();
        const tr = teamRecords[nameLowerCase];
        if (tr) {
            if (tr.bestAverage > -21) {
                teamRecord = tr;
                teamName = nameLowerCase;
                break;
            }
        }

        // Check for a team with an (a) suffix if no team found
        const trWithASuffix = teamRecords[nameLowerCase + ' (a)'];
        if (trWithASuffix && trWithASuffix.bestAverage > -21) {
            teamRecord = trWithASuffix;
            teamName = nameLowerCase;
            break;
        }
    }

    // Find B team stats if they exist
    let bTeamRecord: RecordStats | null =
        teamRecords[teamName.replace(' (a)', '') + ' (b)'];

    if (!bTeamRecord) {
        bTeamRecord = null;
    }

    return { teamName, teamRecord, bTeamRecord };
}
