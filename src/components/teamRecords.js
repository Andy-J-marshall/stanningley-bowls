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
        const drawPoints = draws > 0 ? draws * 0.5 : 0;
        const totalGames = wins + losses + homeDraws + awayDraws;
        const winPercentage = ((wins + drawPoints) / totalGames) * 100;

        const gamesPerMatch = day === 'Monday' ? 6 : 8;
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

        if (aggPerGame >= bestTeamAggPerGame) {
            if (aggPerGame !== bestTeamAggPerGame) {
                bestTeamAggPerGameTeam.pop();
            }
            bestTeamAggPerGameTeam.push(`${day} (${totalGames} games)`);
            bestTeamAggPerGame = aggPerGame;
        }
        if (pointsPerGame >= bestTeamPointsPerGame) {
            if (pointsPerGame !== bestTeamPointsPerGame) {
                bestTeamPointsPerGameTeam.pop();
            }
            bestTeamPointsPerGameTeam.push(`${day} (${totalGames} games)`);
            bestTeamPointsPerGame = pointsPerGame;
        }
        if (pointsConcededPerGame <= fewestPointsConcededPerGame) {
            if (pointsConcededPerGame !== fewestPointsConcededPerGame) {
                fewestPointsConcededPerGameTeam.pop();
            }
            fewestPointsConcededPerGameTeam.push(
                `${day} (${totalGames} games)`
            );
            fewestPointsConcededPerGame = pointsConcededPerGame;
        }
        if (aggConcededPerGame <= lowestAggConcededPerGame) {
            if (aggConcededPerGame !== lowestAggConcededPerGame) {
                lowestAggConcededPerGameTeam.pop();
            }
            lowestAggConcededPerGameTeam.push(`${day} (${totalGames} games)`);
            lowestAggConcededPerGame = aggConcededPerGame;
        }
        if (winPercentage >= bestWinPercentage) {
            if (winPercentage !== bestWinPercentage) {
                bestWinPercentageTeam.pop();
            }
            bestWinPercentageTeam.push(`${day} (${totalGames} games)`);
            bestWinPercentage = winPercentage;
        }
    });

    return (
        <div id="TeamRecords">
            <h3>Team Records</h3>
            {bestWinPercentage > 0 && (
                <div>
                    <p>
                        Best win percentage = {bestWinPercentage.toFixed(0)}% -{' '}
                        {capitalizeText(bestWinPercentageTeam)}
                    </p>
                </div>
            )}

            {bestTeamPointsPerGame > 0 && (
                <div>
                    <p>
                        Best points per game ={' '}
                        {bestTeamPointsPerGame.toFixed(1)} / 5 -{' '}
                        {capitalizeText(bestTeamPointsPerGameTeam)}
                    </p>
                </div>
            )}
            {bestTeamAggPerGame > 0 && (
                <div>
                    <p>
                        Best agg per game = {bestTeamAggPerGame.toFixed(1)} / 21
                        - {capitalizeText(bestTeamAggPerGameTeam)}
                    </p>
                </div>
            )}
            {fewestPointsConcededPerGame >= 0 && (
                <div>
                    <p>
                        Fewest points conceded per game ={' '}
                        {fewestPointsConcededPerGame.toFixed(1)} / 5 -{' '}
                        {capitalizeText(fewestPointsConcededPerGameTeam)}
                    </p>
                </div>
            )}

            {lowestAggConcededPerGame > 0 && (
                <div>
                    <p>
                        Fewest aggregated points conceded per game ={' '}
                        {lowestAggConcededPerGame.toFixed(1)} / 21 -{' '}
                        {capitalizeText(lowestAggConcededPerGameTeam)}
                    </p>
                </div>
            )}
        </div>
    );
}

export default TeamRecords;
