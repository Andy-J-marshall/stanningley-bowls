import { FullStatsFile } from '../../src/types/interfaces';

export function findTotalNumberOfPlayersForYears(bowlsStats: FullStatsFile) {
    const allPlayers = Object.keys(bowlsStats.playerResults);
    const playerCount = allPlayers.filter((player) => {
        const playerStats = bowlsStats.playerResults[player];
        if (playerStats.totalGamesPlayed > 0) {
            return player;
        }
    }).length;

    return playerCount;
}
