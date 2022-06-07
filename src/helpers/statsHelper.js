export function combineTeamStats(statsArray) {
    let combinedAwayWins = 0;
    let combinedHomeWins = 0;
    let combinedAwayLosses = 0;
    let combinedHomeLosses = 0;
    let combinedHomeDraws = 0;
    let combinedAwayDraws = 0;
    let combinedStanningleyAgg = 0;
    let combinedStanningleyTotalPoints = 0;
    let combinedOpponentAgg = 0;
    let combinedOpponentTotalPoints = 0;
    let combinedBeaten = [];
    let combinedBeatenBy = [];
    let combinedDrawnWith = [];

    statsArray.forEach(stats => {
        const {
            awayWins, homeWins, awayLosses, homeLosses, homeDraws,
            awayDraws, stanningleyAgg, stanningleyTotalPoints,
            opponentAgg, opponentTotalPoints, beaten, beatenBy, drawnWith,
        } = stats;
        combinedAwayWins += awayWins;
        combinedHomeWins += homeWins;
        combinedAwayLosses += awayLosses;
        combinedHomeLosses += homeLosses;
        combinedHomeDraws += homeDraws;
        combinedAwayDraws += awayDraws;
        combinedStanningleyAgg += stanningleyAgg;
        combinedStanningleyTotalPoints += stanningleyTotalPoints;
        combinedOpponentAgg += opponentAgg;
        combinedOpponentTotalPoints += opponentTotalPoints;
        combinedBeaten.push(...beaten);
        combinedBeatenBy.push(...beatenBy);
        combinedDrawnWith.push(...drawnWith);
    });

    const totalDraws = combinedAwayDraws + combinedHomeDraws;
    const totalWins = combinedAwayWins + combinedHomeWins;
    const totalLosses = combinedAwayLosses + combinedHomeLosses;
    const totalGames = totalDraws + totalWins + totalLosses;

    return {
        combinedAwayWins,
        combinedHomeWins,
        combinedAwayLosses,
        combinedHomeLosses,
        combinedHomeDraws,
        combinedAwayDraws,
        combinedStanningleyAgg,
        combinedStanningleyTotalPoints,
        combinedOpponentAgg,
        combinedOpponentTotalPoints,
        combinedBeaten,
        combinedBeatenBy,
        combinedDrawnWith,
        totalDraws,
        totalWins,
        totalLosses,
        totalGames,
    }
}
