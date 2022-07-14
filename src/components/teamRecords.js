import React from 'react';
import RecordsTableDisplay from './recordsTableDisplay';

function TeamRecords(props) {
    const statsArray = props.teamStats;

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
        } = stats;
        const totalGames =
            awayWins +
            homeWins +
            cupWins +
            awayLosses +
            homeLosses +
            cupLosses +
            awayDraws +
            homeDraws;
        if (totalGames > minGames) {
            if (totalGames >= 8) {
                minGames = 8;
            } else {
                minGames = totalGames;
            }
        }
    });

    statsArray.forEach((stats) => {
        const {
            day,
            awayWins,
            homeWins,
            cupWins,
            awayLosses,
            homeLosses,
            cupLosses,
            homeDraws,
            awayDraws,
            stanningleyAgg,
            stanningleyTotalPoints,
            opponentAgg,
            opponentTotalPoints,
        } = stats;
        const wins = awayWins + homeWins + cupWins;
        const losses = awayLosses + homeLosses + cupLosses;
        const draws = awayDraws + homeDraws;
        const totalGames = wins + losses + draws;
        const drawPoints = draws > 0 ? draws * 0.5 : 0;
        const winPercentage = ((wins + drawPoints) / totalGames) * 100;

        const gamesPerMatch = day === 'Monday' || day === 'Wednesday' ? 6 : 8; // there are only 6 games on a Monday and Wednesday
        const pointsPerGame =
            stanningleyTotalPoints /
            gamesPerMatch /
            (totalGames - cupLosses - cupWins); // cup games are decided on pure aggregate
        const aggPerGame = stanningleyAgg / gamesPerMatch / totalGames;
        const pointsConcededPerGame =
            opponentTotalPoints /
            gamesPerMatch /
            (totalGames - cupLosses - cupWins);
        const aggConcededPerGame = opponentAgg / gamesPerMatch / totalGames;

        if (aggPerGame >= bestTeamAggPerGame && totalGames >= minGames) {
            if (aggPerGame !== bestTeamAggPerGame) {
                bestTeamAggPerGameTeam.pop();
            }
            bestTeamAggPerGameTeam.push(`${day} (${totalGames})`);
            bestTeamAggPerGame = aggPerGame;
        }
        if (pointsPerGame >= bestTeamPointsPerGame && totalGames >= minGames) {
            if (pointsPerGame !== bestTeamPointsPerGame) {
                bestTeamPointsPerGameTeam.pop();
            }
            bestTeamPointsPerGameTeam.push(`${day} (${totalGames})`);
            bestTeamPointsPerGame = pointsPerGame;
        }
        if (
            pointsConcededPerGame <= fewestPointsConcededPerGame &&
            totalGames >= minGames
        ) {
            if (pointsConcededPerGame !== fewestPointsConcededPerGame) {
                fewestPointsConcededPerGameTeam.pop();
            }
            fewestPointsConcededPerGameTeam.push(`${day} (${totalGames})`);
            fewestPointsConcededPerGame = pointsConcededPerGame;
        }
        if (
            aggConcededPerGame <= lowestAggConcededPerGame &&
            totalGames >= minGames
        ) {
            if (aggConcededPerGame !== lowestAggConcededPerGame) {
                lowestAggConcededPerGameTeam.pop();
            }
            lowestAggConcededPerGameTeam.push(`${day} (${totalGames})`);
            lowestAggConcededPerGame = aggConcededPerGame;
        }
        if (winPercentage >= bestWinPercentage && totalGames >= minGames) {
            if (winPercentage !== bestWinPercentage) {
                bestWinPercentageTeam.pop();
            }
            bestWinPercentageTeam.push(`${day} (${totalGames})`);
            bestWinPercentage = winPercentage;
        }
    });

    return (
        <div id="team-record">
            <h1>TEAM RECORDS</h1>
            <RecordsTableDisplay
                minGames={minGames}
                playerOrTeam="Team"
                bestWinPerc={bestWinPercentage}
                bestWinPercPlayerOrTeam={bestWinPercentageTeam}
                bestTeamPointsPerGame={bestTeamPointsPerGame}
                bestTeamPointsPerGameTeam={bestTeamPointsPerGameTeam}
                fewestPointsConcededPerGame={fewestPointsConcededPerGame}
                fewestPointsConcededPerGameTeam={
                    fewestPointsConcededPerGameTeam
                }
                bestTeamAggPerGame={bestTeamAggPerGame}
                bestTeamAggPerGameTeam={bestTeamAggPerGameTeam}
                lowestAggConcededPerGame={lowestAggConcededPerGame}
                lowestAggConcededPerGameTeam={lowestAggConcededPerGameTeam}
            />
        </div>
    );
}

export default TeamRecords;
