import React from 'react';
import TeamTabs from './teamTabs';
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
    let bestMondayAveragePlayer = [];
    let bestMondayAverage = -21;
    let bestTuesdayAveragePlayer = [];
    let bestTuesdayAverage = -21;
    let bestThursdayAveragePlayer = [];
    let bestThursdayAverage = -21;
    let bestSaturdayAveragePlayer = [];
    let bestSaturdayAverage = -21;
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
        const winPerc = (totalWins / totalGames) * 100;
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;
        const score = p.totalScore / totalGames;

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

        const playedMinGames = totalGames >= 10 ? true : false;

        if (mondayAvg >= bestMondayAverage && mondayGames >= 6) {
            if (mondayAvg > bestMondayAverage) {
                bestMondayAveragePlayer = [];
                bestMondayAverage = mondayAvg;
            }
            bestMondayAveragePlayer.push(`${player} - ${mondayGames} games`);
        }
        if (tuesdayAvg >= bestTuesdayAverage && tuesdayGames >= 6) {
            if (tuesdayAvg > bestTuesdayAverage) {
                bestTuesdayAveragePlayer = [];
                bestTuesdayAverage = tuesdayAvg;
            }
            bestTuesdayAveragePlayer.push(`${player} - ${tuesdayGames} games`);
        }
        if (thursdayAvg >= bestThursdayAverage && thursdayGames >= 6) {
            if (thursdayAvg > bestThursdayAverage) {
                bestThursdayAveragePlayer = [];
                bestThursdayAverage = thursdayAvg;
            }
            bestThursdayAveragePlayer.push(
                `${player} - ${thursdayGames} games`
            );
        }
        if (saturdayAvg >= bestSaturdayAverage && saturdayGames >= 6) {
            if (saturdayAvg > bestSaturdayAverage) {
                bestSaturdayAveragePlayer = [];
                bestSaturdayAverage = saturdayAvg;
            }
            bestSaturdayAveragePlayer.push(
                `${player} - ${saturdayGames} games`
            );
        }
        if (mondayWins >= mostMondayWins) {
            if (mondayWins > mostMondayWins) {
                mostMondayWinsPlayer = [];
                mostMondayWins = mondayWins;
            }
            mostMondayWinsPlayer.push(`${player} - ${mondayGames} games`);
        }
        if (tuesdayWins >= mostTuesdayWins) {
            if (tuesdayWins > mostTuesdayWins) {
                mostTuesdayWinsPlayer = [];
                mostTuesdayWins = tuesdayWins;
            }
            mostTuesdayWinsPlayer.push(`${player} - ${tuesdayGames} games`);
        }
        if (thursdayWins >= mostThursdayWins) {
            if (thursdayWins > mostThursdayWins) {
                mostThursdayWinsPlayer = [];
                mostThursdayWins = thursdayWins;
            }
            mostThursdayWinsPlayer.push(`${player} - ${thursdayGames} games`);
        }
        if (saturdayWins >= mostSaturdayWins) {
            if (saturdayWins > mostSaturdayWins) {
                mostSaturdayWinsPlayer = [];
                mostSaturdayWins = saturdayWins;
            }
            mostSaturdayWinsPlayer.push(`${player} - ${saturdayGames} games`);
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
            mostWinsPlayer.push(`${player} - ${totalGames} games`);
        }
        if (winPerc >= bestWinPerc && playedMinGames) {
            if (winPerc > bestWinPerc) {
                bestWinPercPlayer = [];
                bestWinPerc = winPerc;
            }
            bestWinPercPlayer.push(`${player} - ${totalGames} games`);
        }
        if (average >= bestAverage && playedMinGames) {
            if (average > bestAverage) {
                bestAveragePlayer = [];
                bestAverage = average;
            }
            bestAveragePlayer.push(`${player} - ${totalGames} games`);
        }
        if (score >= bestScore && playedMinGames) {
            if (score > bestScore) {
                bestScorePlayer = [];
                bestScore = score;
            }
            bestScorePlayer.push(`${player} - ${totalGames} games`);
        }
    });

    function allComponent() {
        return (
            <div>
                {mostGames > 0 && (
                    <p>
                        Most games played = {mostGames} (
                        {capitalizeText(mostGamesPlayer)})
                    </p>
                )}
                {mostWins > 0 && (
                    <p>
                        Most combined wins = {mostWins} (
                        {capitalizeText(mostWinsPlayer)})
                    </p>
                )}
                {bestWinPerc > 0 && (
                    <p>
                        Best win percentage = {bestWinPerc.toFixed(0)}% (
                        {capitalizeText(bestWinPercPlayer)})
                    </p>
                )}
                {bestAverage >= -21 && (
                    <p>
                        Best combined average = {bestAverage.toFixed(2)} (
                        {capitalizeText(bestAveragePlayer)})
                    </p>
                )}
                {bestScore > 0 && (
                    <p>
                        Best average team score per game ={' '}
                        {bestScore.toFixed(2)} (
                        {capitalizeText(bestScorePlayer)})
                    </p>
                )}
                <p>* minimum of 10 games</p>
            </div>
        );
    }

    function mondayComponent() {
        return (
            <div>
                <p>
                    <b>Monday</b>
                </p>
                {mostMondayWins > 0 && (
                    <p>
                        Most wins = {mostMondayWins} (
                        {capitalizeText(mostMondayWinsPlayer)})
                    </p>
                )}
                {bestMondayAverage >= -21 && (
                    <p>
                        Best average = {bestMondayAverage.toFixed(2)} (
                        {capitalizeText(bestMondayAveragePlayer)})
                    </p>
                )}
                <p>* minimum of 6 games</p>
            </div>
        );
    }

    function tuesdayComponent() {
        return (
            <div>
                <p>
                    <b>Tuesday</b>
                </p>
                {mostTuesdayWins > 0 && (
                    <p>
                        Most wins = {mostTuesdayWins} (
                        {capitalizeText(mostTuesdayWinsPlayer)})
                    </p>
                )}
                {bestTuesdayAverage >= -21 && (
                    <p>
                        Best Average = {bestTuesdayAverage.toFixed(2)} (
                        {capitalizeText(bestTuesdayAveragePlayer)})
                    </p>
                )}
                <p>* minimum of 6 games</p>
            </div>
        );
    }

    function thursdayComponent() {
        return (
            <div>
                <p>
                    <b>Thursday</b>
                </p>
                {mostThursdayWins > 0 && (
                    <p>
                        Most wins = {mostThursdayWins} (
                        {capitalizeText(mostThursdayWinsPlayer)})
                    </p>
                )}
                {bestThursdayAverage >= -21 && (
                    <p>
                        Best Average = {bestThursdayAverage.toFixed(2)} (
                        {capitalizeText(bestThursdayAveragePlayer)})
                    </p>
                )}
                <p>* minimum of 6 games</p>
            </div>
        );
    }

    function saturdayComponent() {
        return (
            <div>
                <p>
                    <b>Saturday</b>
                </p>
                {mostSaturdayWins > 0 && (
                    <p>
                        Most wins = {mostSaturdayWins} (
                        {capitalizeText(mostSaturdayWinsPlayer)})
                    </p>
                )}
                {bestSaturdayAverage >= -21 && (
                    <p>
                        Best Average = {bestSaturdayAverage.toFixed(2)} (
                        {capitalizeText(bestSaturdayAveragePlayer)})
                    </p>
                )}
                <p>* minimum of 6 games</p>
            </div>
        );
    }

    // TODO how to present? Tables? https://react-bootstrap.github.io/components/table/
    // TODO Also show stats for win % and games played?
    return (
        <div>
            <TeamTabs
                id="team-stats"
                allComponent={allComponent()}
                mondayComponent={mondayComponent()}
                tuesdayComponent={tuesdayComponent()}
                thursdayComponent={thursdayComponent()}
                saturdayComponent={saturdayComponent()}
            />
        </div>
    );
}

export default PlayerRecords;
