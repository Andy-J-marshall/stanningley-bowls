import RecordsTableDisplay from './recordsTableDisplay';
import config from '../config';

function TeamRecords(props) {
    const teamResults = props.teamResults;

    let bestWinPercentage = -1;
    let bestWinPercentageTeam = [];
    let bestTeamAggPerGame = -1;
    let bestTeamAggPerGameTeam = [];
    let lowestAggConcededPerGame = 1000;
    let lowestAggConcededPerGameTeam = [];
    let bestWinMargin = -1;
    let bestWinMarginTeam = [];
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
                totalGamesPlayed
            } = stats;

            const winPercentage = ((wins) / totalGamesPlayed) * 100;

            const team = config.teams.find(t => {
                return t.name === config.days[day.toLowerCase()]
            })
            const gamesPerMatch = team?.numberOfGames ? team.numberOfGames : 8

            const aggPerGame = agg / gamesPerMatch / totalGamesPlayed;
            const aggConcededPerGame = opponentAgg / gamesPerMatch / totalGamesPlayed;

            if (winPercentage >= bestWinPercentage && totalGamesPlayed >= minGames) {
                if (winPercentage !== bestWinPercentage) {
                    bestWinPercentageTeam.pop();
                }
                bestWinPercentageTeam.push(config.days[day.toLowerCase()]);
                bestWinPercentage = winPercentage;
            }

            const winMargin = agg - opponentAgg;
            if (winMargin >= bestWinMargin && totalGamesPlayed >= minGames) {
                if (winMargin !== bestWinMargin) {
                    bestWinMarginTeam.pop();
                }
                bestWinMarginTeam.push(config.days[day.toLowerCase()]);
                bestWinMargin = winMargin;
            }

            // Excludes teams that don't play to 21 as these stats won't make sense otherwise
            if (team.games21UpBool) {
                if (
                    aggConcededPerGame <= lowestAggConcededPerGame &&
                    totalGamesPlayed >= minGames
                ) {
                    if (aggConcededPerGame !== lowestAggConcededPerGame) {
                        lowestAggConcededPerGameTeam.pop();
                    }
                    lowestAggConcededPerGameTeam.push(config.days[day.toLowerCase()]);
                    lowestAggConcededPerGame = aggConcededPerGame;
                }

                if (aggPerGame >= bestTeamAggPerGame && totalGamesPlayed >= minGames) {
                    if (aggPerGame !== bestTeamAggPerGame) {
                        bestTeamAggPerGameTeam.pop();
                    }
                    bestTeamAggPerGameTeam.push(config.days[day.toLowerCase()]);
                    bestTeamAggPerGame = aggPerGame;
                }
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
                        lowestAggConcededPerGameTeam={lowestAggConcededPerGameTeam}
                        bestWinMargin={bestWinMargin}
                        bestWinMarginTeam={bestWinMarginTeam}
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
