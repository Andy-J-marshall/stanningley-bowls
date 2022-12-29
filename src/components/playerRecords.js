import TeamTabs from './teamTabs';
import RecordsTableDisplay from './recordsTableDisplay';

function PlayerRecords(props) {
    const playerResults = props.playerResults;
    const players = Object.keys(playerResults);

    let minTotalGames = 1;
    let minMonGames = 1;
    let minTuesGames = 1;
    let minWedGames = 1;
    let minTuesVetsGames = 1;
    let minThurVetsGames = 1;
    let minSatGames = 1;
    let mostMondayWinsPlayer = [];
    let mostMondayWins = 0;
    let mostTuesdayVetsWinsPlayer = [];
    let mostTuesdayVetsWins = 0;
    let mostTuesdayWinsPlayer = [];
    let mostTuesdayWins = 0;
    let mostWednesdayWinsPlayer = [];
    let mostWednesdayWins = 0;
    let mostThursdayWinsPlayer = [];
    let mostThursdayWins = 0;
    let mostSaturdayWinsPlayer = [];
    let mostSaturdayWins = 0;
    let bestMondayAveragePlayer = [];
    let bestMondayAverage = -21;
    let bestMondayWinPerc = 0;
    let bestMondayWinPercPlayer = 0;
    let bestTuesdayVetsAveragePlayer = [];
    let bestTuesdayVetsAverage = -21;
    let bestTuesdayVetsWinPerc = 0;
    let bestTuesdayVetsWinPercPlayer = 0;
    let bestTuesdayAveragePlayer = [];
    let bestTuesdayAverage = -21;
    let bestTuesdayWinPerc = 0;
    let bestTuesdayWinPercPlayer = 0;
    let bestWednesdayAveragePlayer = [];
    let bestWednesdayAverage = -21;
    let bestWednesdayWinPerc = 0;
    let bestWednesdayWinPercPlayer = 0;
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
        const monday = p['monday combined leeds'];
        const tuesdayVets = p['tuesday vets leeds'];
        const tuesday = p['tuesday leeds'];
        const wednesday = p['wednesday half holiday leeds'];
        const thursdayVets = p['thursday vets leeds'];
        const saturday = p['saturday leeds'];
        const mondayGames = monday.games;
        const tuesdayVetsGames = tuesdayVets.games;
        const tuesdayGames = tuesday.games;
        const wednesdayGames = wednesday.games;
        const thursdayVetsGames = thursdayVets.games;
        const saturdayGames = saturday.games;
        if (totalGames > minTotalGames) {
            if (totalGames >= 10) {
                minTotalGames = 10;
            } else {
                minTotalGames = totalGames;
            }
        }
        if (mondayGames > minMonGames) {
            if (mondayGames >= 8) {
                minMonGames = 8;
            } else {
                minMonGames = mondayGames;
            }
        }
        if (tuesdayVetsGames > minTuesVetsGames) {
            if (tuesdayVetsGames >= 8) {
                minTuesVetsGames = 8;
            } else {
                minTuesVetsGames = tuesdayVetsGames;
            }
        }
        if (tuesdayGames > minTuesGames) {
            if (tuesdayGames >= 8) {
                minTuesGames = 8;
            } else {
                minTuesGames = tuesdayGames;
            }
        }
        if (wednesdayGames > minWedGames) {
            if (wednesdayGames >= 8) {
                minWedGames = 8;
            } else {
                minWedGames = wednesdayGames;
            }
        }
        if (thursdayVetsGames > minThurVetsGames) {
            if (thursdayVetsGames >= 8) {
                minThurVetsGames = 8;
            } else {
                minThurVetsGames = thursdayVetsGames;
            }
        }
        if (saturdayGames > minSatGames) {
            if (saturdayGames >= 8) {
                minSatGames = 8;
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

        const monday = p['monday combined leeds'];
        const tuesdayVets = p['tuesday vets leeds'];
        const tuesday = p['tuesday leeds'];
        const wednesday = p['wednesday leeds'];
        const thursdayVets = p['thursday vets leeds'];
        const saturday = p['saturday leeds'];
        const mondayWins = monday.wins;
        const mondayGames = monday.games;
        const mondayAvg = monday.aggDiff / mondayGames;
        const mondayWinPerc = (mondayWins / mondayGames) * 100;
        const tuesdayWins = tuesday.wins;
        const tuesdayGames = tuesday.games;
        const tuesdayAvg = tuesday.aggDiff / tuesdayGames;
        const tuesdayWinPerc = (tuesdayWins / tuesdayGames) * 100;
        const wednesdayWins = wednesday.wins;
        const wednesdayGames = wednesday.games;
        const wednesdayAvg = wednesday.aggDiff / wednesdayGames;
        const wednesdayWinPerc = (wednesdayWins / wednesdayGames) * 100;
        const tuesdayVetsWins = tuesdayVets.wins;
        const tuesdayVetsGames = tuesdayVets.games;
        const tuesdayVetsAvg = tuesdayVets.aggDiff / tuesdayVetsGames;
        const tuesdayVetsWinPerc = (tuesdayVetsWins / tuesdayVetsGames) * 100;
        const thursdayVetsWins = thursdayVets.wins;
        const thursdayVetsGames = thursdayVets.games;
        const thursdayVetsAvg = thursdayVets.aggDiff / thursdayVetsGames;
        const thursdayVetsWinPerc =
            (thursdayVetsWins / thursdayVetsGames) * 100;
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
        if (
            tuesdayVetsAvg >= bestTuesdayVetsAverage &&
            tuesdayVetsGames >= minTuesVetsGames
        ) {
            if (tuesdayVetsAvg > bestTuesdayVetsAverage) {
                bestTuesdayVetsAveragePlayer = [];
                bestTuesdayVetsAverage = tuesdayVetsAvg;
            }
            bestTuesdayVetsAveragePlayer.push(
                `${player} (${tuesdayVetsGames})`
            );
        }
        if (tuesdayAvg >= bestTuesdayAverage && tuesdayGames >= minTuesGames) {
            if (tuesdayAvg > bestTuesdayAverage) {
                bestTuesdayAveragePlayer = [];
                bestTuesdayAverage = tuesdayAvg;
            }
            bestTuesdayAveragePlayer.push(`${player} (${tuesdayGames})`);
        }
        if (
            wednesdayAvg >= bestWednesdayAverage &&
            wednesdayGames >= minWedGames
        ) {
            if (wednesdayAvg > bestWednesdayAverage) {
                bestWednesdayAveragePlayer = [];
                bestWednesdayAverage = wednesdayAvg;
            }
            bestWednesdayAveragePlayer.push(`${player} (${wednesdayGames})`);
        }
        if (
            thursdayVetsAvg >= bestThursdayAverage &&
            thursdayVetsGames >= minThurVetsGames
        ) {
            if (thursdayVetsAvg > bestThursdayAverage) {
                bestThursdayAveragePlayer = [];
                bestThursdayAverage = thursdayVetsAvg;
            }
            bestThursdayAveragePlayer.push(`${player} (${thursdayVetsGames})`);
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
        if (tuesdayVetsWins >= mostTuesdayVetsWins) {
            if (tuesdayVetsWins > mostTuesdayVetsWins) {
                mostTuesdayVetsWinsPlayer = [];
                mostTuesdayVetsWins = tuesdayVetsWins;
            }
            mostTuesdayVetsWinsPlayer.push(`${player} (${tuesdayVetsGames})`);
        }
        if (tuesdayWins >= mostTuesdayWins) {
            if (tuesdayWins > mostTuesdayWins) {
                mostTuesdayWinsPlayer = [];
                mostTuesdayWins = tuesdayWins;
            }
            mostTuesdayWinsPlayer.push(`${player} (${tuesdayGames})`);
        }
        if (wednesdayWins >= mostWednesdayWins) {
            if (wednesdayWins > mostWednesdayWins) {
                mostWednesdayWinsPlayer = [];
                mostWednesdayWins = wednesdayWins;
            }
            mostWednesdayWinsPlayer.push(`${player} (${wednesdayGames})`);
        }
        if (thursdayVetsWins >= mostThursdayWins) {
            if (thursdayVetsWins > mostThursdayWins) {
                mostThursdayWinsPlayer = [];
                mostThursdayWins = thursdayVetsWins;
            }
            mostThursdayWinsPlayer.push(`${player} (${thursdayVetsGames})`);
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
            tuesdayVetsWinPerc >= bestTuesdayVetsWinPerc &&
            tuesdayVetsGames >= minTuesVetsGames
        ) {
            if (tuesdayVetsWinPerc > bestTuesdayVetsWinPerc) {
                bestTuesdayVetsWinPercPlayer = [];
                bestTuesdayVetsWinPerc = tuesdayVetsWinPerc;
            }
            bestTuesdayVetsWinPercPlayer.push(
                `${player} (${tuesdayVetsGames})`
            );
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
            wednesdayWinPerc >= bestWednesdayWinPerc &&
            wednesdayGames >= minWedGames
        ) {
            if (wednesdayWinPerc > bestWednesdayWinPerc) {
                bestWednesdayWinPercPlayer = [];
                bestWednesdayWinPerc = wednesdayWinPerc;
            }
            bestWednesdayWinPercPlayer.push(`${player} (${wednesdayGames})`);
        }
        if (
            thursdayVetsWinPerc >= bestThursdayWinPerc &&
            thursdayVetsGames >= minThurVetsGames
        ) {
            if (thursdayVetsWinPerc > bestThursdayWinPerc) {
                bestThursdayWinPercPlayer = [];
                bestThursdayWinPerc = thursdayVetsWinPerc;
            }
            bestThursdayWinPercPlayer.push(`${player} (${thursdayVetsGames})`);
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

    function returnTeam1Component() {
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

    function returnTeam2Component() {
        return (
            <RecordsTableDisplay
                minGames={minTuesVetsGames}
                playerOrTeam="Player"
                mostWins={mostTuesdayVetsWins}
                mostWinsPlayer={mostTuesdayVetsWinsPlayer}
                bestWinPerc={bestTuesdayVetsWinPerc}
                bestWinPercPlayerOrTeam={bestTuesdayVetsWinPercPlayer}
                bestAverage={bestTuesdayVetsAverage}
                bestAveragePlayer={bestTuesdayVetsAveragePlayer}
            />
        );
    }

    function returnTeam3Component() {
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

    function returnTeam4Component() {
        return (
            <RecordsTableDisplay
                minGames={minWedGames}
                playerOrTeam="Player"
                mostWins={mostWednesdayWins}
                mostWinsPlayer={mostWednesdayWinsPlayer}
                bestWinPerc={bestWednesdayWinPerc}
                bestWinPercPlayerOrTeam={bestWednesdayWinPercPlayer}
                bestAverage={bestWednesdayAverage}
                bestAveragePlayer={bestWednesdayAveragePlayer}
            />
        );
    }

    function returnTeam5Component() {
        return (
            <RecordsTableDisplay
                minGames={minThurVetsGames}
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

    function returnTeam6Component() {
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
                team1Component={returnTeam1Component()}
                team2Component={returnTeam2Component()}
                team3Component={returnTeam3Component()}
                team4Component={returnTeam4Component()}
                team5Component={returnTeam5Component()}
                team6Component={returnTeam6Component()}
            />
        </div>
    );
}

export default PlayerRecords;
