import {
    FullStatsFile,
    PlayerResultsStatsFile,
    TeamResultsStatsFile,
} from '../types/interfaces';

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
                // TODO fix. Or remove and hide team info?
                // playerStats.dayPlayed = [
                //     ...new Set([
                //         ...playerStats.dayPlayed,
                //         ...yearPlayerStats.dayPlayed,
                //     ]),
                // ];
                playerStats.results = [
                    ...playerStats.results,
                    ...yearPlayerStats.results,
                ];
            }
        });
    });

    return collatedStats;
}
