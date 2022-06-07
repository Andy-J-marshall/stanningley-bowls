import React from 'react';

function TeamRecords(props) {
    const statsArray = props.stats;

    let bestWinPercentage = 0;
    let bestWinPercentageTeam = '';
    let bestTeamPointsPerGame = 0;
    let bestTeamPointsPerGameTeam = '';
    let bestTeamAggPerGame = 0;
    let bestTeamAggPerGameTeam = '';
    let fewestPointsConcededPerGame = 100;
    let fewestPointsConcededPerGameTeam = '';
    let fewestAggConcededPerGame = 1000;
    let fewestAggConcededPerGameTeam = '';

    statsArray.forEach(stats => {
        const {
            day, awayWins, homeWins, awayLosses, homeLosses, homeDraws,
            awayDraws, stanningleyAgg, stanningleyTotalPoints,
            opponentAgg, opponentTotalPoints,
        } = stats;
        const wins = awayWins + homeWins;
        const losses = awayLosses + homeLosses;
        const draws = awayDraws + homeDraws;
        const drawPoints = draws > 0 ? draws * 0.5 : 0;
        const totalGames = wins + losses + homeDraws + awayDraws;
        const winPercentage = ((wins + drawPoints) / totalGames) * 100;

        const gamesPerMatch = day === 'Monday' ? 6 : 8;
        const pointsPerGame = (stanningleyTotalPoints / gamesPerMatch) / totalGames;
        const aggPerGame = (stanningleyAgg / gamesPerMatch) / totalGames;
        const pointsConcededPerGame = (opponentTotalPoints / gamesPerMatch) / totalGames;
        const aggConcededPerGame = (opponentAgg / gamesPerMatch) / totalGames;
        // TODO handle when values are the same. Sort by games played? Use an array instead?
        // TODO 2 decimal places?
        if (aggPerGame > bestTeamAggPerGame) {
            bestTeamAggPerGame = aggPerGame;
            bestTeamAggPerGameTeam = day;
        }
        if (pointsPerGame > bestTeamPointsPerGame) {
            bestTeamPointsPerGame = pointsPerGame;
            bestTeamPointsPerGameTeam = day;
        }
        if (pointsConcededPerGame < fewestPointsConcededPerGame) {
            fewestPointsConcededPerGame = pointsConcededPerGame;
            fewestPointsConcededPerGameTeam = day;
        }
        if (aggConcededPerGame < fewestAggConcededPerGame) {
            fewestAggConcededPerGame = aggConcededPerGame;
            fewestAggConcededPerGameTeam = day;
        }
        if (winPercentage > bestWinPercentage) {
            bestWinPercentage = winPercentage;
            bestWinPercentageTeam = day;
        }
    });

    return (
        <div id='TeamRecords'>
            <h2>Team Records</h2>
            <p>Best win percentage = {bestWinPercentage}%</p>
            <p>Best win percentage Team = {bestWinPercentageTeam}</p>
            <p>Best points per game = {bestTeamPointsPerGame}/5</p>
            <p>Best points per game team = {bestTeamPointsPerGameTeam}</p>
            <p>Best agg per game = {bestTeamAggPerGame}/21</p>
            <p>Best agg per game team = {bestTeamAggPerGameTeam}</p>
            <p>Fewest points conceded per game = {fewestPointsConcededPerGame}/5</p>
            <p>Fewest points conceded per game team = {fewestPointsConcededPerGameTeam}</p>
            <p>Fewest aggregated points conceded per game = {fewestAggConcededPerGame}/21</p>
            <p>Fewest aggregated points conceded per game team = {fewestAggConcededPerGameTeam}</p>
        </div>
    );
}

export default TeamRecords;
