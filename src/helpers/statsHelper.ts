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

export function checkWinPercAndAverageAreNumbers(stats: any) {
    let verifiedStats = stats;

    if (isNaN(verifiedStats.winPerc)) {
        verifiedStats.winPerc = 0;
    }
    if (isNaN(verifiedStats.average)) {
        verifiedStats.average = -99;
    }
    if (isNaN(verifiedStats.singlesWinPerc)) {
        verifiedStats.singlesWinPerc = 0;
    }
    if (isNaN(verifiedStats.singlesAverage)) {
        verifiedStats.singlesAverage = -99;
    }
    if (isNaN(verifiedStats.pairsWinPerc)) {
        verifiedStats.pairsWinPerc = 0;
    }
    if (isNaN(verifiedStats.pairsAverage)) {
        verifiedStats.pairsAverage = -99;
    }

    // TODO update this

    return verifiedStats;
}
