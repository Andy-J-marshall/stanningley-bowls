import { config } from '../config';
import {
    FullStatsFile,
    PlayerResultsStatsFile,
    PlayerStatsSummary,
} from '../types/interfaces';
import {
    checkWinPercAndAverageAreNumbers,
    returnPlayerStats,
} from './playersHelper';

export function findBiggestWin(playerResults: string[]): string {
    let bestWin = '';
    if (playerResults) {
        let bestWinMargin = 0;
        playerResults.forEach((result) => {
            const resultParts = result.split(' - ', 2);

            const teamPart = resultParts[0];
            const teamScoreMatch = teamPart.match(/[0-9]+/g);
            const teamScore = teamScoreMatch
                ? parseInt(teamScoreMatch[0].trim())
                : 0;

            const opponentPart = resultParts[1].split(' (')[0];
            const opponentScoreMatch = opponentPart.match(/[0-9]+/g);
            const opponentScore = opponentScoreMatch
                ? parseInt(opponentScoreMatch[0].trim())
                : 1000; // Ensures invalid scores are not considered

            const scoreDiff = teamScore - opponentScore;
            if (scoreDiff > 0 && scoreDiff > bestWinMargin) {
                bestWinMargin = scoreDiff;
                bestWin = `${teamScore} - ${opponentScore}`;
            }
        });
    }
    return bestWin;
}

export function returnStatsForPlayersInAllYears(statsArray: FullStatsFile[]) {
    const statsToDisplayArray: PlayerStatsSummary[] = [];
    let playerNames: string[] = [];

    statsArray.forEach((stat) => {
        playerNames = playerNames.concat(Object.keys(stat.playerResults));
    });
    for (var i = 0; i < playerNames.length; ++i) {
        for (var j = i + 1; j < playerNames.length; ++j) {
            if (playerNames[i] === playerNames[j]) playerNames.splice(j--, 1);
        }
    }

    playerNames.sort().forEach((player) => {
        let stats = {
            player,
            games: 0,
            wins: 0,
            agg: 0,
            aggAgainst: 0,
            average: 0,
            winPerc: 0,
            singleGames: 0,
            singlesWins: 0,
            singlesAgg: 0,
            singlesAggAgainst: 0,
            singlesAverage: 0,
            singlesWinPerc: 0,
            pairsGames: 0,
            pairsWins: 0,
            pairsAgg: 0,
            pairsAggAgainst: 0,
            pairsAverage: 0,
            pairsWinPerc: 0,
        };

        statsArray.forEach((yearStats) => {
            const playerStats = returnPlayerStats(
                yearStats.playerResults,
                player
            );

            if (playerStats) {
                // All
                stats.agg += playerStats.totalAgg;
                stats.aggAgainst += playerStats.totalAggAgainst;
                stats.wins += playerStats.totalWins;
                stats.games += playerStats.gamesPlayed;

                // Singles
                stats.singlesAgg += playerStats.singlesAgg;
                stats.singlesAggAgainst += playerStats.singlesAggAgainst;
                stats.singlesWins +=
                    playerStats.totalWins - playerStats.pairWins;
                stats.singleGames += playerStats.singlesGames;

                // Pairs
                stats.pairsAgg += playerStats.totalPairsAgg;
                stats.pairsAggAgainst += playerStats.totalPairsAggAgainst;
                stats.pairsWins += playerStats.pairWins;
                stats.pairsGames += playerStats.pairsGames;
            }
        });
        (stats.winPerc = (stats.wins / stats.games) * 100),
            (stats.singlesWinPerc =
                (stats.singlesWins / stats.singleGames) * 100),
            (stats.pairsWinPerc = (stats.pairsWins / stats.pairsGames) * 100),
            (stats.average = (stats.agg - stats.aggAgainst) / stats.games);
        stats.singlesAverage =
            (stats.singlesAgg - stats.singlesAggAgainst) / stats.singleGames;
        stats.pairsAverage =
            (stats.pairsAgg - stats.pairsAggAgainst) / stats.pairsGames;

        stats = checkWinPercAndAverageAreNumbers(stats);

        statsToDisplayArray.push(stats);
    });
    return statsToDisplayArray;
}

