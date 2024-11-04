export function returnTabName(teamName: string) {
    let displayName = teamName.substring(0, 3).toUpperCase();
    if (teamName.toLowerCase().includes(' vets')) {
        displayName += ' (VETS)';
    }
    if (teamName.toLowerCase().includes(' (b)')) {
        displayName += ' (B)';
    }
    if (teamName.toLowerCase().includes(' pairs')) {
        displayName += ' (PAIRS)';
    }
    return displayName;
}

// TODO change type to PlayerStatsSummary
export function checkWinPercAndAverageAreNumbers(stats: any) {
    let verifiedStats = stats;

    // Overall
    if (isNaN(verifiedStats.winPerc)) {
        verifiedStats.winPerc = 0;
    }
    if (isNaN(verifiedStats.average)) {
        verifiedStats.average = -99;
    }

    // Singles
    if (isNaN(verifiedStats.singlesWinPerc)) {
        verifiedStats.singlesWinPerc = 0;
    }
    if (isNaN(verifiedStats.singlesAverage)) {
        verifiedStats.singlesAverage = -99;
    }

    // Pairs
    if (isNaN(verifiedStats.pairsWinPerc)) {
        verifiedStats.pairsWinPerc = 0;
    }
    if (isNaN(verifiedStats.pairsAverage)) {
        verifiedStats.pairsAverage = -99;
    }

    // Home
    if (isNaN(verifiedStats.homeWinPerc)) {
        verifiedStats.homeWinPerc = 0;
    }
    if (isNaN(verifiedStats.homeAverage)) {
        verifiedStats.homeAverage = -99;
    }

    // Singles Home
    if (isNaN(verifiedStats.singlesHomeWinPerc)) {
        verifiedStats.singlesHomeWinPerc = 0;
    }
    if (isNaN(verifiedStats.singlesHomeAverage)) {
        verifiedStats.singlesHomeAverage = -99;
    }

    // Pairs Home
    if (isNaN(verifiedStats.pairsHomeWinPerc)) {
        verifiedStats.pairsHomeWinPerc = 0;
    }
    if (isNaN(verifiedStats.pairsHomeAverage)) {
        verifiedStats.pairsHomeAverage = -99;
    }

    // Away
    if (isNaN(verifiedStats.awayWinPerc)) {
        verifiedStats.awayWinPerc = 0;
    }
    if (isNaN(verifiedStats.awayAverage)) {
        verifiedStats.awayAverage = -99;
    }

    // Singles Away
    if (isNaN(verifiedStats.singlesAwayWinPerc)) {
        verifiedStats.singlesAwayWinPerc = 0;
    }
    if (isNaN(verifiedStats.singlesAwayAverage)) {
        verifiedStats.singlesAwayAverage = -99;
    }

    // Pairs Away
    if (isNaN(verifiedStats.pairsAwayWinPerc)) {
        verifiedStats.pairsAwayWinPerc = 0;
    }
    if (isNaN(verifiedStats.pairsAwayAverage)) {
        verifiedStats.pairsAwayAverage = -99;
    }

    // Cup
    if (isNaN(verifiedStats.cupAverage)) {
        verifiedStats.cupAverage = 0;
    }
    if (isNaN(verifiedStats.cupWinPerc)) {
        verifiedStats.cupWinPerc = 0;
    }

    // Singles Cup
    if (isNaN(verifiedStats.singlesCupAverage)) {
        verifiedStats.singlesCupAverage = -99;
    }
    if (isNaN(verifiedStats.singlesCupWinPerc)) {
        verifiedStats.singlesCupWinPerc = 0;
    }

    // Pairs Cup
    if (isNaN(verifiedStats.pairsCupAverage)) {
        verifiedStats.pairsCupAverage = -99;
    }
    if (isNaN(verifiedStats.pairsCupWinPerc)) {
        verifiedStats.pairsCupWinPerc = 0;
    }

    return verifiedStats;
}
