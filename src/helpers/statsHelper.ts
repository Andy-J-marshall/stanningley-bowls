import { PlayerStatsSummary } from '../types/interfaces';

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

export function checkWinPercAndAverageAreNumbers(stats: PlayerStatsSummary) {
    let verifiedStats = stats;

    // TODO still want the null checks?
    // Overall
    if (verifiedStats.winPerc && isNaN(verifiedStats.winPerc)) {
        verifiedStats.winPerc = 0;
    }
    if (verifiedStats.average && isNaN(verifiedStats.average)) {
        verifiedStats.average = -99;
    }

    // Singles
    if (verifiedStats.singlesWinPerc && isNaN(verifiedStats.singlesWinPerc)) {
        verifiedStats.singlesWinPerc = 0;
    }
    if (verifiedStats.singlesAverage && isNaN(verifiedStats.singlesAverage)) {
        verifiedStats.singlesAverage = -99;
    }

    // Pairs
    if (verifiedStats.pairsWinPerc && isNaN(verifiedStats.pairsWinPerc)) {
        verifiedStats.pairsWinPerc = 0;
    }
    if (verifiedStats.pairsAverage && isNaN(verifiedStats.pairsAverage)) {
        verifiedStats.pairsAverage = -99;
    }

    // Home
    if (verifiedStats.homeWinPerc && isNaN(verifiedStats.homeWinPerc)) {
        verifiedStats.homeWinPerc = 0;
    }
    if (verifiedStats.homeAverage && isNaN(verifiedStats.homeAverage)) {
        verifiedStats.homeAverage = -99;
    }

    // Singles Home
    if (
        verifiedStats.singlesHomeWinPerc &&
        isNaN(verifiedStats.singlesHomeWinPerc)
    ) {
        verifiedStats.singlesHomeWinPerc = 0;
    }
    if (
        verifiedStats.singlesHomeAverage &&
        isNaN(verifiedStats.singlesHomeAverage)
    ) {
        verifiedStats.singlesHomeAverage = -99;
    }

    // Pairs Home
    if (
        verifiedStats.pairsHomeWinPerc &&
        isNaN(verifiedStats.pairsHomeWinPerc)
    ) {
        verifiedStats.pairsHomeWinPerc = 0;
    }
    if (
        verifiedStats.pairsHomeAverage &&
        isNaN(verifiedStats.pairsHomeAverage)
    ) {
        verifiedStats.pairsHomeAverage = -99;
    }

    // Away
    if (verifiedStats.awayWinPerc && isNaN(verifiedStats.awayWinPerc)) {
        verifiedStats.awayWinPerc = 0;
    }
    if (verifiedStats.awayAverage && isNaN(verifiedStats.awayAverage)) {
        verifiedStats.awayAverage = -99;
    }

    // Singles Away
    if (
        verifiedStats.singlesAwayWinPerc &&
        isNaN(verifiedStats.singlesAwayWinPerc)
    ) {
        verifiedStats.singlesAwayWinPerc = 0;
    }
    if (
        verifiedStats.singlesAwayAverage &&
        isNaN(verifiedStats.singlesAwayAverage)
    ) {
        verifiedStats.singlesAwayAverage = -99;
    }

    // Pairs Away
    if (
        verifiedStats.pairsAwayWinPerc &&
        isNaN(verifiedStats.pairsAwayWinPerc)
    ) {
        verifiedStats.pairsAwayWinPerc = 0;
    }
    if (
        verifiedStats.pairsAwayAverage &&
        isNaN(verifiedStats.pairsAwayAverage)
    ) {
        verifiedStats.pairsAwayAverage = -99;
    }

    // Cup
    if (verifiedStats.cupAverage && isNaN(verifiedStats.cupAverage)) {
        verifiedStats.cupAverage = 0;
    }
    if (verifiedStats.cupWinPerc && isNaN(verifiedStats.cupWinPerc)) {
        verifiedStats.cupWinPerc = 0;
    }

    // Singles Cup
    if (
        verifiedStats.singlesCupAverage &&
        isNaN(verifiedStats.singlesCupAverage)
    ) {
        verifiedStats.singlesCupAverage = -99;
    }
    if (
        verifiedStats.singlesCupWinPerc &&
        isNaN(verifiedStats.singlesCupWinPerc)
    ) {
        verifiedStats.singlesCupWinPerc = 0;
    }

    // Pairs Cup
    if (verifiedStats.pairsCupAverage && isNaN(verifiedStats.pairsCupAverage)) {
        verifiedStats.pairsCupAverage = -99;
    }
    if (verifiedStats.pairsCupWinPerc && isNaN(verifiedStats.pairsCupWinPerc)) {
        verifiedStats.pairsCupWinPerc = 0;
    }

    return verifiedStats;
}
