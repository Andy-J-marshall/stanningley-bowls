import {
    PlayerStatsSummary,
    PlayerStatsTeamSummary,
} from '../types/interfaces';

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

export function isPlayerStatsSummaryType(
    stats: PlayerStatsSummary | PlayerStatsTeamSummary
): stats is PlayerStatsSummary {
    return (stats as PlayerStatsSummary).agg !== undefined;
}

export function checkWinPercAndAverageAreNumbers(
    stats: PlayerStatsTeamSummary
) {
    if (isNaN(stats.winPerc)) {
        stats.winPerc = 0;
    }
    if (isNaN(stats.average)) {
        stats.average = -99;
    }

    return stats;
}

export function checkAllWinPercAndAverageAreNumbers(stats: PlayerStatsSummary) {
    // Overall
    if (isNaN(stats.winPerc)) {
        stats.winPerc = 0;
    }
    if (isNaN(stats.average)) {
        stats.average = -99;
    }

    // Singles
    if (isNaN(stats.singlesWinPerc)) {
        stats.singlesWinPerc = 0;
    }
    if (isNaN(stats.singlesAverage)) {
        stats.singlesAverage = -99;
    }

    // Pairs
    if (isNaN(stats.pairsWinPerc)) {
        stats.pairsWinPerc = 0;
    }
    if (isNaN(stats.pairsAverage)) {
        stats.pairsAverage = -99;
    }

    // Home
    if (isNaN(stats.homeWinPerc)) {
        stats.homeWinPerc = 0;
    }
    if (isNaN(stats.homeAverage)) {
        stats.homeAverage = -99;
    }

    // Singles Home
    if (isNaN(stats.singlesHomeWinPerc)) {
        stats.singlesHomeWinPerc = 0;
    }
    if (isNaN(stats.singlesHomeAverage)) {
        stats.singlesHomeAverage = -99;
    }

    // Pairs Home
    if (isNaN(stats.pairsHomeWinPerc)) {
        stats.pairsHomeWinPerc = 0;
    }
    if (isNaN(stats.pairsHomeAverage)) {
        stats.pairsHomeAverage = -99;
    }

    // Away
    if (isNaN(stats.awayWinPerc)) {
        stats.awayWinPerc = 0;
    }
    if (isNaN(stats.awayAverage)) {
        stats.awayAverage = -99;
    }

    // Singles Away
    if (isNaN(stats.singlesAwayWinPerc)) {
        stats.singlesAwayWinPerc = 0;
    }
    if (isNaN(stats.singlesAwayAverage)) {
        stats.singlesAwayAverage = -99;
    }

    // Pairs Away
    if (isNaN(stats.pairsAwayWinPerc)) {
        stats.pairsAwayWinPerc = 0;
    }
    if (isNaN(stats.pairsAwayAverage)) {
        stats.pairsAwayAverage = -99;
    }

    // Cup
    if (isNaN(stats.cupWinPerc)) {
        stats.cupWinPerc = 0;
    }
    if (isNaN(stats.cupAverage)) {
        stats.cupAverage = -99;
    }

    // Singles Cup
    if (isNaN(stats.singlesCupWinPerc)) {
        stats.singlesCupWinPerc = 0;
    }
    if (isNaN(stats.singlesCupAverage)) {
        stats.singlesCupAverage = -99;
    }

    // Pairs Cup
    if (isNaN(stats.pairsCupWinPerc)) {
        stats.pairsCupWinPerc = 0;
    }
    if (isNaN(stats.pairsCupAverage)) {
        stats.pairsCupAverage = -99;
    }

    return stats;
}
