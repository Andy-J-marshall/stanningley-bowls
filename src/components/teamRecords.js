import React from 'react';
import { capitalizeText } from '../helpers/utils';

function TeamRecords(props) {
    const statsArray = props.stats;

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

    statsArray.forEach(stats => {
        const {
            day, awayWins, homeWins, cupWins, awayLosses, homeLosses, cupLosses,
            homeDraws, awayDraws, stanningleyAgg, stanningleyTotalPoints,
            opponentAgg, opponentTotalPoints,
        } = stats;
        const wins = awayWins + homeWins + cupWins;
        const losses = awayLosses + homeLosses + cupLosses;
        const draws = awayDraws + homeDraws;
        const drawPoints = draws > 0 ? draws * 0.5 : 0;
        const totalGames = wins + losses + homeDraws + awayDraws;
        const winPercentage = ((wins + drawPoints) / totalGames) * 100;

        const gamesPerMatch = day === 'Monday' ? 6 : 8;
        const pointsPerGame = (stanningleyTotalPoints / gamesPerMatch) / (totalGames - cupLosses - cupWins); // cup games are decided on pure aggregate
        const aggPerGame = (stanningleyAgg / gamesPerMatch) / totalGames;
        const pointsConcededPerGame = (opponentTotalPoints / gamesPerMatch) / (totalGames - cupLosses - cupWins);
        const aggConcededPerGame = (opponentAgg / gamesPerMatch) / totalGames;

        if (aggPerGame >= bestTeamAggPerGame) {
            if (aggPerGame !== bestTeamAggPerGame) {
                bestTeamAggPerGameTeam.pop();
            }
            bestTeamAggPerGameTeam.push(day);
            bestTeamAggPerGame = aggPerGame;
        }
        if (pointsPerGame >= bestTeamPointsPerGame) {
            if (pointsPerGame !== bestTeamPointsPerGame) {
                bestTeamPointsPerGameTeam.pop();
            }
            bestTeamPointsPerGameTeam.push(day);
            bestTeamPointsPerGame = pointsPerGame;
        }
        if (pointsConcededPerGame <= fewestPointsConcededPerGame) {
            if (pointsConcededPerGame !== fewestPointsConcededPerGame) {
                fewestPointsConcededPerGameTeam.pop();
            }
            fewestPointsConcededPerGameTeam.push(day);
            fewestPointsConcededPerGame = pointsConcededPerGame;
        }
        if (aggConcededPerGame <= lowestAggConcededPerGame) {
            if (aggConcededPerGame !== lowestAggConcededPerGame) {
                lowestAggConcededPerGameTeam.pop();
            }
            lowestAggConcededPerGameTeam.push(day);
            lowestAggConcededPerGame = aggConcededPerGame;
        }
        if (winPercentage >= bestWinPercentage) {
            if (winPercentage !== bestWinPercentage) {
                bestWinPercentageTeam.pop();
            }
            bestWinPercentageTeam.push(day);
            bestWinPercentage = winPercentage;
        }
    });

    return (
        <div id='TeamRecords'>
            <h2>Team Records</h2>
            <p>Best win percentage = {bestWinPercentage.toFixed(0)}%</p>
            <p>Best win percentage Team = {capitalizeText(bestWinPercentageTeam)}</p>
            <p>Best points per game = {bestTeamPointsPerGame.toFixed(1)}/5</p>
            <p>Best points per game team = {capitalizeText(bestTeamPointsPerGameTeam)}</p>
            <p>Best agg per game = {bestTeamAggPerGame.toFixed(1)}/21</p>
            <p>Best agg per game team = {capitalizeText(bestTeamAggPerGameTeam)}</p>
            <p>Fewest points conceded per game = {fewestPointsConcededPerGame.toFixed(1)}/5</p>
            <p>Fewest points conceded per game team = {capitalizeText(fewestPointsConcededPerGameTeam)}</p>
            <p>Fewest aggregated points conceded per game = {lowestAggConcededPerGame.toFixed(1)}/21</p>
            <p>Fewest aggregated points conceded per game team = {capitalizeText(lowestAggConcededPerGameTeam)}</p>
        </div>
    );
}

export default TeamRecords;
