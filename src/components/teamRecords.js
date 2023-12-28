import RecordsTableDisplay from './recordsTableDisplay';

function TeamRecords(props) {
    const teamResults = props.teamResults;

    let bestWinPercentage = -1;
    let bestWinPercentageTeam = [];
    let bestTeamAggPerGame = -1;
    let bestTeamAggPerGameTeam = [];
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
                opponentAgg,
                gamesWithout54321ScoringSystem,
                totalGamesPlayed
            } = stats;

            const drawPercCalculator = draws > 0 ? draws * 0.5 : 0;
            const winPercentage = ((wins + drawPercCalculator) / totalGamesPlayed) * 100;

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

            const aggPerGame = agg / gamesPerMatch / totalGamesPlayed;
            const aggConcededPerGame = opponentAgg / gamesPerMatch / totalGamesPlayed;

            if (aggPerGame >= bestTeamAggPerGame && totalGamesPlayed >= minGames) {
                if (aggPerGame !== bestTeamAggPerGame) {
                    bestTeamAggPerGameTeam.pop();
                }
                bestTeamAggPerGameTeam.push(`${day} (${totalGamesPlayed})`);
                bestTeamAggPerGame = aggPerGame;
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

        if (bestTeamAggPerGame >= 0) {
            return (
                <div id="team-record" className="center">
                    <br />
                    <h1>TEAM RECORDS</h1>
                    <RecordsTableDisplay
                        minGames={minGames}
                        playerOrTeam="Team"
                        bestWinPerc={bestWinPercentage}
                        bestWinPercPlayerOrTeam={bestWinPercentageTeam}
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
