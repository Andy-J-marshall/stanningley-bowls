import {
    PlayerResultsStatsFile,
    PlayerStatsSummary,
    PlayerStatsTeamSummary,
} from '../types/interfaces';
import {
    calculateWinPercAndAverage,
    returnPlayerStats,
} from './playerStatsHelper';
import {
    checkAllWinPercAndAverageAreNumbers,
    isPlayerStatsSummaryType,
} from './statsHelper';

export function returnPlayerStatSummary(
    statsToUse: PlayerResultsStatsFile,
    players: string[]
) {
    const statsArray: PlayerStatsSummary[] = [];
    players.sort().forEach((player) => {
        const playerStats = returnPlayerStats(statsToUse, player);
        if (playerStats) {
            // The averages and win percentages are calculated later
            let stats: PlayerStatsSummary = {
                // Total
                player,
                games: playerStats.gamesPlayed,
                wins: playerStats.totalWins,
                agg: playerStats.totalAgg,
                aggAgainst: playerStats.totalAggAgainst,
                average: NaN,
                winPerc: NaN,

                // Singles
                singlesGames: playerStats.singlesGames,
                singlesWins: playerStats.singlesWins,
                singlesAgg: playerStats.singlesAgg,
                singlesAggAgainst: playerStats.singlesAggAgainst,
                singlesAverage: NaN,
                singlesWinPerc: NaN,

                // Pairs
                pairsGames: playerStats.pairsGames,
                pairsWins: playerStats.pairWins,
                pairsAgg: playerStats.totalPairsAgg,
                pairsAggAgainst: playerStats.totalPairsAggAgainst,
                pairsAverage: NaN,
                pairsWinPerc: NaN,

                // Home
                homeGames: playerStats.homeGamesPlayed,
                homeWins: playerStats.homeWins,
                homeAgg: playerStats.totalHomeAgg,
                homeAggAgainst: playerStats.totalHomeAggAgainst,
                homeAverage: NaN,
                homeWinPerc: NaN,

                // Singles Home
                singlesHomeGames: playerStats.singlesHomeGamesPlayed,
                singlesHomeWins: playerStats.singlesHomeWins,
                singlesHomeAgg: playerStats.totalSinglesHomeAgg,
                singlesHomeAggAgainst: playerStats.totalSinglesHomeAggAgainst,
                singlesHomeAverage: NaN,
                singlesHomeWinPerc: NaN,

                // Pairs Home
                pairsHomeGames: playerStats.pairHomeGamesPlayed,
                pairsHomeWins: playerStats.pairHomeWins,
                pairsHomeAgg: playerStats.totalPairsHomeAgg,
                pairsHomeAggAgainst: playerStats.totalPairsHomeAggAgainst,
                pairsHomeAverage: NaN,
                pairsHomeWinPerc: NaN,

                // Away
                awayGames: playerStats.awayGamesPlayed,
                awayWins: playerStats.awayWins,
                awayAgg: playerStats.totalAwayAgg,
                awayAggAgainst: playerStats.totalAwayAggAgainst,
                awayAverage: NaN,
                awayWinPerc: NaN,

                // Singles Away
                singlesAwayGames: playerStats.singlesAwayGamesPlayed,
                singlesAwayWins: playerStats.singlesAwayWins,
                singlesAwayAgg: playerStats.totalSinglesAwayAgg,
                singlesAwayAggAgainst: playerStats.totalSinglesAwayAggAgainst,
                singlesAwayAverage: NaN,
                singlesAwayWinPerc: NaN,

                // Pairs Away
                pairsAwayGames: playerStats.pairAwayGamesPlayed,
                pairsAwayWins: playerStats.pairAwayWins,
                pairsAwayAgg: playerStats.totalPairsAwayAgg,
                pairsAwayAggAgainst: playerStats.totalPairsAwayAggAgainst,
                pairsAwayAverage: NaN,
                pairsAwayWinPerc: NaN,

                // Cup
                cupGames: playerStats.cupGamesPlayed,
                cupWins: playerStats.cupWins,
                cupAgg: playerStats.cupAgg,
                cupAggAgainst: playerStats.cupAggAgainst,
                cupAverage: NaN,
                cupWinPerc: NaN,

                // Singles Cup
                singlesCupGames: playerStats.singlesCupGamesPlayed,
                singlesCupWins: playerStats.singlesCupWins,
                singlesCupAgg: playerStats.totalSinglesCupAgg,
                singlesCupAggAgainst: playerStats.totalSinglesCupAggAgainst,
                singlesCupAverage: NaN,
                singlesCupWinPerc: NaN,

                // Pairs Cup
                pairsCupGames: playerStats.pairCupGamesPlayed,
                pairsCupWins: playerStats.pairCupWins,
                pairsCupAgg: playerStats.totalPairsCupAgg,
                pairsCupAggAgainst: playerStats.totalPairsCupAggAgainst,
                pairsCupAverage: NaN,
                pairsCupWinPerc: NaN,
            };

            stats = calculateWinPercAndAverage(stats);
            stats = checkAllWinPercAndAverageAreNumbers(stats);

            statsArray.push(stats);
        }
    });
    return statsArray;
}

