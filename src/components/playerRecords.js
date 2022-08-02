import React from 'react';
import TeamTabs from './teamTabs';
import RecordsTableDisplay from './recordsTableDisplay';

function PlayerRecords(props) {
    const playerResults = props.playerResults;
    const players = Object.keys(playerResults);

    let minTotalGames = 1;
    let minMonGames = 1;
    let minTuesGames = 1;
    let minThurGames = 1;
    let minSatGames = 1;
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
    let bestMondayWinPerc = 0;
    let bestMondayWinPercPlayer = 0;
    let bestTuesdayAveragePlayer = [];
    let bestTuesdayAverage = -21;
    let bestTuesdayWinPerc = 0;
    let bestTuesdayWinPercPlayer = 0;
    let bestThursdayAveragePlayer = [];
    let bestThursdayAverage = -21;
    let bestThursdayWinPerc = 0;
    let bestThursdayWinPercPlayer = 0;
    let bestSaturdayAveragePlayer = [];
    let bestSaturdayAverage = -21;
    let bestSaturdayWinPerc = 0;
    let bestSaturdayWinPercPlayer = 0;
    let mostGamesPlayer = [];
    let mostGames = 0;
    let mostWinsPlayer = [];
    let mostWins = 0;
    let bestWinPercPlayer = [];
    let bestWinPerc = 0;
    let bestAveragePlayer = [];
    let bestAverage = -21;
    let bestPointsPlayer = [];
    let bestPoints = 0;

    // This sets the minimum number of games required for the stats to be counted
    players.forEach((player) => {
        const p = playerResults[player];
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;
        const { monday, tuesday, thursday, saturday } = p;
        const mondayGames = monday.games;
        const tuesdayGames = tuesday.games;
        const thursdayGames = thursday.games;
        const saturdayGames = saturday.games;
        if (totalGames > minTotalGames) {
            if (totalGames >= 8) {
                minTotalGames = 8;
            } else {
                minTotalGames = totalGames;
            }
        }
        if (mondayGames > minMonGames) {
            if (mondayGames >= 7) {
                minMonGames = 7;
            } else {
                minMonGames = mondayGames;
            }
        }
        if (tuesdayGames > minTuesGames) {
            if (tuesdayGames >= 7) {
                minTuesGames = 7;
            } else {
                minTuesGames = tuesdayGames;
            }
        }
        if (thursdayGames > minThurGames) {
            if (thursdayGames >= 7) {
                minThurGames = 7;
            } else {
                minThurGames = thursdayGames;
            }
        }
        if (saturdayGames > minSatGames) {
            if (saturdayGames >= 7) {
                minSatGames = 7;
            } else {
                minSatGames = saturdayGames;
            }
        }
    });

    players.forEach((player) => {
        const p = playerResults[player];
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;
        const winPerc = (totalWins / totalGames) * 100;
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;
        const points = p.totalPoints / (totalGames - p.cupWins - p.cupLosses);

        const { monday, tuesday, thursday, saturday } = p;
        const mondayWins = monday.wins;
        const mondayGames = monday.games;
        const mondayAvg = monday.aggDiff / mondayGames;
        const mondayWinPerc = (mondayWins / mondayGames) * 100;
        const tuesdayWins = tuesday.wins;
        const tuesdayGames = tuesday.games;
        const tuesdayAvg = tuesday.aggDiff / tuesdayGames;
        const tuesdayWinPerc = (tuesdayWins / tuesdayGames) * 100;
        const thursdayWins = thursday.wins;
        const thursdayGames = thursday.games;
        const thursdayAvg = thursday.aggDiff / thursdayGames;
        const thursdayWinPerc = (thursdayWins / thursdayGames) * 100;
        const saturdayWins = saturday.wins;
        const saturdayGames = saturday.games;
        const saturdayAvg = saturday.aggDiff / saturdayGames;
        const saturdayWinPerc = (saturdayWins / saturdayGames) * 100;

        if (mondayAvg >= bestMondayAverage && mondayGames >= minMonGames) {
            if (mondayAvg > bestMondayAverage) {
                bestMondayAveragePlayer = [];
                bestMondayAverage = mondayAvg;
            }
            bestMondayAveragePlayer.push(`${player} (${mondayGames})`);
        }
        if (tuesdayAvg >= bestTuesdayAverage && tuesdayGames >= minTuesGames) {
            if (tuesdayAvg > bestTuesdayAverage) {
                bestTuesdayAveragePlayer = [];
                bestTuesdayAverage = tuesdayAvg;
            }
            bestTuesdayAveragePlayer.push(`${player} (${tuesdayGames})`);
        }
        if (
            thursdayAvg >= bestThursdayAverage &&
            thursdayGames >= minThurGames
        ) {
            if (thursdayAvg > bestThursdayAverage) {
                bestThursdayAveragePlayer = [];
                bestThursdayAverage = thursdayAvg;
            }
            bestThursdayAveragePlayer.push(`${player} (${thursdayGames})`);
        }
        if (
            saturdayAvg >= bestSaturdayAverage &&
            saturdayGames >= minSatGames
        ) {
            if (saturdayAvg > bestSaturdayAverage) {
                bestSaturdayAveragePlayer = [];
                bestSaturdayAverage = saturdayAvg;
            }
            bestSaturdayAveragePlayer.push(`${player} (${saturdayGames})`);
        }
        if (mondayWins >= mostMondayWins) {
            if (mondayWins > mostMondayWins) {
                mostMondayWinsPlayer = [];
                mostMondayWins = mondayWins;
            }
            mostMondayWinsPlayer.push(`${player} (${mondayGames})`);
        }
        if (tuesdayWins >= mostTuesdayWins) {
            if (tuesdayWins > mostTuesdayWins) {
                mostTuesdayWinsPlayer = [];
                mostTuesdayWins = tuesdayWins;
            }
            mostTuesdayWinsPlayer.push(`${player} (${tuesdayGames})`);
        }
        if (thursdayWins >= mostThursdayWins) {
            if (thursdayWins > mostThursdayWins) {
                mostThursdayWinsPlayer = [];
                mostThursdayWins = thursdayWins;
            }
            mostThursdayWinsPlayer.push(`${player} (${thursdayGames})`);
        }
        if (saturdayWins >= mostSaturdayWins) {
            if (saturdayWins > mostSaturdayWins) {
                mostSaturdayWinsPlayer = [];
                mostSaturdayWins = saturdayWins;
            }
            mostSaturdayWinsPlayer.push(`${player} (${saturdayGames})`);
        }
        if (mondayWinPerc >= bestMondayWinPerc && mondayGames >= minMonGames) {
            if (mondayWinPerc > bestMondayWinPerc) {
                bestMondayWinPercPlayer = [];
                bestMondayWinPerc = mondayWinPerc;
            }
            bestMondayWinPercPlayer.push(`${player} (${mondayGames})`);
        }
        if (
            tuesdayWinPerc >= bestTuesdayWinPerc &&
            tuesdayGames >= minTuesGames
        ) {
            if (tuesdayWinPerc > bestTuesdayWinPerc) {
                bestTuesdayWinPercPlayer = [];
                bestTuesdayWinPerc = tuesdayWinPerc;
            }
            bestTuesdayWinPercPlayer.push(`${player} (${tuesdayGames})`);
        }
        if (
            thursdayWinPerc >= bestThursdayWinPerc &&
            thursdayGames >= minThurGames
        ) {
            if (thursdayWinPerc > bestThursdayWinPerc) {
                bestThursdayWinPercPlayer = [];
                bestThursdayWinPerc = thursdayWinPerc;
            }
            bestThursdayWinPercPlayer.push(`${player} (${thursdayGames})`);
        }
        if (
            saturdayWinPerc >= bestSaturdayWinPerc &&
            saturdayGames >= minSatGames
        ) {
            if (saturdayWinPerc > bestSaturdayWinPerc) {
                bestSaturdayWinPercPlayer = [];
                bestSaturdayWinPerc = saturdayWinPerc;
            }
            bestSaturdayWinPercPlayer.push(`${player} (${saturdayGames})`);
        }

        const playedMinGames = totalGames >= minTotalGames ? true : false;
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
            mostWinsPlayer.push(`${player} (${totalGames})`);
        }
        if (winPerc >= bestWinPerc && playedMinGames) {
            if (winPerc > bestWinPerc) {
                bestWinPercPlayer = [];
                bestWinPerc = winPerc;
            }
            bestWinPercPlayer.push(`${player} (${totalGames})`);
        }
        if (average >= bestAverage && playedMinGames) {
            if (average > bestAverage) {
                bestAveragePlayer = [];
                bestAverage = average;
            }
            bestAveragePlayer.push(`${player} (${totalGames})`);
        }
        if (points >= bestPoints && playedMinGames) {
            if (points > bestPoints) {
                bestPointsPlayer = [];
                bestPoints = points;
            }
            bestPointsPlayer.push(`${player} (${totalGames})`);
        }
    });

    function allComponent() {
        return (
            <RecordsTableDisplay
                minGames={minTotalGames}
                playerOrTeam="Player"
                mostGames={mostGames}
                mostGamesPlayer={mostGamesPlayer}
                mostWins={mostWins}
                mostWinsPlayer={mostWinsPlayer}
                bestWinPerc={bestWinPerc}
                bestWinPercPlayerOrTeam={bestWinPercPlayer}
                bestAverage={bestAverage}
                bestAveragePlayer={bestAveragePlayer}
                bestPoints={bestPoints}
                bestPointsPlayer={bestPointsPlayer}
            />
        );
    }

    function mondayComponent() {
        return (
            <RecordsTableDisplay
                minGames={minMonGames}
                playerOrTeam="Player"
                mostWins={mostMondayWins}
                mostWinsPlayer={mostMondayWinsPlayer}
                bestWinPerc={bestMondayWinPerc}
                bestWinPercPlayerOrTeam={bestMondayWinPercPlayer}
                bestAverage={bestMondayAverage}
                bestAveragePlayer={bestMondayAveragePlayer}
            />
        );
    }

    function tuesdayComponent() {
        return (
            <RecordsTableDisplay
                minGames={minTuesGames}
                playerOrTeam="Player"
                mostWins={mostTuesdayWins}
                mostWinsPlayer={mostTuesdayWinsPlayer}
                bestWinPerc={bestTuesdayWinPerc}
                bestWinPercPlayerOrTeam={bestTuesdayWinPercPlayer}
                bestAverage={bestTuesdayAverage}
                bestAveragePlayer={bestTuesdayAveragePlayer}
            />
        );
    }

    function thursdayComponent() {
        return (
            <RecordsTableDisplay
                minGames={minThurGames}
                playerOrTeam="Player"
                mostWins={mostThursdayWins}
                mostWinsPlayer={mostThursdayWinsPlayer}
                bestWinPerc={bestThursdayWinPerc}
                bestWinPercPlayerOrTeam={bestThursdayWinPercPlayer}
                bestAverage={bestThursdayAverage}
                bestAveragePlayer={bestThursdayAveragePlayer}
            />
        );
    }

    function saturdayComponent() {
        return (
            <RecordsTableDisplay
                minGames={minSatGames}
                playerOrTeam="Player"
                mostWins={mostSaturdayWins}
                mostWinsPlayer={mostSaturdayWinsPlayer}
                bestWinPerc={bestSaturdayWinPerc}
                bestWinPercPlayerOrTeam={bestSaturdayWinPercPlayer}
                bestAverage={bestSaturdayAverage}
                bestAveragePlayer={bestSaturdayAveragePlayer}
            />
        );
    }

    return (
        <div>
            <h1>PLAYER RECORDS</h1>
            <TeamTabs
                id="player-record"
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
