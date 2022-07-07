export function combineTeamStats(statsArray) {
    let combinedAwayWins = 0;
    let combinedHomeWins = 0;
    let combinedCupWins = 0;
    let combinedAwayLosses = 0;
    let combinedHomeLosses = 0;
    let combinedCupLosses = 0;
    let combinedHomeDraws = 0;
    let combinedAwayDraws = 0;
    let combinedStanningleyAgg = 0;
    let combinedStanningleyTotalPoints = 0;
    let combinedOpponentAgg = 0;
    let combinedOpponentTotalPoints = 0;
    let combinedBeaten = [];
    let combinedBeatenBy = [];
    let combinedDrawnWith = [];
    let combinedResults = [];

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
            stanningleyAgg,
            stanningleyTotalPoints,
            opponentAgg,
            opponentTotalPoints,
            beaten,
            beatenBy,
            drawnWith,
            results,
        } = stats;
        combinedAwayWins += awayWins;
        combinedHomeWins += homeWins;
        combinedAwayLosses += awayLosses;
        combinedHomeLosses += homeLosses;
        combinedHomeDraws += homeDraws;
        combinedAwayDraws += awayDraws;
        combinedCupWins += cupWins;
        combinedCupLosses += cupLosses;
        combinedStanningleyAgg += stanningleyAgg;
        combinedStanningleyTotalPoints += stanningleyTotalPoints;
        combinedOpponentAgg += opponentAgg;
        combinedOpponentTotalPoints += opponentTotalPoints;
        combinedBeaten.push(...beaten);
        combinedBeatenBy.push(...beatenBy);
        combinedDrawnWith.push(...drawnWith);
        combinedResults.push(...results);
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
        combinedResults,
    };
}
