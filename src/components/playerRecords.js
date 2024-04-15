import TeamTabs from './teamTabs';
import RecordsTableDisplay from './recordsTableDisplay';
import { capitalizeText } from '../helpers/utils';
import config from '../config';

function PlayerRecords(props) {
    const playerResults = props.playerResults;
    const clubCupWinner = props.clubCupWinner;

    const players = Object.keys(playerResults);

    const minGamesForOverallRecords = 15;
    const minGamesForTeamRecords = 11;

    // Monday
    let useMondayStats = false;
    let minMonGames = 1;
    let mostMondayWinsPlayer = [];
    let mostMondayWins = 0;
    let bestMondayAveragePlayer = [];
    let bestMondayAverage = -22;
    let bestMondayWinPerc = 0;
    let bestMondayWinPercPlayer = [];

    // Tuesday Vets
    let useTuesdayVetsStats = false;
    let minTuesVetsGames = 1;
    let mostTuesdayVetsWinsPlayer = [];
    let mostTuesdayVetsWins = 0;
    let bestTuesdayVetsAveragePlayer = [];
    let bestTuesdayVetsAverage = -22;
    let bestTuesdayVetsWinPerc = 0;
    let bestTuesdayVetsWinPercPlayer = [];

    // Tuesday
    let useTuesdayStats = false;
    let minTuesGames = 1;
    let mostTuesdayWinsPlayer = [];
    let mostTuesdayWins = 0;
    let bestTuesdayAveragePlayer = [];
    let bestTuesdayAverage = -22;
    let bestTuesdayWinPerc = 0;
    let bestTuesdayWinPercPlayer = [];

    // Wednesday Half Holiday
    let useWednesdayStats = false;
    let minWedGames = 1;
    let mostWednesdayWinsPlayer = [];
    let mostWednesdayWins = 0;
    let bestWednesdayAveragePlayer = [];
    let bestWednesdayAverage = -22;
    let bestWednesdayWinPerc = 0;
    let bestWednesdayWinPercPlayer = [];

    // Wednesday Pairs
    let useWednesdayPairsStats = false;
    let minWedPairsGames = 1;
    let mostWednesdayPairsWinsPlayer = [];
    let mostWednesdayPairsWins = 0;
    let bestWednesdayPairsAveragePlayer = [];
    let bestWednesdayPairsAverage = -26;
    let bestWednesdayPairsWinPerc = 0;
    let bestWednesdayPairsWinPercPlayer = [];

    // Thursday Vets
    let useThursdayVetsStats = false;
    let minThurVetsGames = 1;
    let mostThursdayVetsWinsPlayer = [];
    let mostThursdayVetsWins = 0;
    let bestThursdayVetsAveragePlayer = [];
    let bestThursdayVetsAverage = -22;
    let bestThursdayVetsWinPerc = 0;
    let bestThursdayVetsWinPercPlayer = [];

    // Saturday
    let useSaturdayStats = false;
    let minSatGames = 1;
    let mostSaturdayWinsPlayer = [];
    let mostSaturdayWins = 0;
    let bestSaturdayAveragePlayer = [];
    let bestSaturdayAverage = -22;
    let bestSaturdayWinPerc = 0;
    let bestSaturdayWinPercPlayer = [];

    // Saturday B
    let useSaturdayBStats = false;
    let minSatBGames = 1;
    let mostSaturdayBWinsPlayer = [];
    let mostSaturdayBWins = 0;
    let bestSaturdayBAveragePlayer = [];
    let bestSaturdayBAverage = -22;
    let bestSaturdayBWinPerc = 0;
    let bestSaturdayBWinPercPlayer = [];

    // Total
    let minTotalGames = 1;
    let mostGamesPlayer = [];
    let mostGames = 0;
    let mostWinsPlayer = [];
    let mostWins = 0;
    let bestWinPercPlayer = [];
    let bestWinPerc = 0;
    let bestAveragePlayer = [];
    let bestAverage = -27;

    // Find the highest number of games played for each team
    let highestMonGames = 0;
    let highestTuesVetsGames = 0;
    let highestTuesGames = 0;
    let highestWedGames = 0;
    let highestWedPairsGames = 0;
    let highestThursVetsGames = 0;
    let highestSatGames = 0;
    let highestSatBGames = 0;
    let highestTotalGames = 0;

    players.forEach((player) => {
        const p = playerResults[player];
        const monday = p['monday combined leeds'];
        const tuesdayVets = p['tuesday vets leeds'];
        const tuesday = p['tuesday leeds'];
        const wednesday = p['wednesday half holiday leeds'];
        const wednesdayPairs = p['wednesday pairs airewharfe'];
        const thursdayVets = p['thursday vets leeds'];
        const saturday = p['saturday leeds'];
        const saturdayB = p['saturday leeds (b)'];

        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;

        if (monday && monday.games >= highestMonGames) {
            highestMonGames = monday.games;
        }
        if (tuesdayVets && tuesdayVets.games >= highestTuesVetsGames) {
            highestTuesVetsGames = tuesdayVets.games;
        }
        if (tuesday && tuesday.games >= highestTuesGames) {
            highestTuesGames = tuesday.games;
        }
        if (wednesday && wednesday.games >= highestWedGames) {
            highestWedGames = wednesday.games;
        }
        if (thursdayVets && thursdayVets.games >= highestThursVetsGames) {
            highestThursVetsGames = thursdayVets.games;
        }
        if (saturday && saturday.games >= highestSatGames) {
            highestSatGames = saturday.games;
        }
        if (saturdayB && saturdayB.games >= highestSatBGames) {
            highestSatBGames = saturdayB.games;
        }
        if (totalGames >= highestTotalGames) {
            highestTotalGames = totalGames;
        }
    });

    // This sets the minimum number of games required for the stats to be counted
    players.forEach((player) => {
        const p = playerResults[player];
        const monday = p['monday combined leeds'];
        const tuesdayVets = p['tuesday vets leeds'];
        const tuesday = p['tuesday leeds'];
        const wednesday = p['wednesday half holiday leeds'];
        const wednesdayPairs = p['wednesday pairs airewharfe'];
        const thursdayVets = p['thursday vets leeds'];
        const saturday = p['saturday leeds'];
        const saturdayB = p['saturday leeds (b)'];

        // Monday
        if (monday) {
            useMondayStats = true;
            const mondayWins = monday.wins;
            const mondayGames = monday.games;
            const mondayAvg = monday.aggDiff / mondayGames;
            const mondayWinPerc = (mondayWins / mondayGames) * 100;

            if (highestMonGames > minMonGames) {
                if (highestMonGames >= minGamesForTeamRecords) {
                    minMonGames = minGamesForTeamRecords;
                } else {
                    minMonGames = highestMonGames;
                }
            }

            if (mondayAvg >= bestMondayAverage && mondayGames >= minMonGames) {
                if (mondayAvg > bestMondayAverage) {
                    bestMondayAveragePlayer = [];
                    bestMondayAverage = mondayAvg;
                }
                bestMondayAveragePlayer.push(player);
            }

            if (mondayWins >= mostMondayWins) {
                if (mondayWins > mostMondayWins) {
                    mostMondayWinsPlayer = [];
                    mostMondayWins = mondayWins;
                }
                mostMondayWinsPlayer.push(player);
            }

            if (
                mondayWinPerc >= bestMondayWinPerc &&
                mondayGames >= minMonGames
            ) {
                if (mondayWinPerc > bestMondayWinPerc) {
                    bestMondayWinPercPlayer = [];
                    bestMondayWinPerc = mondayWinPerc;
                }
                bestMondayWinPercPlayer.push(player);
            }
        }

        // Tuesday Vets
        if (tuesdayVets) {
            useTuesdayVetsStats = true;
            const tuesdayVetsWins = tuesdayVets.wins;
            const tuesdayVetsGames = tuesdayVets.games;
            const tuesdayVetsAvg = tuesdayVets.aggDiff / tuesdayVetsGames;
            const tuesdayVetsWinPerc =
                (tuesdayVetsWins / tuesdayVetsGames) * 100;

            if (highestTuesVetsGames > minTuesVetsGames) {
                if (highestTuesVetsGames >= minGamesForTeamRecords) {
                    minTuesVetsGames = minGamesForTeamRecords;
                } else {
                    minTuesVetsGames = highestTuesVetsGames;
                }
            }

            if (
                tuesdayVetsAvg >= bestTuesdayVetsAverage &&
                tuesdayVetsGames >= minTuesVetsGames
            ) {
                if (tuesdayVetsAvg > bestTuesdayVetsAverage) {
                    bestTuesdayVetsAveragePlayer = [];
                    bestTuesdayVetsAverage = tuesdayVetsAvg;
                }
                bestTuesdayVetsAveragePlayer.push(player);
            }

            if (tuesdayVetsWins >= mostTuesdayVetsWins) {
                if (tuesdayVetsWins > mostTuesdayVetsWins) {
                    mostTuesdayVetsWinsPlayer = [];
                    mostTuesdayVetsWins = tuesdayVetsWins;
                }
                mostTuesdayVetsWinsPlayer.push(player);
            }

            if (
                tuesdayVetsWinPerc >= bestTuesdayVetsWinPerc &&
                tuesdayVetsGames >= minTuesVetsGames
            ) {
                if (tuesdayVetsWinPerc > bestTuesdayVetsWinPerc) {
                    bestTuesdayVetsWinPercPlayer = [];
                    bestTuesdayVetsWinPerc = tuesdayVetsWinPerc;
                }
                bestTuesdayVetsWinPercPlayer.push(player);
            }
        }

        // Tuesday
        if (tuesday) {
            useTuesdayStats = true;
            const tuesdayWins = tuesday.wins;
            const tuesdayGames = tuesday.games;
            const tuesdayAvg = tuesday.aggDiff / tuesdayGames;
            const tuesdayWinPerc = (tuesdayWins / tuesdayGames) * 100;

            if (highestTuesGames > minTuesGames) {
                if (highestTuesGames >= minGamesForTeamRecords) {
                    minTuesGames = minGamesForTeamRecords;
                } else {
                    minTuesGames = highestTuesGames;
                }
            }

            if (
                tuesdayAvg >= bestTuesdayAverage &&
                tuesdayGames >= minTuesGames
            ) {
                if (tuesdayAvg > bestTuesdayAverage) {
                    bestTuesdayAveragePlayer = [];
                    bestTuesdayAverage = tuesdayAvg;
                }
                bestTuesdayAveragePlayer.push(player);
            }

            if (tuesdayWins >= mostTuesdayWins) {
                if (tuesdayWins > mostTuesdayWins) {
                    mostTuesdayWinsPlayer = [];
                    mostTuesdayWins = tuesdayWins;
                }
                mostTuesdayWinsPlayer.push(player);
            }

            if (
                tuesdayWinPerc >= bestTuesdayWinPerc &&
                tuesdayGames >= minTuesGames
            ) {
                if (tuesdayWinPerc > bestTuesdayWinPerc) {
                    bestTuesdayWinPercPlayer = [];
                    bestTuesdayWinPerc = tuesdayWinPerc;
                }
                bestTuesdayWinPercPlayer.push(player);
            }
        }

        // Wednesday Half Holiday
        if (wednesday) {
            useWednesdayStats = true;
            const wednesdayWins = wednesday.wins;
            const wednesdayGames = wednesday.games;
            const wednesdayAvg = wednesday.aggDiff / wednesdayGames;
            const wednesdayWinPerc = (wednesdayWins / wednesdayGames) * 100;

            if (highestWedGames > minWedGames) {
                if (highestWedGames >= minGamesForTeamRecords) {
                    minWedGames = minGamesForTeamRecords;
                } else {
                    minWedGames = highestWedGames;
                }
            }

            if (
                wednesdayAvg >= bestWednesdayAverage &&
                wednesdayGames >= minWedGames
            ) {
                if (wednesdayAvg > bestWednesdayAverage) {
                    bestWednesdayAveragePlayer = [];
                    bestWednesdayAverage = wednesdayAvg;
                }
                bestWednesdayAveragePlayer.push(player);
            }

            if (wednesdayWins >= mostWednesdayWins) {
                if (wednesdayWins > mostWednesdayWins) {
                    mostWednesdayWinsPlayer = [];
                    mostWednesdayWins = wednesdayWins;
                }
                mostWednesdayWinsPlayer.push(player);
            }

            if (
                wednesdayWinPerc >= bestWednesdayWinPerc &&
                wednesdayGames >= minWedGames
            ) {
                if (wednesdayWinPerc > bestWednesdayWinPerc) {
                    bestWednesdayWinPercPlayer = [];
                    bestWednesdayWinPerc = wednesdayWinPerc;
                }
                bestWednesdayWinPercPlayer.push(player);
            }
        }

        // Wednesday Half Holiday
        if (wednesdayPairs) {
            useWednesdayPairsStats = true;
            const wednesdayPairsWins = wednesdayPairs.wins;
            const wednesdayPairsGames = wednesdayPairs.games;
            const wednesdayPairsAvg = wednesdayPairs.aggDiff / wednesdayPairsGames;
            const wednesdayPairsWinPerc = (wednesdayPairsWins / wednesdayPairsGames) * 100;

            if (highestWedPairsGames > minWedPairsGames) {
                if (highestWedPairsGames >= minGamesForTeamRecords) {
                    minWedPairsGames = minGamesForTeamRecords;
                } else {
                    minWedPairsGames = highestWedPairsGames;
                }
            }

            if (
                wednesdayPairsAvg >= bestWednesdayPairsAverage &&
                wednesdayPairsGames >= minWedPairsGames
            ) {
                if (wednesdayPairsAvg > bestWednesdayPairsAverage) {
                    bestWednesdayPairsAveragePlayer = [];
                    bestWednesdayPairsAverage = wednesdayPairsAvg;
                }
                bestWednesdayPairsAveragePlayer.push(player);
            }

            if (wednesdayPairsWins >= mostWednesdayPairsWins) {
                if (wednesdayPairsWins > mostWednesdayPairsWins) {
                    mostWednesdayPairsWinsPlayer = [];
                    mostWednesdayPairsWins = wednesdayPairsWins;
                }
                mostWednesdayPairsWinsPlayer.push(player);
            }

            if (
                wednesdayPairsWinPerc >= bestWednesdayPairsWinPerc &&
                wednesdayPairsGames >= minWedPairsGames
            ) {
                if (wednesdayPairsWinPerc > bestWednesdayPairsWinPerc) {
                    bestWednesdayPairsWinPercPlayer = [];
                    bestWednesdayPairsWinPerc = wednesdayPairsWinPerc;
                }
                bestWednesdayPairsWinPercPlayer.push(player);
            }
        }

        // Thursday Vets
        if (thursdayVets) {
            useThursdayVetsStats = true;
            const thursdayVetsWins = thursdayVets.wins;
            const thursdayVetsGames = thursdayVets.games;
            const thursdayVetsAvg = thursdayVets.aggDiff / thursdayVetsGames;
            const thursdayVetsWinPerc =
                (thursdayVetsWins / thursdayVetsGames) * 100;

            if (highestThursVetsGames > minThurVetsGames) {
                if (highestThursVetsGames >= minGamesForTeamRecords) {
                    minThurVetsGames = minGamesForTeamRecords;
                } else {
                    minThurVetsGames = highestThursVetsGames;
                }
            }

            if (
                thursdayVetsAvg >= bestThursdayVetsAverage &&
                thursdayVetsGames >= minThurVetsGames
            ) {
                if (thursdayVetsAvg > bestThursdayVetsAverage) {
                    bestThursdayVetsAveragePlayer = [];
                    bestThursdayVetsAverage = thursdayVetsAvg;
                }
                bestThursdayVetsAveragePlayer.push(player);
            }

            if (thursdayVetsWins >= mostThursdayVetsWins) {
                if (thursdayVetsWins > mostThursdayVetsWins) {
                    mostThursdayVetsWinsPlayer = [];
                    mostThursdayVetsWins = thursdayVetsWins;
                }
                mostThursdayVetsWinsPlayer.push(player);
            }

            if (
                thursdayVetsWinPerc >= bestThursdayVetsWinPerc &&
                thursdayVetsGames >= minThurVetsGames
            ) {
                if (thursdayVetsWinPerc > bestThursdayVetsWinPerc) {
                    bestThursdayVetsWinPercPlayer = [];
                    bestThursdayVetsWinPerc = thursdayVetsWinPerc;
                }
                bestThursdayVetsWinPercPlayer.push(player);
            }
        }

        // Saturday
        if (saturday) {
            useSaturdayStats = true;
            const saturdayWins = saturday.wins;
            const saturdayGames = saturday.games;
            const saturdayAvg = saturday.aggDiff / saturdayGames;
            const saturdayWinPerc = (saturdayWins / saturdayGames) * 100;

            if (highestSatGames > minSatGames) {
                if (highestSatGames >= minGamesForTeamRecords) {
                    minSatGames = minGamesForTeamRecords;
                } else {
                    minSatGames = highestSatGames;
                }
            }

            if (
                saturdayAvg >= bestSaturdayAverage &&
                saturdayGames >= minSatGames
            ) {
                if (saturdayAvg > bestSaturdayAverage) {
                    bestSaturdayAveragePlayer = [];
                    bestSaturdayAverage = saturdayAvg;
                }
                bestSaturdayAveragePlayer.push(player);
            }

            if (saturdayWins >= mostSaturdayWins) {
                if (saturdayWins > mostSaturdayWins) {
                    mostSaturdayWinsPlayer = [];
                    mostSaturdayWins = saturdayWins;
                }
                mostSaturdayWinsPlayer.push(player);
            }

            if (
                saturdayWinPerc >= bestSaturdayWinPerc &&
                saturdayGames >= minSatGames
            ) {
                if (saturdayWinPerc > bestSaturdayWinPerc) {
                    bestSaturdayWinPercPlayer = [];
                    bestSaturdayWinPerc = saturdayWinPerc;
                }
                bestSaturdayWinPercPlayer.push(player);
            }
        }

        if (saturdayB) {
            useSaturdayBStats = true;
            const saturdayBWins = saturdayB.wins;
            const saturdayBGames = saturdayB.games;
            const saturdayBAvg = saturdayB.aggDiff / saturdayBGames;
            const saturdayBWinPerc = (saturdayBWins / saturdayBGames) * 100;

            if (highestSatBGames > minSatBGames) {
                if (highestSatBGames >= minGamesForTeamRecords) {
                    minSatBGames = minGamesForTeamRecords;
                } else {
                    minSatBGames = highestSatBGames;
                }
            }

            if (
                saturdayBAvg >= bestSaturdayBAverage &&
                saturdayBGames >= minSatBGames
            ) {
                if (saturdayBAvg > bestSaturdayBAverage) {
                    bestSaturdayBAveragePlayer = [];
                    bestSaturdayBAverage = saturdayBAvg;
                }
                bestSaturdayBAveragePlayer.push(player);
            }

            if (saturdayBWins >= mostSaturdayBWins) {
                if (saturdayBWins > mostSaturdayBWins) {
                    mostSaturdayBWinsPlayer = [];
                    mostSaturdayBWins = saturdayBWins;
                }
                mostSaturdayBWinsPlayer.push(player);
            }

            if (
                saturdayBWinPerc >= bestSaturdayBWinPerc &&
                saturdayBGames >= minSatGames
            ) {
                if (saturdayBWinPerc > bestSaturdayBWinPerc) {
                    bestSaturdayBWinPercPlayer = [];
                    bestSaturdayBWinPerc = saturdayBWinPerc;
                }
                bestSaturdayBWinPercPlayer.push(player);
            }
        }

        // Total
        const totalWins = p.awayWins + p.homeWins + p.cupWins;
        const totalLosses = p.awayLosses + p.homeLosses + p.cupLosses;
        const totalGames = totalWins + totalLosses;

        const winPerc = (totalWins / totalGames) * 100;
        const average = (p.totalAgg - p.totalAggAgainst) / totalGames;

        if (highestTotalGames > minTotalGames) {
            if (highestTotalGames >= minGamesForOverallRecords) {
                minTotalGames = minGamesForOverallRecords;
            } else {
                minTotalGames = highestTotalGames;
            }
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
            mostWinsPlayer.push(player);
        }
        if (winPerc >= bestWinPerc && playedMinGames) {
            if (winPerc > bestWinPerc) {
                bestWinPercPlayer = [];
                bestWinPerc = winPerc;
            }
            bestWinPercPlayer.push(player);
        }
        if (average >= bestAverage && playedMinGames) {
            if (average > bestAverage) {
                bestAveragePlayer = [];
                bestAverage = average;
            }
            bestAveragePlayer.push(player);
        }
    });

    function allComponent() {
        if (mostGames > 0) {
            return (
                <RecordsTableDisplay
                    minGames={minTotalGames}
                    mostGames={mostGames}
                    mostGamesPlayer={mostGamesPlayer}
                    mostWins={mostWins}
                    mostWinsPlayer={mostWinsPlayer}
                    bestWinPerc={bestWinPerc}
                    bestWinPercPlayer={bestWinPercPlayer}
                    bestAverage={bestAverage}
                    bestAveragePlayer={bestAveragePlayer}
                />
            );
        } else {
            return <p>No games played</p>;
        }
    }

    function returnMondayTeamComponent() {
        if (useMondayStats) {
            if (bestMondayAveragePlayer.length > 0) {
                return (
                    <RecordsTableDisplay
                        minGames={minMonGames}
                        mostWins={mostMondayWins}
                        mostWinsPlayer={mostMondayWinsPlayer}
                        bestWinPerc={bestMondayWinPerc}
                        bestWinPercPlayer={bestMondayWinPercPlayer}
                        bestAverage={bestMondayAverage}
                        bestAveragePlayer={bestMondayAveragePlayer}
                    />
                );
            } else {
                return <p>No games played</p>;
            }
        } else {
            return <p>{config.teamNames.short} did not play in this league for the selected year</p>;
        }
    }

    function returnTuesdayVetsTeamComponent() {
        if (useTuesdayVetsStats) {
            if (bestTuesdayVetsAveragePlayer.length > 0) {
                return (
                    <RecordsTableDisplay
                        minGames={minTuesVetsGames}
                        mostWins={mostTuesdayVetsWins}
                        mostWinsPlayer={mostTuesdayVetsWinsPlayer}
                        bestWinPerc={bestTuesdayVetsWinPerc}
                        bestWinPercPlayer={bestTuesdayVetsWinPercPlayer}
                        bestAverage={bestTuesdayVetsAverage}
                        bestAveragePlayer={bestTuesdayVetsAveragePlayer}
                    />
                );
            } else {
                return <p>No games played</p>;
            }
        } else {
            return <p>{config.teamNames.short} did not play in this league for the selected year</p>;
        }
    }

    function returnTuesdayTeamComponent() {
        if (useTuesdayStats) {
            if (bestTuesdayAveragePlayer.length > 0) {
                return (
                    <RecordsTableDisplay
                        minGames={minTuesGames}
                        mostWins={mostTuesdayWins}
                        mostWinsPlayer={mostTuesdayWinsPlayer}
                        bestWinPerc={bestTuesdayWinPerc}
                        bestWinPercPlayer={bestTuesdayWinPercPlayer}
                        bestAverage={bestTuesdayAverage}
                        bestAveragePlayer={bestTuesdayAveragePlayer}
                    />
                );
            } else {
                return <p>No games played</p>;
            }
        } else {
            return <p>{config.teamNames.short} did not play in this league for the selected year</p>;
        }
    }

    function returnWednesdayTeamComponent() {
        if (useWednesdayStats) {
            if (bestWednesdayAveragePlayer.length > 0) {
                return (
                    <RecordsTableDisplay
                        minGames={minWedGames}
                        mostWins={mostWednesdayWins}
                        mostWinsPlayer={mostWednesdayWinsPlayer}
                        bestWinPerc={bestWednesdayWinPerc}
                        bestWinPercPlayer={bestWednesdayWinPercPlayer}
                        bestAverage={bestWednesdayAverage}
                        bestAveragePlayer={bestWednesdayAveragePlayer}
                    />
                );
            } else {
                return <p>No games played</p>;
            }
        } else {
            return <p>{config.teamNames.short} did not play in this league for the selected year</p>;
        }
    }

    function returnWednesdayPairsTeamComponent() {
        if (useWednesdayPairsStats) {
            if (bestWednesdayPairsAveragePlayer.length > 0) {
                return (
                    <RecordsTableDisplay
                        minGames={minWedPairsGames}
                        mostWins={mostWednesdayPairsWins}
                        mostWinsPlayer={mostWednesdayPairsWinsPlayer}
                        bestWinPerc={bestWednesdayPairsWinPerc}
                        bestWinPercPlayer={bestWednesdayPairsWinPercPlayer}
                        bestAverage={bestWednesdayPairsAverage}
                        bestAveragePlayer={bestWednesdayPairsAveragePlayer}
                    />
                );
            } else {
                return <p>No games played</p>;
            }
        } else {
            return <p>{config.teamNames.short} did not play in this league for the selected year</p>;
        }
    }

    function returnThursdayVetsTeamComponent() {
        if (useThursdayVetsStats) {
            if (bestThursdayVetsAveragePlayer.length > 0) {
                return (
                    <RecordsTableDisplay
                        minGames={minThurVetsGames}
                        mostWins={mostThursdayVetsWins}
                        mostWinsPlayer={mostThursdayVetsWinsPlayer}
                        bestWinPerc={bestThursdayVetsWinPerc}
                        bestWinPercPlayer={bestThursdayVetsWinPercPlayer}
                        bestAverage={bestThursdayVetsAverage}
                        bestAveragePlayer={bestThursdayVetsAveragePlayer}
                    />
                );
            } else {
                return <p>No games played</p>;
            }
        } else {
            return <p>{config.teamNames.short} did not play in this league for the selected year</p>;
        }
    }

    function returnSaturdayTeamComponent() {
        if (useSaturdayStats) {
            if (bestSaturdayAveragePlayer.length > 0 || bestSaturdayBAveragePlayer.length > 0) {
                return (
                    <div>
                        {useSaturdayBStats && <h3>FIRST TEAM</h3>}
                        <RecordsTableDisplay
                            minGames={minSatGames}
                            mostWins={mostSaturdayWins}
                            mostWinsPlayer={mostSaturdayWinsPlayer}
                            bestWinPerc={bestSaturdayWinPerc}
                            bestWinPercPlayer={bestSaturdayWinPercPlayer}
                            bestAverage={bestSaturdayAverage}
                            bestAveragePlayer={bestSaturdayAveragePlayer}
                        />
                        {useSaturdayBStats && <div>
                            <br/>
                            <h3>SECOND TEAM</h3>
                            {minSatBGames > 0 && <RecordsTableDisplay
                                minGames={minSatBGames}
                                mostWins={mostSaturdayBWins}
                                mostWinsPlayer={mostSaturdayBWinsPlayer}
                                bestWinPerc={bestSaturdayBWinPerc}
                                bestWinPercPlayer={bestSaturdayBWinPercPlayer}
                                bestAverage={bestSaturdayBAverage}
                                bestAveragePlayer={bestSaturdayBAveragePlayer}
                            />}
                        </div>}

                        </div>
                );
            } else {
                return <p>No games played</p>;
            }
        } else {
            return <p>{config.teamNames.short} did not play in this league for the selected year</p>;
        }
    }

    if (mostGames > 0) {
        return (
            <div id="player-records">
                {clubCupWinner && (
                    <div className="center">
                        <h1>CLUB CUP WINNER</h1>
                        <p id='club-cup-winner'>{capitalizeText([clubCupWinner])}</p>
                    </div>
                )}

                <h1>PLAYER RECORDS</h1>
                <TeamTabs
                    id="player-record"
                    allComponent={allComponent()}
                    team1Component={returnMondayTeamComponent()}
                    team2Component={returnTuesdayVetsTeamComponent()}
                    team3Component={returnTuesdayTeamComponent()}
                    team4Component={returnWednesdayTeamComponent()}
                    team7Component={returnWednesdayPairsTeamComponent()}
                    team5Component={returnThursdayVetsTeamComponent()}
                    team6Component={returnSaturdayTeamComponent()}
                />
            </div>
        );
    } else {
        return (
            <div className="center">
                <h1>PLAYER RECORDS</h1>
                <p>No games played</p>
            </div>
        );
    }
}

export default PlayerRecords;
