import React from 'react';
import { capitalizeText } from '../helpers/utils';

// let {
//     totalAgg, totalAggAgainst, totalPairsAgg, totalPairsAggAgainst, totalScore, totalScoreAgainst, awayLosses, homeLosses,
//     cupLosses, homeWins, awayWins, cupWins, winningPairsPartners, losingPairsPartners, beatenBy, beatenByTeam,
//     beatenOpponents, beatenTeam, dayPlayed, pairLosses, pairWins, pairsPartners, totalHomeAgg, totalHomeAggAgainst,
//     totalAwayAgg, totalAwayAggAgainst, totalHomeScore, totalHomeScoreAgainst, totalAwayScore, totalAwayScoreAgainst,
// } = playerData;

function PlayerRecords(props) {
    const playersStats = props.playersStats;
    const players = Object.keys(playersStats);

    let mostGamesPlayer = [];
    let mostGames = 0;
    let mostWinsPlayer = [];
    let mostWins = 0;
    let bestWinPercPlayer = [];
    let bestWinPerc = 0;
    let bestAveragePlayer = [];
    let bestAverage = 0;
    let bestScorePlayer = [];
    let bestScore = 0;

    players.forEach(player => {
        const p = playersStats[player];
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;
        
        const playedMinGames = totalGames >= 6 ? true : false;
        // TODO the python script is picking up players matches for other teams e.g. Mario/ Shirley
        if (totalGames >= mostGames) {
            if (totalGames > mostGames) {
                mostGamesPlayer = [];
                mostGames = totalGames;
            }
            mostGamesPlayer.push(player);
        }
        if (totalWins >= mostWins) {
            if (totalWins > mostWins) {
                mostWinsPlayer = [];
                mostWins = totalWins;
            }
            mostWinsPlayer.push(player);
        }
        const winPerc = totalWins / totalGames * 100;
        if (winPerc >= bestWinPerc && playedMinGames) {
            if (winPerc > bestWinPerc) {
                bestWinPercPlayer = [];
                bestWinPerc = winPerc;
            }
            bestWinPercPlayer.push(player);
        }
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;
        if (average >= bestAverage && playedMinGames) {
            if (average > bestAverage) {
                bestAveragePlayer = [];
                bestAverage = average;
            }
            bestAveragePlayer.push(player);
        }

        const score = p.totalScore / totalGames;
        if (score >= bestScore && playedMinGames) {
            if (score > bestScore) {
                bestScorePlayer = [];
                bestScore = score;
            }
            bestScorePlayer.push(player);
        }
    })

    return (
        <div>
            <h3>Player Records</h3>
            <p>Most games played = {capitalizeText(mostGamesPlayer)} ({mostGames})</p>
            <p>Most wins = {capitalizeText(mostWinsPlayer)} ({mostWins})</p>
            <p>Best win percentage = {capitalizeText(bestWinPercPlayer)} ({bestWinPerc.toFixed(0)}% - min 6 games)</p>
            <p>Best average = {capitalizeText(bestAveragePlayer)} ({bestAverage.toFixed(2)} - min 6 games)</p>
            <p>Best team score per game = {capitalizeText(bestScorePlayer)} ({bestScore.toFixed(2)} - min 6 games)</p>
        </div>
    );
}

export default PlayerRecords;