// TODO add a test for this
export function collateStatsFromAllYears(statsArray: FullStatsFile[]) {
    const collatedStats: PlayerResultsStatsFile = {};

    statsArray.forEach((yearStats) => {
        Object.keys(yearStats.playerResults).forEach((player) => {
            if (!collatedStats[player]) {
                collatedStats[player] = { ...yearStats.playerResults[player] };
            } else {
                const playerStats = collatedStats[player];
                const yearPlayerStats = yearStats.playerResults[player];

                playerStats.totalAgg += yearPlayerStats.totalAgg;
                playerStats.totalAggAgainst += yearPlayerStats.totalAggAgainst;
                playerStats.availableAgg += yearPlayerStats.availableAgg;
                playerStats.availablePairsAgg +=
                    yearPlayerStats.availablePairsAgg;
                playerStats.availableHomeAgg +=
                    yearPlayerStats.availableHomeAgg;
                playerStats.availableAwayAgg +=
                    yearPlayerStats.availableAwayAgg;
                playerStats.availablePairsHomeAgg +=
                    yearPlayerStats.availablePairsHomeAgg;
                playerStats.availablePairsAwayAgg +=
                    yearPlayerStats.availablePairsAwayAgg;
                playerStats.totalPairsAgg += yearPlayerStats.totalPairsAgg;
                playerStats.totalPairsAggAgainst +=
                    yearPlayerStats.totalPairsAggAgainst;
                playerStats.totalHomeAgg += yearPlayerStats.totalHomeAgg;
                playerStats.totalHomeAggAgainst +=
                    yearPlayerStats.totalHomeAggAgainst;
                playerStats.totalPairsHomeAgg +=
                    yearPlayerStats.totalPairsHomeAgg;
                playerStats.totalPairsHomeAggAgainst +=
                    yearPlayerStats.totalPairsHomeAggAgainst;
                playerStats.totalAwayAgg += yearPlayerStats.totalAwayAgg;
                playerStats.totalAwayAggAgainst +=
                    yearPlayerStats.totalAwayAggAgainst;
                playerStats.totalPairsAwayAgg +=
                    yearPlayerStats.totalPairsAwayAgg;
                playerStats.totalPairsAwayAggAgainst +=
                    yearPlayerStats.totalPairsAwayAggAgainst;
                playerStats.homeWins += yearPlayerStats.homeWins;
                playerStats.homeLosses += yearPlayerStats.homeLosses;
                playerStats.awayWins += yearPlayerStats.awayWins;
                playerStats.awayLosses += yearPlayerStats.awayLosses;
                playerStats.cupWins += yearPlayerStats.cupWins;
                playerStats.cupLosses += yearPlayerStats.cupLosses;
                playerStats.pairWins += yearPlayerStats.pairWins;
                playerStats.pairLosses += yearPlayerStats.pairLosses;
                playerStats.pairHomeWins += yearPlayerStats.pairHomeWins;
                playerStats.pairHomeLosses += yearPlayerStats.pairHomeLosses;
                playerStats.pairAwayWins += yearPlayerStats.pairAwayWins;
                playerStats.pairAwayLosses += yearPlayerStats.pairAwayLosses;
                playerStats.pairCupWins += yearPlayerStats.pairCupWins;
                playerStats.pairCupLosses += yearPlayerStats.pairCupLosses;
                playerStats.totalGamesPlayed +=
                    yearPlayerStats.totalGamesPlayed;
                playerStats.dayPlayed = [
                    ...playerStats.dayPlayed,
                    ...yearPlayerStats.dayPlayed,
                ];
                playerStats.results = [
                    ...playerStats.results,
                    ...yearPlayerStats.results,
                ];
                // TODO this isn't working for some teams e.g. monday, saturday
                // TODO too many loops?
                config.allTeamsInLeaguesSince2013.forEach((team) => {
                    if (
                        yearPlayerStats[team] &&
                        yearPlayerStats[team].games > 0
                    ) {
                        if (!playerStats[team]) {
                            playerStats[team] = {
                                aggDiff: yearPlayerStats[team].aggDiff,
                                games: yearPlayerStats[team].games,
                                wins: yearPlayerStats[team].wins,
                            };
                        } else {
                            playerStats[team].aggDiff +=
                                yearPlayerStats[team].aggDiff;
                            playerStats[team].games +=
                                yearPlayerStats[team].games;
                            playerStats[team].wins +=
                                yearPlayerStats[team].wins;
                        }
                    }
                });
            }
        });
    });

    return collatedStats;
}
