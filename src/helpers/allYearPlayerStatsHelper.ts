import { config } from '../config';
import {
    FullStatsFile,
    PlayerResultsStatsFile,
    PlayerStatsSummary,
} from '../types/interfaces';
import {
    calculateWinPercAndAverage,
    returnPlayerStats,
} from './playerStatsHelper';
import { checkAllWinPercAndAverageAreNumbers } from './statsHelper';

export function returnPlayerStatSummaryForAllYears(
    statsArray: FullStatsFile[]
) {
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
        let stats: PlayerStatsSummary = {
            player,

            games: 0,
            wins: 0,
            winPerc: 0,
            average: 0,
            agg: 0,
            aggAgainst: 0,

            singlesGames: 0,
            singlesWins: 0,
            singlesWinPerc: 0,
            singlesAverage: 0,
            singlesAgg: 0,
            singlesAggAgainst: 0,

            pairsGames: 0,
            pairsWins: 0,
            pairsWinPerc: 0,
            pairsAverage: 0,
            pairsAgg: 0,
            pairsAggAgainst: 0,

            homeGames: 0,
            homeWins: 0,
            homeWinPerc: 0,
            homeAverage: 0,
            homeAgg: 0,
            homeAggAgainst: 0,

            singlesHomeGames: 0,
            singlesHomeWins: 0,
            singlesHomeWinPerc: 0,
            singlesHomeAverage: 0,
            singlesHomeAgg: 0,
            singlesHomeAggAgainst: 0,

            pairsHomeGames: 0,
            pairsHomeWins: 0,
            pairsHomeWinPerc: 0,
            pairsHomeAverage: 0,
            pairsHomeAgg: 0,
            pairsHomeAggAgainst: 0,

            awayGames: 0,
            awayWins: 0,
            awayWinPerc: 0,
            awayAverage: 0,
            awayAgg: 0,
            awayAggAgainst: 0,

            singlesAwayGames: 0,
            singlesAwayWins: 0,
            singlesAwayWinPerc: 0,
            singlesAwayAverage: 0,
            singlesAwayAgg: 0,
            singlesAwayAggAgainst: 0,

            pairsAwayGames: 0,
            pairsAwayWins: 0,
            pairsAwayWinPerc: 0,
            pairsAwayAverage: 0,
            pairsAwayAgg: 0,
            pairsAwayAggAgainst: 0,

            cupGames: 0,
            cupWins: 0,
            cupWinPerc: 0,
            cupAverage: 0,
            cupAgg: 0,
            cupAggAgainst: 0,

            singlesCupGames: 0,
            singlesCupWins: 0,
            singlesCupWinPerc: 0,
            singlesCupAverage: 0,
            singlesCupAgg: 0,
            singlesCupAggAgainst: 0,

            pairsCupGames: 0,
            pairsCupWins: 0,
            pairsCupWinPerc: 0,
            pairsCupAverage: 0,
            pairsCupAgg: 0,
            pairsCupAggAgainst: 0,
        };

        statsArray.forEach((yearStats) => {
            const playerStats = returnPlayerStats(
                yearStats.playerResults,
                player
            );

            if (playerStats) {
                // All
                stats.games += playerStats.gamesPlayed;
                stats.wins += playerStats.totalWins;
                stats.agg += playerStats.totalAgg;
                stats.aggAgainst += playerStats.totalAggAgainst;

                // Singles
                stats.singlesGames += playerStats.singlesGames;
                stats.singlesWins += playerStats.singlesWins;
                stats.singlesAgg += playerStats.singlesAgg;
                stats.singlesAggAgainst += playerStats.singlesAggAgainst;

                // Pairs
                stats.pairsGames += playerStats.pairsGames;
                stats.pairsWins += playerStats.pairWins;
                stats.pairsAgg += playerStats.totalPairsAgg;
                stats.pairsAggAgainst += playerStats.totalPairsAggAgainst;

                // Home
                stats.homeGames += playerStats.homeGamesPlayed;
                stats.homeWins += playerStats.homeWins;
                stats.homeAgg += playerStats.totalHomeAgg;
                stats.homeAggAgainst += playerStats.totalHomeAggAgainst;

                // Singles Home
                stats.singlesHomeGames += playerStats.singlesHomeGamesPlayed;
                stats.singlesHomeWins += playerStats.singlesHomeWins;
                stats.singlesHomeAgg += playerStats.totalSinglesHomeAgg;
                stats.singlesHomeAggAgainst +=
                    playerStats.totalSinglesHomeAggAgainst;

                // Pairs Home
                stats.pairsHomeGames += playerStats.pairHomeGamesPlayed;
                stats.pairsHomeWins += playerStats.pairHomeWins;
                stats.pairsHomeAgg += playerStats.totalPairsHomeAgg;
                stats.pairsHomeAggAgainst +=
                    playerStats.totalPairsHomeAggAgainst;

                // Away
                stats.awayGames += playerStats.awayGamesPlayed;
                stats.awayWins += playerStats.awayWins;
                stats.awayAgg += playerStats.totalAwayAgg;
                stats.awayAggAgainst += playerStats.totalAwayAggAgainst;

                // Singles Away
                stats.singlesAwayGames += playerStats.singlesAwayGamesPlayed;
                stats.singlesAwayWins += playerStats.singlesAwayWins;
                stats.singlesAwayAgg += playerStats.totalSinglesAwayAgg;
                stats.singlesAwayAggAgainst +=
                    playerStats.totalSinglesAwayAggAgainst;

                // Pairs Away
                stats.pairsAwayGames += playerStats.pairAwayGamesPlayed;
                stats.pairsAwayWins += playerStats.pairAwayWins;
                stats.pairsAwayAgg += playerStats.totalPairsAwayAgg;
                stats.pairsAwayAggAgainst +=
                    playerStats.totalPairsAwayAggAgainst;

                // Cup
                stats.cupGames += playerStats.cupGamesPlayed;
                stats.cupWins += playerStats.cupWins;
                stats.cupAgg += playerStats.cupAgg;
                stats.cupAggAgainst += playerStats.cupAggAgainst;

                // Singles Cup
                stats.singlesCupGames += playerStats.singlesCupGamesPlayed;
                stats.singlesCupWins += playerStats.singlesCupWins;
                stats.singlesCupAgg += playerStats.totalSinglesCupAgg;
                stats.singlesCupAggAgainst +=
                    playerStats.totalSinglesCupAggAgainst;

                // Pairs Cup
                stats.pairsCupGames += playerStats.pairCupGamesPlayed;
                stats.pairsCupWins += playerStats.pairCupWins;
                stats.pairsCupAgg += playerStats.totalPairsCupAgg;
                stats.pairsCupAggAgainst += playerStats.totalPairsCupAggAgainst;
            }
        });

        stats = calculateWinPercAndAverage(stats);
        stats = checkAllWinPercAndAverageAreNumbers(stats);

        statsToDisplayArray.push(stats);
    });
    return statsToDisplayArray;
}

