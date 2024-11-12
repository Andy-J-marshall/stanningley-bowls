import { config } from '../config';
import {
    PlayerResultsStatsFile,
    PlayerStatsSummary,
} from '../types/interfaces';

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

export function returnPlayerStats(
    playersStats: PlayerResultsStatsFile,
    player: string
) {
    const stats = playersStats[player];
    if (!stats) {
        return null;
    }

    const {
        totalAgg,
        totalAggAgainst,
        totalPairsAgg,
        totalPairsAggAgainst,
        awayLosses,
        homeLosses,
        cupLosses,
        homeWins,
        awayWins,
        cupWins,
        pairHomeWins,
        pairAwayWins,
        pairCupWins,
        pairHomeLosses,
        pairAwayLosses,
        pairCupLosses,
        pairLosses,
        pairWins,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        results,
        totalPairsHomeAgg,
        totalPairsHomeAggAgainst,
        totalPairsAwayAgg,
        totalPairsAwayAggAgainst,
        availableAgg,
        availablePairsAgg,
        availableHomeAgg,
        availableAwayAgg,
        availablePairsHomeAgg,
        availablePairsAwayAgg,
    } = stats;
    const p = playersStats[player];

    // Wins and losses
    const totalWins = awayWins + homeWins + cupWins;

    const totalLosses = awayLosses + homeLosses + cupLosses;
    const biggestWin = findBiggestWin(results);

    const singlesWins = totalWins - pairWins;
    const singlesHomeWins = homeWins - pairHomeWins;
    const singlesAwayWins = awayWins - pairAwayWins;
    const singlesCupWins = cupWins - pairCupWins;

    // Games played
    const homeGamesPlayed = homeWins + homeLosses;
    const awayGamesPlayed = awayWins + awayLosses;
    const cupGamesPlayed = cupWins + cupLosses;
    const gamesPlayed = homeGamesPlayed + awayGamesPlayed + cupGamesPlayed;
    const pairsGames = pairLosses + pairWins;
    const singlesGames = gamesPlayed - pairsGames;

    const pairHomeGamesPlayed = pairHomeWins + pairHomeLosses;
    const pairAwayGamesPlayed = pairAwayWins + pairAwayLosses;
    const pairCupGamesPlayed = pairCupWins + pairCupLosses;

    const singlesHomeGamesPlayed = homeGamesPlayed - pairHomeGamesPlayed;
    const singlesAwayGamesPlayed = awayGamesPlayed - pairAwayGamesPlayed;
    const singlesCupGamesPlayed =
        singlesGames - singlesHomeGamesPlayed - singlesAwayGamesPlayed;

    // Averages
    const average = (totalAgg - totalAggAgainst) / gamesPlayed;
    const homeAverage = (totalHomeAgg - totalHomeAggAgainst) / homeGamesPlayed;
    const awayAverage = (totalAwayAgg - totalAwayAggAgainst) / awayGamesPlayed;
    const cupAgg = totalAgg - totalAwayAgg - totalHomeAgg;
    const cupAggAgainst =
        totalAggAgainst - totalAwayAggAgainst - totalHomeAggAgainst;
    const cupAverage = (cupAgg - cupAggAgainst) / cupGamesPlayed;

    // Team specific stats
    const possibleTeamNames = config.allTeamsInLeaguesSince2013;

    const propertyNames = Object.keys(p);
    const teamsFound = propertyNames.filter((property) =>
        possibleTeamNames.includes(property.toLowerCase())
    );

    const allTeamStats = teamsFound.map((team) => {
        const teamStats = p[team];
        const teamName = team;

        const teamWins = teamStats.wins;
        const teamLosses = teamStats.games - teamStats.wins;
        const teamGames = teamStats.games;

        const teamAvg = teamGames > 0 ? teamStats.aggDiff / teamGames : null;
        const teamWinPerc =
            teamWins && teamGames > 0 ? (teamWins / teamGames) * 100 : 0;

        return {
            teamName,
            teamWins,
            teamLosses,
            teamGames,
            teamAvg,
            teamWinPerc,
        };
    });

    // Pairs & singles aggregates
    const singlesAgg = totalAgg - totalPairsAgg;
    const singlesAggAgainst = totalAggAgainst - totalPairsAggAgainst;

    const singlesAvg = (singlesAgg - singlesAggAgainst) / singlesGames;
    const pairsAvg = (totalPairsAgg - totalPairsAggAgainst) / pairsGames;

    const totalSinglesHomeAgg = totalHomeAgg - totalPairsHomeAgg;
    const totalSinglesHomeAggAgainst =
        totalHomeAggAgainst - totalPairsHomeAggAgainst;
    const totalSinglesAwayAgg = totalAwayAgg - totalPairsAwayAgg;
    const totalSinglesAwayAggAgainst =
        totalAwayAggAgainst - totalPairsAwayAggAgainst;

    const availableCupAgg = availableAgg - availableHomeAgg - availableAwayAgg;
    const availablePairsCupAgg =
        availablePairsAgg - availablePairsHomeAgg - availablePairsAwayAgg;
    const totalPairsCupAgg =
        totalPairsAgg - totalPairsHomeAgg - totalPairsAwayAgg;
    const totalPairsCupAggAgainst =
        totalPairsAggAgainst -
        totalPairsHomeAggAgainst -
        totalPairsAwayAggAgainst;
    const totalSinglesCupAgg = cupAgg - totalPairsCupAgg;
    const totalSinglesCupAggAgainst = cupAggAgainst - totalPairsCupAggAgainst;

    const pairsCupAgg = totalPairsAgg - totalPairsAwayAgg - totalPairsHomeAgg;
    const pairsCupAggAgainst =
        totalPairsAggAgainst -
        totalPairsAwayAggAgainst -
        totalPairsHomeAggAgainst;

    // Singles averages
    const singlesHomeAverage =
        (totalHomeAgg -
            totalPairsHomeAgg -
            (totalHomeAggAgainst - totalPairsHomeAggAgainst)) /
        (homeGamesPlayed - pairHomeGamesPlayed);
    const singlesAwayAverage =
        (totalAwayAgg -
            totalPairsAwayAgg -
            (totalAwayAggAgainst - totalPairsAwayAggAgainst)) /
        (awayGamesPlayed - pairAwayGamesPlayed);
    const singlesCupAverage =
        (cupAgg - pairsCupAgg - (cupAggAgainst - pairsCupAggAgainst)) /
        (cupGamesPlayed - pairCupGamesPlayed);

    // Pairs averages
    const pairsHomeAverage =
        (totalPairsHomeAgg - totalPairsHomeAggAgainst) / pairHomeGamesPlayed;
    const pairsAwayAverage =
        (totalPairsAwayAgg - totalPairsAwayAggAgainst) / pairAwayGamesPlayed;
    const pairsCupAverage =
        (pairsCupAgg - pairsCupAggAgainst) / pairCupGamesPlayed;

    return {
        totalAgg,
        totalAggAgainst,
        totalPairsAgg,
        totalPairsAggAgainst,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        singlesAgg,
        singlesAggAgainst,
        totalPairsHomeAgg,
        totalPairsHomeAggAgainst,
        totalPairsAwayAgg,
        totalPairsAwayAggAgainst,
        totalPairsCupAgg,
        totalPairsCupAggAgainst,
        totalSinglesHomeAgg,
        totalSinglesHomeAggAgainst,
        totalSinglesAwayAgg,
        totalSinglesAwayAggAgainst,
        totalSinglesCupAgg,
        totalSinglesCupAggAgainst,
        cupAgg,
        cupAggAgainst,
        awayLosses,
        homeLosses,
        pairLosses,
        cupLosses,
        totalLosses,
        pairHomeLosses,
        pairAwayLosses,
        pairCupLosses,
        totalWins,
        homeWins,
        awayWins,
        cupWins,
        singlesWins,
        singlesHomeWins,
        singlesAwayWins,
        singlesCupWins,
        pairWins,
        pairHomeWins,
        pairAwayWins,
        pairCupWins,
        gamesPlayed,
        homeGamesPlayed,
        awayGamesPlayed,
        singlesHomeGamesPlayed,
        singlesAwayGamesPlayed,
        singlesCupGamesPlayed,
        pairHomeGamesPlayed,
        pairAwayGamesPlayed,
        pairCupGamesPlayed,
        cupGamesPlayed,
        pairsGames,
        singlesGames,
        // TODO fix them here instead?
        average,
        homeAverage,
        awayAverage,
        cupAverage,
        singlesAvg,
        pairsAvg,
        singlesHomeAverage,
        singlesAwayAverage,
        singlesCupAverage,
        pairsHomeAverage,
        pairsAwayAverage,
        pairsCupAverage,
        allTeamStats,
        biggestWin,
        results,
        availableAgg,
        availablePairsAgg,
        availableHomeAgg,
        availableAwayAgg,
        availableCupAgg,
        availablePairsHomeAgg,
        availablePairsAwayAgg,
        availablePairsCupAgg,
    };
}

