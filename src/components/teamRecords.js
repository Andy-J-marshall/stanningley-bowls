import RecordsTableDisplay from './recordsTableDisplay';

function TeamRecords(props) {
    const teamResults = props.teamResults;

    let bestWinPercentage = -1;
    let bestWinPercentageTeam = [];
    let bestTeamPointsPerGame = -1;
    let bestTeamPointsPerGameTeam = [];
    let bestTeamAggPerGame = -1;
    let bestTeamAggPerGameTeam = [];
    let fewestPointsConcededPerGame = 100;
    let fewestPointsConcededPerGameTeam = [];
    let lowestAggConcededPerGame = 1000;
    let lowestAggConcededPerGameTeam = [];
    let minGames = 1;

    // This sets the minimum number of games required for the stats to be counted
    if (teamResults) {
        teamResults.forEach((stats) => {
            const { totalGamesPlayed } = stats;
            if (totalGamesPlayed > minGames) {
                if (totalGamesPlayed >= 7) {
                    minGames = 7;
                } else {
                    minGames = totalGamesPlayed;
                }
            }
        });

        teamResults.forEach((stats) => {
            const {
                day,
                wins,
                draws,
                agg,
                totalPoints,
                opponentAgg,
                opponentTotalPoints,
                gamesWithout54321ScoringSystem,
                totalGamesPlayed
            } = stats;

            const drawPoints = draws > 0 ? draws * 0.5 : 0;
            const winPercentage = ((wins + drawPoints) / totalGamesPlayed) * 100;

            // TODO get this from config instead?
            let gamesPerMatch = 8;
            if (
                day.toLowerCase().includes('leeds') &&
                (day.toLowerCase().includes('wednesday') ||
                    day.toLowerCase().includes('monday'))
            ) {
                gamesPerMatch = 6;
            }

            if (!day.toLowerCase().includes('leeds') && day.toLowerCase().includes('pairs')) {
                gamesPerMatch = 4;
            }

            const pointsPerGame =
                totalPoints /
                gamesPerMatch /
                (totalGamesPlayed - gamesWithout54321ScoringSystem); // only league games in the Leeds league use 54321 scoring system
            const aggPerGame = agg / gamesPerMatch / totalGamesPlayed;
            const pointsConcededPerGame =
                opponentTotalPoints /
                gamesPerMatch /
                (totalGamesPlayed - gamesWithout54321ScoringSystem);
            const aggConcededPerGame = opponentAgg / gamesPerMatch / totalGamesPlayed;

            if (aggPerGame >= bestTeamAggPerGame && totalGamesPlayed >= minGames) {
                if (aggPerGame !== bestTeamAggPerGame) {
                    bestTeamAggPerGameTeam.pop();
                }
                bestTeamAggPerGameTeam.push(`${day} (${totalGamesPlayed})`);
                bestTeamAggPerGame = aggPerGame;
            }
            if (
                pointsPerGame >= bestTeamPointsPerGame &&
                totalGamesPlayed >= minGames
            ) {
                if (pointsPerGame !== bestTeamPointsPerGame) {
                    bestTeamPointsPerGameTeam.pop();
                }
                bestTeamPointsPerGameTeam.push(`${day} (${totalGamesPlayed})`);
                bestTeamPointsPerGame = pointsPerGame;
            }
            if (
                pointsConcededPerGame <= fewestPointsConcededPerGame &&
                totalGamesPlayed >= minGames
            ) {
                if (pointsConcededPerGame !== fewestPointsConcededPerGame) {
                    fewestPointsConcededPerGameTeam.pop();
                }
                fewestPointsConcededPerGameTeam.push(`${day} (${totalGamesPlayed})`);
                fewestPointsConcededPerGame = pointsConcededPerGame;
            }
            if (
                aggConcededPerGame <= lowestAggConcededPerGame &&
                totalGamesPlayed >= minGames
            ) {
                if (aggConcededPerGame !== lowestAggConcededPerGame) {
                    lowestAggConcededPerGameTeam.pop();
                }
                lowestAggConcededPerGameTeam.push(`${day} (${totalGamesPlayed})`);
                lowestAggConcededPerGame = aggConcededPerGame;
            }
            if (winPercentage >= bestWinPercentage && totalGamesPlayed >= minGames) {
                if (winPercentage !== bestWinPercentage) {
                    bestWinPercentageTeam.pop();
                }
                bestWinPercentageTeam.push(`${day} (${totalGamesPlayed})`);
                bestWinPercentage = winPercentage;
            }
        });

        if (fewestPointsConcededPerGameTeam.length > 0) {
            return (
                <div id="team-record" className="center">
                    <br />
                    <h1>TEAM RECORDS</h1>
                    <RecordsTableDisplay
                        minGames={minGames}
                        playerOrTeam="Team"
                        bestWinPerc={bestWinPercentage}
                        bestWinPercPlayerOrTeam={bestWinPercentageTeam}
                        bestTeamPointsPerGame={bestTeamPointsPerGame}
                        bestTeamPointsPerGameTeam={bestTeamPointsPerGameTeam}
                        fewestPointsConcededPerGame={
                            fewestPointsConcededPerGame
                        }
                        fewestPointsConcededPerGameTeam={
                            fewestPointsConcededPerGameTeam
                        }
                        bestTeamAggPerGame={bestTeamAggPerGame}
                        bestTeamAggPerGameTeam={bestTeamAggPerGameTeam}
                        lowestAggConcededPerGame={lowestAggConcededPerGame}
                        lowestAggConcededPerGameTeam={
                            lowestAggConcededPerGameTeam
                        }
                    />
                </div>
            );
        } else {
            return null;
        }
    } else {
        // this will not be displayed until every team has played at least 1 game
        return null;
    }
}

export default TeamRecords;
