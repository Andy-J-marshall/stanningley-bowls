import {
    ConfigTeamData,
    PlayerResultsStatsFile,
    TeamResultsStatsFile,
} from '../types/interfaces';
import { checkWinPercAndAverageAreNumbers } from './statsHelper';

export function combineTeamStats(statsArray: TeamResultsStatsFile[]) {
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

// TODO this method for all years too
export function returnTeamNamesWithGames(playerStats: PlayerResultsStatsFile) {
    const playerNames = Object.keys(playerStats).sort();
    const daysPlayed: string[] = [];

    playerNames.forEach((player) => {
        const possibleDays = Object.keys(playerStats[player]);
        possibleDays.forEach((day) => {
            const stats = playerStats[player][day];
            if (stats?.games > 0) {
                daysPlayed.push(day);
            }
        });
    });

    const uniqueDays = Array.from(new Set(daysPlayed)).sort();
    return uniqueDays;
}

export function returnPlayerStatsForTeam(
    playerStats: PlayerResultsStatsFile,
    day: string
) {
    const allPlayerStats = Object.keys(playerStats)
        .sort()
        .map((player) => {
            const stats = playerStats[player][day.toLowerCase()];
            const { games, wins, aggDiff } = stats;
            let playerDayStats = {
                player,
                games,
                wins,
                average: aggDiff / games,
                winPerc: (wins / games) * 100,
                aggDiff,
            };
            playerDayStats = checkWinPercAndAverageAreNumbers(playerDayStats);
            return playerDayStats;
        });
    return allPlayerStats;
}

export function findTeamStats(
    teamData: ConfigTeamData,
    teamResults: TeamResultsStatsFile[] | undefined
) {
    let teamName = '';
    let teamStats = null;
    let bTeamStats = null;

    // Find A team stats
    for (const team of teamData.teamNames) {
        const teamLowerCase = team.toLowerCase();
        const teamResult = teamResults?.find((team: TeamResultsStatsFile) => {
            return team.day.toLowerCase() === teamLowerCase;
        });

        if (teamResult) {
            if (teamResult.totalGamesPlayed > 0) {
                teamStats = teamResult;
                teamName = teamLowerCase;
                break;
            }
        }

        // Check for a team with an (a) suffix if no team found
        const statsWithASuffix = teamResults?.find(
            (teamResult: TeamResultsStatsFile) => {
                return teamResult.day.toLowerCase() === teamLowerCase + ' (a)';
            }
        );
        if (statsWithASuffix && statsWithASuffix.totalGamesPlayed > 0) {
            teamStats = statsWithASuffix;
            teamName = teamLowerCase;
            break;
        }
    }

    // Find B team stats if they exist
    if (teamData.bTeamForLeagueBool) {
        bTeamStats = teamResults?.find((teamResult: TeamResultsStatsFile) => {
            return (
                teamResult.day.toLowerCase() ===
                teamName.replace(' (a)', '') + ' (b)'
            );
        });
    }

    if (!bTeamStats) {
        bTeamStats = null;
    }

    return { teamName, teamStats, bTeamStats };
}
