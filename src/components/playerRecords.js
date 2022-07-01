import React from 'react';
import { capitalizeText } from '../helpers/utils';

function PlayerRecords(props) {
    const playersStats = props.playersStats;
    const players = Object.keys(playersStats);

    let mostMondayWinsPlayer = [];
    let mostMondayWins = 0;
    let mostTuesdayWinsPlayer = [];
    let mostTuesdayWins = 0;
    let mostThursdayWinsPlayer = [];
    let mostThursdayWins = 0;
    let mostSaturdayWinsPlayer = [];
    let mostSaturdayWins = 0;
    let mostGamesPlayer = [];
    let mostGames = 0;
    let mostWinsPlayer = [];
    let mostWins = 0;
    let bestWinPercPlayer = [];
    let bestWinPerc = 0;
    let bestAveragePlayer = [];
    let bestAverage = -21;
    let bestScorePlayer = [];
    let bestScore = 0;

    players.forEach((player) => {
        const p = playersStats[player];
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;

        const { monday, tuesday, thursday, saturday } = p;
        const mondayWins = monday.wins;
        const mondayGames = monday.games;
        const mondayAvg = monday.aggDiff / mondayGames;
        const tuesdayWins = tuesday.wins;
        const tuesdayGames = tuesday.games;
        const tuesdayAvg = tuesday.aggDiff / tuesdayGames;
        const thursdayWins = thursday.wins;
        const thursdayGames = thursday.games;
        const thursdayAvg = thursday.aggDiff / thursdayGames;
        const saturdayWins = saturday.wins;
        const saturdayGames = saturday.games;
        const saturdayAvg = saturday.aggDiff / saturdayGames;

        const playedMinGames = totalGames >= 6 ? true : false;

        if (mondayWins >= mostMondayWins) {
            if (mondayWins > mostMondayWins) {
                mostMondayWinsPlayer = [];
                mostMondayWins = mondayWins;
            }
            mostMondayWinsPlayer.push(player);
        }
        if (tuesdayWins >= mostTuesdayWins) {
            if (tuesdayWins > mostTuesdayWins) {
                mostTuesdayWinsPlayer = [];
                mostTuesdayWins = tuesdayWins;
            }
            mostTuesdayWinsPlayer.push(player);
        }
        if (thursdayWins >= mostThursdayWins) {
            if (thursdayWins > mostThursdayWins) {
                mostThursdayWinsPlayer = [];
                mostThursdayWins = thursdayWins;
            }
            mostThursdayWinsPlayer.push(player);
        }
        if (saturdayWins >= mostSaturdayWins) {
            if (saturdayWins > mostSaturdayWins) {
                mostSaturdayWinsPlayer = [];
                mostSaturdayWins = saturdayWins;
            }
            mostSaturdayWinsPlayer.push(player);
        }
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
            mostWinsPlayer.push(`${player} -${totalGames} games`);
        }
        const winPerc = (totalWins / totalGames) * 100;
        if (winPerc >= bestWinPerc && playedMinGames) {
            if (winPerc > bestWinPerc) {
                bestWinPercPlayer = [];
                bestWinPerc = winPerc;
            }
            bestWinPercPlayer.push(`${player} - ${totalGames} games`);
        }
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;
        if (average >= bestAverage && playedMinGames) {
            if (average > bestAverage) {
                bestAveragePlayer = [];
                bestAverage = average;
            }
            bestAveragePlayer.push(`${player} - ${totalGames} games`);
        }

        const score = p.totalScore / totalGames;
        if (score >= bestScore && playedMinGames) {
            if (score > bestScore) {
                bestScorePlayer = [];
                bestScore = score;
            }
            bestScorePlayer.push(`${player} - ${totalGames} games`);
        }
    });

    return (
        <div>
            <h3>Player Records</h3>
            {/* TODO also do average and most games played */}
            {mostGames > 0 && (
                <p>
                    Most games played = {mostGames} (
                    {capitalizeText(mostGamesPlayer)})
                </p>
            )}
            {mostWins > 0 && (
                <p>
                    Most wins = {mostWins} ({capitalizeText(mostWinsPlayer)})
                </p>
            )}
            <div>
                {mostMondayWins > 0 && (
                    <p>
                        Most Monday wins = {mostMondayWins} (
                        {capitalizeText(mostMondayWinsPlayer)})
                    </p>
                )}
                {mostTuesdayWins > 0 && (
                    <p>
                        Most Tuesday wins = {mostTuesdayWins} (
                        {capitalizeText(mostTuesdayWinsPlayer)})
                    </p>
                )}
                {mostThursdayWins > 0 && (
                    <p>
                        Most Thursday wins = {mostThursdayWins} (
                        {capitalizeText(mostThursdayWinsPlayer)})
                    </p>
                )}
                {mostSaturdayWins > 0 && (
                    <p>
                        Most Saturday wins = {mostSaturdayWins} (
                        {capitalizeText(mostSaturdayWinsPlayer)})
                    </p>
                )}
            </div>
            {bestWinPerc > 0 && (
                <p>
                    Best win percentage = {bestWinPerc.toFixed(0)}% (
                    {capitalizeText(bestWinPercPlayer)})
                </p>
            )}
            {bestAverage > -21 && (
                <p>
                    Best average = {bestAverage.toFixed(2)} (
                    {capitalizeText(bestAveragePlayer)})
                </p>
            )}
            {bestScore > 0 && (
                <p>
                    Best average team score per game = {bestScore.toFixed(2)} (
                    {capitalizeText(bestScorePlayer)})
                </p>
            )}
            <p>* minimum of 6 games played</p>
        </div>
    );
}

export default PlayerRecords;
