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

    players.forEach(player => {
        const p = playersStats[player];
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;
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
        if (winPerc >= bestWinPerc && totalGames >= 6) {
            if (winPerc > bestWinPerc) {
                bestWinPercPlayer = [];
                bestWinPerc = winPerc;
            }
            bestWinPercPlayer.push(player);
        }
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;
        if (average >= bestAverage && totalGames >= 6) {
            if (average > bestAverage) {
                bestAveragePlayer = [];
                bestAverage = average;
            }
            bestAveragePlayer.push(player);
        }
        // TODO 
        // most points scored? Most team points?
        // Split home and away? Day?
    })

    return (
        <div>
            <h2>Player Records</h2>
            <p>Most games played = {capitalizeText(mostGamesPlayer)} ({mostGames})</p>
            <p>Most wins = {capitalizeText(mostWinsPlayer)} ({mostWins})</p>
            <p>Best win percentage = {capitalizeText(bestWinPercPlayer)} ({bestWinPerc}% - min 6 games)</p>
            <p>Best average = {capitalizeText(bestAveragePlayer)} ({bestAverage} - min 6 games)</p>
        </div>
    );
}

export default PlayerRecords;