export function returnPlayerSummaryDisplayStats(
    stats: (PlayerStatsSummary | PlayerStatsTeamSummary)[],
    showSinglesOnlyBool: boolean | undefined,
    showPairsOnlyBool: boolean | undefined,
    showHomeOnlyBool: boolean | undefined,
    showAwayOnlyBool: boolean | undefined,
    showCupOnlyBool: boolean | undefined
) {
    const statsToUse = stats?.map((player) => {
        let games = player.games;
        let average = player.average;
        let wins = player.wins;

        if (isPlayerStatsSummaryType(player)) {
            if (showSinglesOnlyBool) {
                games = player.singlesGames;
                average = player.singlesAverage;
                wins = player.singlesWins;
            }
            if (showPairsOnlyBool) {
                games = player.pairsGames;
                average = player.pairsAverage;
                wins = player.pairsWins;
            }

            if (showHomeOnlyBool) {
                games = player.homeGames;
                average = player.homeAverage;
                wins = player.homeWins;
            }
            if (showHomeOnlyBool && showSinglesOnlyBool) {
                games = player.singlesHomeGames;
                average = player.singlesHomeAverage;
                wins = player.singlesHomeWins;
            }
            if (showHomeOnlyBool && showPairsOnlyBool) {
                games = player.pairsHomeGames;
                average = player.pairsHomeAverage;
                wins = player.pairsHomeWins;
            }

            if (showAwayOnlyBool) {
                games = player.awayGames;
                average = player.awayAverage;
                wins = player.awayWins;
            }
            if (showAwayOnlyBool && showSinglesOnlyBool) {
                games = player.singlesAwayGames;
                average = player.singlesAwayAverage;
                wins = player.singlesAwayWins;
            }
            if (showAwayOnlyBool && showPairsOnlyBool) {
                games = player.pairsAwayGames;
                average = player.pairsAwayAverage;
                wins = player.pairsAwayWins;
            }

            if (showCupOnlyBool) {
                games = player.cupGames;
                average = player.cupAverage;
                wins = player.cupWins;
            }
            if (showCupOnlyBool && showSinglesOnlyBool) {
                games = player.singlesCupGames;
                average = player.singlesCupAverage;
                wins = player.singlesCupWins;
            }
            if (showCupOnlyBool && showPairsOnlyBool) {
                games = player.pairsCupGames;
                average = player.pairsCupAverage;
                wins = player.pairsCupWins;
            }
        }

        const winPerc = wins && (wins / games) * 100;
        const playerName = player.player;

        const playerObject = {
            player: playerName,
            games,
            average: Number(average?.toFixed(2)),
            wins,
            winPerc: Number(winPerc?.toFixed(0)),
            aggDiff: Number((games * average)?.toFixed(0)),
        };

        return playerObject;
    });

    return statsToUse;
}
