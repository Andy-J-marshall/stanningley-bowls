export function combineTeamStats(statsArray: any[]) {
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

    statsArray.forEach((stats: any) => {
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

export function findBiggestWin(playerResults: any): any {
    let bestWin = null;
    if (playerResults) {
        let bestWinMargin = 0;
        playerResults.forEach((result: any) => {
            const resultParts = result.split(' - ', 2);

            const teamPart = resultParts[0];
            const teamScore = teamPart.match(/[0-9]+/g)[0].trim();

            const opponentPart = resultParts[1].split(' (')[0];
            const opponentScore = opponentPart.match(/[0-9]+/g)[0].trim();

            const scoreDiff = teamScore - opponentScore;
            if (scoreDiff > 0 && scoreDiff > bestWinMargin) {
                bestWinMargin = scoreDiff;
                bestWin = `${teamScore} - ${opponentScore}`;
            }
        });
    }
    return bestWin;
}