export function returnPlayerStatsForAllYears(statsArray: FullStatsFile[]) {
    // Create a deep copy of the statsArray to avoid modifying the original
    const statsArrayCopy: FullStatsFile[] = JSON.parse(
        JSON.stringify(statsArray)
    );

    const collatedStats: PlayerResultsStatsFile = {};

    statsArrayCopy.forEach((yearStats) => {
        Object.keys(yearStats.playerResults).forEach((player) => {
            const yearPlayerStats = yearStats.playerResults[player];

            if (!collatedStats[player]) {
                collatedStats[player] = {
                    ...yearPlayerStats,
                };
            } else {
                collatedStats[player].totalAgg += yearPlayerStats.totalAgg;
                collatedStats[player].totalAggAgainst +=
                    yearPlayerStats.totalAggAgainst;
                collatedStats[player].availableAgg +=
                    yearPlayerStats.availableAgg;
                collatedStats[player].availablePairsAgg +=
                    yearPlayerStats.availablePairsAgg;
                collatedStats[player].availableHomeAgg +=
                    yearPlayerStats.availableHomeAgg;
                collatedStats[player].availableAwayAgg +=
                    yearPlayerStats.availableAwayAgg;
                collatedStats[player].availablePairsHomeAgg +=
                    yearPlayerStats.availablePairsHomeAgg;
                collatedStats[player].availablePairsAwayAgg +=
                    yearPlayerStats.availablePairsAwayAgg;
                collatedStats[player].totalPairsAgg +=
                    yearPlayerStats.totalPairsAgg;
                collatedStats[player].totalPairsAggAgainst +=
                    yearPlayerStats.totalPairsAggAgainst;
                collatedStats[player].totalHomeAgg +=
                    yearPlayerStats.totalHomeAgg;
                collatedStats[player].totalHomeAggAgainst +=
                    yearPlayerStats.totalHomeAggAgainst;
                collatedStats[player].totalPairsHomeAgg +=
                    yearPlayerStats.totalPairsHomeAgg;
                collatedStats[player].totalPairsHomeAggAgainst +=
                    yearPlayerStats.totalPairsHomeAggAgainst;
                collatedStats[player].totalAwayAgg +=
                    yearPlayerStats.totalAwayAgg;
                collatedStats[player].totalAwayAggAgainst +=
                    yearPlayerStats.totalAwayAggAgainst;
                collatedStats[player].totalPairsAwayAgg +=
                    yearPlayerStats.totalPairsAwayAgg;
                collatedStats[player].totalPairsAwayAggAgainst +=
                    yearPlayerStats.totalPairsAwayAggAgainst;
                collatedStats[player].homeWins += yearPlayerStats.homeWins;
                collatedStats[player].homeLosses += yearPlayerStats.homeLosses;
                collatedStats[player].awayWins += yearPlayerStats.awayWins;
                collatedStats[player].awayLosses += yearPlayerStats.awayLosses;
                collatedStats[player].cupWins += yearPlayerStats.cupWins;
                collatedStats[player].cupLosses += yearPlayerStats.cupLosses;
                collatedStats[player].pairWins += yearPlayerStats.pairWins;
                collatedStats[player].pairLosses += yearPlayerStats.pairLosses;
                collatedStats[player].pairHomeWins +=
                    yearPlayerStats.pairHomeWins;
                collatedStats[player].pairHomeLosses +=
                    yearPlayerStats.pairHomeLosses;
                collatedStats[player].pairAwayWins +=
                    yearPlayerStats.pairAwayWins;
                collatedStats[player].pairAwayLosses +=
                    yearPlayerStats.pairAwayLosses;
                collatedStats[player].pairCupWins +=
                    yearPlayerStats.pairCupWins;
                collatedStats[player].pairCupLosses +=
                    yearPlayerStats.pairCupLosses;
                collatedStats[player].totalGamesPlayed +=
                    yearPlayerStats.totalGamesPlayed;
                collatedStats[player].results = [
                    ...collatedStats[player].results,
                    ...yearPlayerStats.results,
                ];
                config.allTeamsInLeaguesSince2013.forEach((team) => {
                    if (
                        yearPlayerStats[team] &&
                        yearPlayerStats[team].games > 0
                    ) {
                        if (!collatedStats[player][team]) {
                            // Initialize the team's stats if they don't exist in collatedStats
                            collatedStats[player][team] = {
                                aggDiff: yearPlayerStats[team].aggDiff,
                                games: yearPlayerStats[team].games,
                                wins: yearPlayerStats[team].wins,
                            };
                        } else {
                            // Accumulate the team's stats
                            collatedStats[player][team].aggDiff +=
                                yearPlayerStats[team].aggDiff;
                            collatedStats[player][team].games +=
                                yearPlayerStats[team].games;
                            collatedStats[player][team].wins +=
                                yearPlayerStats[team].wins;
                        }
                    }
                });
            }
        });
    });

    return collatedStats;
}
