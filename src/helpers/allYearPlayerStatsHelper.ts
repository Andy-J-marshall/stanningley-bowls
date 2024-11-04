import { config } from '../config';
import {
    FullStatsFile,
    PlayerResultsStatsFile,
    PlayerStatsSummary,
} from '../types/interfaces';
import { returnPlayerStats } from './playerStatsHelper';
import { checkWinPercAndAverageAreNumbers } from './statsHelper';

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
        let stats = {
            player,

            games: 0,
            wins: 0,
            winPerc: 0,
            average: 0,
            agg: 0,
            aggAgainst: 0,

            singleGames: 0,
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

            awayGames: 0,
            awayWins: 0,
            awayWinPerc: 0,
            awayAverage: 0,
            awayAgg: 0,
            awayAggAgainst: 0,

            cupGames: 0,
            cupWins: 0,
            cupWinPerc: 0,
            cupAverage: 0,
            cupAgg: 0,
            cupAggAgainst: 0,
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
                stats.singleGames += playerStats.singlesGames;
                stats.singlesWins +=
                    playerStats.totalWins - playerStats.pairWins;
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

                // Away
                stats.awayGames += playerStats.awayGamesPlayed;
                stats.awayWins += playerStats.awayWins;
                stats.awayAgg += playerStats.totalAwayAgg;
                stats.awayAggAgainst += playerStats.totalAwayAggAgainst;

                // Cup
                stats.cupGames += playerStats.cupGamesPlayed;
                stats.cupWins += playerStats.cupWins;
                stats.cupAgg += playerStats.cupAgg;
                stats.cupAggAgainst += playerStats.cupAggAgainst;
            }
        });

        // Win percentages
        stats.winPerc = (stats.wins / stats.games) * 100;
        stats.singlesWinPerc = (stats.singlesWins / stats.singleGames) * 100;
        stats.pairsWinPerc = (stats.pairsWins / stats.pairsGames) * 100;
        stats.homeWinPerc = (stats.homeWins / stats.homeGames) * 100;
        stats.awayWinPerc = (stats.awayWins / stats.awayGames) * 100;
        stats.cupWinPerc = (stats.cupWins / stats.cupGames) * 100;

        // Averages
        stats.average = (stats.agg - stats.aggAgainst) / stats.games;
        stats.singlesAverage =
            (stats.singlesAgg - stats.singlesAggAgainst) / stats.singleGames;
        stats.pairsAverage =
            (stats.pairsAgg - stats.pairsAggAgainst) / stats.pairsGames;
        stats.homeAverage =
            (stats.homeAgg - stats.homeAggAgainst) / stats.homeGames;
        stats.awayAverage =
            (stats.awayAgg - stats.awayAggAgainst) / stats.awayGames;
        stats.cupAverage =
            (stats.cupAgg - stats.cupAggAgainst) / stats.cupGames;

        stats = checkWinPercAndAverageAreNumbers(stats);

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
