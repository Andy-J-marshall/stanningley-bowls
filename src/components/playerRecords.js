import React from 'react';
import TeamTabs from './teamTabs';
import RecordsTableDisplay from './recordsTableDisplay';

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
    let bestScorePlayer = [];
    let bestScore = 0;

    players.forEach((player) => {
        const p = playersStats[player];
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;
        const winPerc = (totalWins / totalGames) * 100;
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;
        const score = p.totalScore / (totalGames - p.cupWins - p.cupLosses);

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

        const playedMinGames = totalGames >= 10 ? true : false;

        if (mondayAvg >= bestMondayAverage && mondayGames >= 6) {
            if (mondayAvg > bestMondayAverage) {
                bestMondayAveragePlayer = [];
                bestMondayAverage = mondayAvg;
            }
            bestMondayAveragePlayer.push(`${player} (${mondayGames})`);
        }
        if (tuesdayAvg >= bestTuesdayAverage && tuesdayGames >= 6) {
            if (tuesdayAvg > bestTuesdayAverage) {
                bestTuesdayAveragePlayer = [];
                bestTuesdayAverage = tuesdayAvg;
            }
            bestTuesdayAveragePlayer.push(`${player} (${tuesdayGames})`);
        }
        if (thursdayAvg >= bestThursdayAverage && thursdayGames >= 6) {
            if (thursdayAvg > bestThursdayAverage) {
                bestThursdayAveragePlayer = [];
                bestThursdayAverage = thursdayAvg;
            }
            bestThursdayAveragePlayer.push(`${player} (${thursdayGames})`);
        }
        if (saturdayAvg >= bestSaturdayAverage && saturdayGames >= 6) {
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
        if (mondayWinPerc >= bestMondayWinPerc && mondayGames >= 6) {
            if (mondayWinPerc > bestMondayWinPerc) {
                bestMondayWinPercPlayer = [];
                bestMondayWinPerc = mondayWinPerc;
            }
            bestMondayWinPercPlayer.push(`${player} (${mondayGames})`);
        }
        if (tuesdayWinPerc >= bestTuesdayWinPerc && tuesdayGames >= 6) {
            if (tuesdayWinPerc > bestTuesdayWinPerc) {
                bestTuesdayWinPercPlayer = [];
                bestTuesdayWinPerc = tuesdayWinPerc;
            }
            bestTuesdayWinPercPlayer.push(`${player} (${tuesdayGames})`);
        }
        if (thursdayWinPerc >= bestThursdayWinPerc && thursdayGames >= 6) {
            if (thursdayWinPerc > bestThursdayWinPerc) {
                bestThursdayWinPercPlayer = [];
                bestThursdayWinPerc = thursdayWinPerc;
            }
            bestThursdayWinPercPlayer.push(`${player} (${thursdayGames})`);
        }
        if (saturdayWinPerc >= bestSaturdayWinPerc && saturdayGames >= 6) {
            if (saturdayWinPerc > bestSaturdayWinPerc) {
                bestSaturdayWinPercPlayer = [];
                bestSaturdayWinPerc = saturdayWinPerc;
            }
            bestSaturdayWinPercPlayer.push(`${player} (${saturdayGames})`);
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
        if (score >= bestScore && playedMinGames) {
            if (score > bestScore) {
                bestScorePlayer = [];
                bestScore = score;
            }
            bestScorePlayer.push(`${player} (${totalGames})`);
        }
    });

    function allComponent() {
        return (
            <div>
                <RecordsTableDisplay
                    minGames={10}
                    playerOrTeam={'Player'}
                    mostGames={mostGames}
                    mostGamesPlayer={mostGamesPlayer}
                    mostWins={mostWins}
                    mostWinsPlayer={mostWinsPlayer}
                    bestWinPerc={bestWinPerc}
                    bestWinPercPlayerOrTeam={bestWinPercPlayer}
                    bestAverage={bestAverage}
                    bestAveragePlayer={bestAveragePlayer}
                    bestScore={bestScore}
                    bestScorePlayer={bestScorePlayer}
                />
            </div>
        );
    }

    // TODO create a component for this.
    function mondayComponent() {
        return (
            <div>
                <RecordsTableDisplay
                    minGames={6}
                    playerOrTeam={'Player'}
                    mostWins={mostMondayWins}
                    mostWinsPlayer={mostMondayWinsPlayer}
                    bestWinPerc={bestMondayWinPerc}
                    bestWinPercPlayerOrTeam={bestMondayWinPercPlayer}
                    bestAverage={bestMondayAverage}
                    bestAveragePlayer={bestMondayAveragePlayer}
                />
            </div>
        );
    }

    function tuesdayComponent() {
        return (
            <div>
                <RecordsTableDisplay
                    minGames={6}
                    playerOrTeam={'Player'}
                    mostWins={mostTuesdayWins}
                    mostWinsPlayer={mostTuesdayWinsPlayer}
                    bestWinPerc={bestTuesdayWinPerc}
                    bestWinPercPlayerOrTeam={bestTuesdayWinPercPlayer}
                    bestAverage={bestTuesdayAverage}
                    bestAveragePlayer={bestTuesdayAveragePlayer}
                />
            </div>
        );
    }

    function thursdayComponent() {
        return (
            <div>
                <RecordsTableDisplay
                    minGames={6}
                    playerOrTeam={'Player'}
                    mostWins={mostThursdayWins}
                    mostWinsPlayer={mostThursdayWinsPlayer}
                    bestWinPerc={bestThursdayWinPerc}
                    bestWinPercPlayerOrTeam={bestThursdayWinPercPlayer}
                    bestAverage={bestThursdayAverage}
                    bestAveragePlayer={bestThursdayAveragePlayer}
                />
            </div>
        );
    }

    function saturdayComponent() {
        return (
            <div>
                <RecordsTableDisplay
                    minGames={6}
                    playerOrTeam={'Player'}
                    mostWins={mostSaturdayWins}
                    mostWinsPlayer={mostSaturdayWinsPlayer}
                    bestWinPerc={bestSaturdayWinPerc}
                    bestWinPercPlayerOrTeam={bestSaturdayWinPercPlayer}
                    bestAverage={bestSaturdayAverage}
                    bestAveragePlayer={bestSaturdayAveragePlayer}
                />
            </div>
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
