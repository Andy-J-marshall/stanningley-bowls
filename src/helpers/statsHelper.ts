import {
    FullStatsFile,
    PlayerStatsSummary,
    TeamResultsStatsFile,
} from '../types/interfaces';
import {
    checkWinPercAndAverageAreNumbers,
    returnPlayerStats,
} from './playersHelper';

export function combineTeamStats(statsArray: TeamResultsStatsFile[]) {
    let combinedAwayWins = 0;
    let combinedHomeWins = 0;
    let combinedCupWins = 0;
    let combinedAwayLosses = 0;
    let combinedHomeLosses = 0;
    let combinedCupLosses = 0;
    let combinedHomeDraws = 0;
    let combinedAwayDraws = 0;
    let combinedAgg = 0;
    let combinedOpponentAgg = 0;

    statsArray.forEach((stats) => {
        const {
            awayWins,
            homeWins,
            cupWins,
            awayLosses,
            homeLosses,
            cupLosses,
            homeDraws,
            awayDraws,
            agg,
            opponentAgg,
        } = stats;
        combinedAwayWins += awayWins;
        combinedHomeWins += homeWins;
        combinedAwayLosses += awayLosses;
        combinedHomeLosses += homeLosses;
        combinedHomeDraws += homeDraws;
        combinedAwayDraws += awayDraws;
        combinedCupWins += cupWins;
        combinedCupLosses += cupLosses;
        combinedAgg += agg;
        combinedOpponentAgg += opponentAgg;
    });

    const totalDraws = combinedAwayDraws + combinedHomeDraws;
    const totalWins = combinedAwayWins + combinedHomeWins + combinedCupWins;
    const totalLosses =
        combinedAwayLosses + combinedHomeLosses + combinedCupLosses;
    const totalGames = totalDraws + totalWins + totalLosses;

    return {
        combinedAwayWins,
        combinedHomeWins,
        combinedCupWins,
        combinedAwayLosses,
        combinedHomeLosses,
        combinedCupLosses,
        combinedHomeDraws,
        combinedAwayDraws,
        combinedAgg,
        combinedOpponentAgg,
        totalDraws,
        totalWins,
        totalLosses,
        totalGames,
    };
}

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
