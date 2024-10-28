import { config } from '../config';
import {
    PlayerResultsStatsFile,
    PlayerStatsSummary,
} from '../types/interfaces';
import { checkWinPercAndAverageAreNumbers } from './statsHelper';

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
        dayPlayed,
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

    // Pairs & singles
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
        homeWins,
        awayWins,
        cupWins,
        pairWins,
        totalWins,
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

export function returnPlayerStatSummary(
    statsToUse: PlayerResultsStatsFile,
    players: string[]
) {
    const statsArray: PlayerStatsSummary[] = [];
    players.sort().forEach((player) => {
        const playerStats = returnPlayerStats(statsToUse, player);
        if (playerStats) {
            let stats = {
                // Total
                player,
                games: playerStats.gamesPlayed,
                wins: playerStats.totalWins,
                winPerc:
                    (playerStats.totalWins / playerStats.gamesPlayed) * 100,
                agg: playerStats.totalAgg,
                aggAgainst: playerStats.totalAggAgainst,
                average:
                    (playerStats.totalAgg - playerStats.totalAggAgainst) /
                    playerStats.gamesPlayed,

                // Singles
                singleGames: playerStats.singlesGames,
                singlesWins: playerStats.totalWins - playerStats.pairWins,
                singlesWinPerc:
                    ((playerStats.totalWins - playerStats.pairWins) /
                        playerStats.singlesGames) *
                    100,
                singlesAgg: playerStats.singlesAgg,
                singlesAggAgainst: playerStats.singlesAggAgainst,
                singlesAverage:
                    (playerStats.singlesAgg - playerStats.singlesAggAgainst) /
                    playerStats.singlesGames,

                // Pairs
                pairsGames: playerStats.pairsGames,
                pairsWins: playerStats.pairWins,
                pairsWinPerc:
                    (playerStats.pairWins / playerStats.pairsGames) * 100,
                pairsAgg: playerStats.totalPairsAgg,
                pairsAggAgainst: playerStats.totalPairsAggAgainst,
                pairsAverage:
                    (playerStats.totalPairsAgg -
                        playerStats.totalPairsAggAgainst) /
                    playerStats.pairsGames,
            };

            stats = checkWinPercAndAverageAreNumbers(stats);

            statsArray.push(stats);
        }
    });
    return statsArray;
}