export function returnStructuredResultsArray(results: string[]) {
    const resultsArray = results.map((result: string) => {
        const resultParts = result.split(' - ');

        const homePart = resultParts[0];
        const homeScoreMatch = homePart.match(/[0-9]+/g);
        const homeScore = homeScoreMatch ? homeScoreMatch[0].trim() : '';
        const homePlayer = homePart.split(/[0-9]+/g)[0].trim();

        const awayPart = resultParts[1].split(' (')[0];
        const awayScoreMatch = awayPart.match(/[0-9]+/g);
        const awayScore = awayScoreMatch ? awayScoreMatch[0].trim() : '';
        const awayPlayer = awayPart.split(/[0-9]+/g)[1].trim();

        return {
            home: {
                name: homePlayer,
                score: homeScore,
            },
            away: {
                name: awayPlayer,
                score: awayScore,
            },
        };
    });
    return resultsArray;
}

export function calculateWinPercAndAverage(playerStats: PlayerStatsSummary) {
    const stats = playerStats;

    // Total
    stats.winPerc = (stats.wins / stats.games) * 100;
    stats.average = (stats.agg - stats.aggAgainst) / stats.games;

    // Singles
    stats.singlesWinPerc =
        ((stats.wins - stats.pairsWins) / stats.singlesGames) * 100;
    stats.singlesAverage =
        (stats.singlesAgg - stats.singlesAggAgainst) / stats.singlesGames;

    // Pairs
    stats.pairsWinPerc = (stats.pairsWins / stats.pairsGames) * 100;
    stats.pairsAverage =
        (stats.pairsAgg - stats.pairsAggAgainst) / stats.pairsGames;

    // Home
    stats.homeWinPerc = (stats.homeWins / stats.homeGames) * 100;
    stats.homeAverage =
        (stats.homeAgg - stats.homeAggAgainst) / stats.homeGames;

    // Singles Home
    stats.singlesHomeWinPerc =
        ((stats.homeWins - stats.pairsHomeWins) / stats.singlesHomeGames) * 100;
    stats.singlesHomeAverage =
        (stats.singlesHomeAgg - stats.singlesHomeAggAgainst) /
        stats.singlesHomeGames;

    // Pairs Home
    stats.pairsHomeWinPerc = (stats.pairsHomeWins / stats.pairsHomeGames) * 100;
    stats.pairsHomeAverage =
        (stats.pairsHomeAgg - stats.pairsHomeAggAgainst) / stats.pairsHomeGames;

    // Away
    stats.awayWinPerc = (stats.awayWins / stats.awayGames) * 100;
    stats.awayAverage =
        (stats.awayAgg - stats.awayAggAgainst) / stats.awayGames;

    // Singles Away
    stats.singlesAwayWinPerc =
        ((stats.awayWins - stats.pairsAwayWins) / stats.singlesAwayGames) * 100;
    stats.singlesAwayAverage =
        (stats.singlesAwayAgg - stats.singlesAwayAggAgainst) /
        stats.singlesAwayGames;

    // Pairs Away
    stats.pairsAwayWinPerc = (stats.pairsAwayWins / stats.pairsAwayGames) * 100;
    stats.pairsAwayAverage =
        (stats.pairsAwayAgg - stats.pairsAwayAggAgainst) / stats.pairsAwayGames;

    // Cup
    stats.cupWinPerc = (stats.cupWins / stats.cupGames) * 100;
    stats.cupAverage = (stats.cupAgg - stats.cupAggAgainst) / stats.cupGames;

    // Singles Cup
    stats.singlesCupWinPerc =
        ((stats.cupWins - stats.pairsCupWins) / stats.singlesCupGames) * 100;
    stats.singlesCupAverage =
        (stats.singlesCupAgg - stats.singlesCupAggAgainst) /
        stats.singlesCupGames;

    // Pairs Cup
    stats.pairsCupWinPerc = (stats.pairsCupWins / stats.pairsCupGames) * 100;
    stats.pairsCupAverage =
        (stats.pairsCupAgg - stats.pairsCupAggAgainst) / stats.pairsCupGames;

    return stats;
}
