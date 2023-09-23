export function combineTeamStats(statsArray) {
    let combinedAwayWins = 0;
    let combinedHomeWins = 0;
    let combinedCupWins = 0;
    let combinedAwayLosses = 0;
    let combinedHomeLosses = 0;
    let combinedCupLosses = 0;
    let combinedHomeDraws = 0;
    let combinedAwayDraws = 0;
    let combinedAgg = 0;
    let combinedTotalPoints = 0;
    let combinedOpponentAgg = 0;
    let combinedOpponentTotalPoints = 0;

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
            totalPoints,
            opponentAgg,
            opponentTotalPoints,
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
        combinedTotalPoints += totalPoints;
        combinedOpponentAgg += opponentAgg;
        combinedOpponentTotalPoints += opponentTotalPoints;
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
        combinedTotalPoints,
        combinedOpponentAgg,
        combinedOpponentTotalPoints,
        totalDraws,
        totalWins,
        totalLosses,
        totalGames,
    };
}

export function findBiggestWin(playerResults) {
    let bestWin = null;
    if (playerResults) {
        let bestWinMargin = 0;
        playerResults.forEach((result) => {
            const resultParts = result.split(' - ', 2);

            const teamPart = resultParts[0];
            const teamScore = teamPart.match(/[0-9]+/g)[0].trim();

            const opponentPart = resultParts[1].split(' (')[0];
            const opponentScore = opponentPart.match(/[0-9]+/g)[0].trim();

            const pointsDiff = teamScore - opponentScore;
            if (pointsDiff > 0 && pointsDiff > bestWinMargin) {
                bestWinMargin = pointsDiff;
                bestWin = `${teamScore} - ${opponentScore}`;
            }
        });
    }
    return bestWin;
}
