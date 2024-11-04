import { expect } from 'chai';
import {
    returnPlayerStats,
    findBiggestWin,
    returnPlayerStatSummary,
    returnStructuredResultsArray,
} from '../playerStatsHelper';
import stats2022 from '../../data/bowlsStats2022.json';

describe('#playersStatsHelper Tests', () => {
    describe('#findBiggestWin()', () => {
        it('Biggest win found successfully', () => {
            const results = [
                'ali 15 - 21 leslie strang',
                'ali 1 - 21 shirley biancardo',
                'ali 0 - 21 roy tebbutt',
                'ali 21 - 4 alan taylor',
                'ali 18 - 10 billy ward',
                'ali 21 - 19 brian golden',
                'ali 21 - 20 brian golden',
            ];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.equal('21 - 4');
        });

        it('Biggest win found with double barrelled home names', () => {
            const results = [
                'ali-double-barrel 21 - 0 leslie strang',
                'ali 1 - 21 shirley double-barrel-biancardo',
            ];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.equal('21 - 0');
        });

        it('Biggest win found with double barrelled away names', () => {
            const results = [
                'ali 21 - 10 leslie strang',
                'ali 21 - 2 shirley double-barrel-biancardo',
            ];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.equal('21 - 2');
        });

        it('Biggest win found successfully when there are duplicates', () => {
            const results = [
                'ali 21 - 10 alan taylor',
                'ali 21 - 10 alan taylor',
                'ali 10 - 21 alan taylor',
                'ali 21 - 19 brian golden',
                'ali 19 - 21 brian golden',
                'ali 19 - 21 brian golden',
            ];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.equal('21 - 10');
        });

        it('Empty string returned if player has no wins', () => {
            const results = [
                "ali 20 - 21 leslie strang ('A')",
                'ali 13 - 21 shirley biancardo',
                'ali 0 - 21 roy tebbutt',
            ];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.equal('');
        });

        it('Empty string returned if player has no results', () => {
            const results: string[] = [];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.equal('');
        });

        it('Empty string returned if player has invalid result', () => {
            const results = ['ali 21 - roy tebbutt', 'ali - 21 roy tebbutt'];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.equal('');
        });
    });

    describe('#returnPlayerStats()', () => {
        let playerStats: any = stats2022.playerResults;
        let stats: any = returnPlayerStats(playerStats, 'paul bowes');

        it('Games Played', () => {
            const {
                gamesPlayed,
                singlesGames,
                homeGamesPlayed,
                cupGamesPlayed,
                awayGamesPlayed,
            } = stats;
            expect(gamesPlayed).to.equal(53);
            expect(singlesGames).to.equal(43);
            expect(homeGamesPlayed).to.equal(25);
            expect(cupGamesPlayed).to.equal(4);
            expect(awayGamesPlayed).to.equal(24);
        });

        it('Averages', () => {
            const {
                average,
                homeAverage,
                awayAverage,
                cupAverage,
                singlesAvg,
                pairsAvg,
            } = stats;
            expect(average.toFixed(2)).to.equal('9.64');
            expect(homeAverage.toFixed(2)).to.equal('10.48');
            expect(cupAverage.toFixed(2)).to.equal('14.00');
            expect(awayAverage.toFixed(2)).to.equal('8.04');
            expect(singlesAvg.toFixed(2)).to.equal('11.56');
            expect(pairsAvg.toFixed(2)).to.equal('1.40');
        });

        it('Wins', () => {
            const { totalWins, homeWins, awayWins, cupWins } = stats;
            expect(totalWins).to.equal(43);
            expect(homeWins).to.equal(22);
            expect(cupWins).to.equal(4);
            expect(awayWins).to.equal(17);
        });

        it('Losses', () => {
            const { totalLosses, homeLosses, awayLosses, cupLosses } = stats;
            expect(totalLosses).to.equal(10);
            expect(homeLosses).to.equal(3);
            expect(cupLosses).to.equal(0);
            expect(awayLosses).to.equal(7);
        });

        it('Aggregates show correctly', () => {
            const {
                totalAgg,
                totalAggAgainst,
                cupAgg,
                cupAggAgainst,
                totalHomeAgg,
                totalHomeAggAgainst,
                totalAwayAgg,
                totalAwayAggAgainst,
                singlesAgg,
                singlesAggAgainst,
                totalPairsAgg,
                totalPairsAggAgainst,
            } = stats;
            expect(totalAgg).to.equal(1059);
            expect(totalHomeAgg).to.equal(498);
            expect(cupAgg).to.equal(84);
            expect(totalAwayAgg).to.equal(477);
            expect(totalAggAgainst).to.equal(548);
            expect(totalHomeAggAgainst).to.equal(236);
            expect(cupAggAgainst).to.equal(28);
            expect(totalAwayAggAgainst).to.equal(284);
            expect(singlesAgg).to.equal(884);
            expect(singlesAggAgainst).to.equal(387);
            expect(totalPairsAgg).to.equal(175);
            expect(totalPairsAggAgainst).to.equal(161);
        });

        it('Results listed correctly', () => {
            const { results, biggestWin } = stats;
            expect(results[0]).to.equal(
                'paul bowes & alyssa randell 17 - 21 malcolm colinson & chris walsh'
            );
            expect(results).to.have.lengthOf(53);
            expect(biggestWin).to.equal('21 - 0');
        });

        it('Days with no games are not returned', () => {
            const { allTeamStats } = stats;
            const tuesdayEvening = allTeamStats.find((team: any) => {
                return team.teamName === 'tuesday leeds';
            });
            const wednesday = allTeamStats.find((team: any) => {
                return team.teamName === 'wednesday half holiday leeds';
            });

            expect(tuesdayEvening).to.be.undefined;
            expect(wednesday).to.be.undefined;
        });

        it('Tuesday evening and Wednesday can calculate stats', () => {
            playerStats['paul bowes']['wednesday half holiday leeds'] = {
                games: 1,
                wins: 1,
                aggDiff: 21,
            };
            playerStats['paul bowes']['tuesday leeds'] = {
                games: 11,
                wins: 7,
                aggDiff: -33,
            };

            stats = returnPlayerStats(playerStats, 'paul bowes');

            const { allTeamStats } = stats;
            const tuesdayEvening = allTeamStats.find((team: any) => {
                return team.teamName === 'tuesday leeds';
            });
            const wednesday = allTeamStats.find((team: any) => {
                return team.teamName === 'wednesday half holiday leeds';
            });

            expect(tuesdayEvening.teamWins).to.equal(7);
            expect(tuesdayEvening.teamLosses).to.equal(4);
            expect(tuesdayEvening.teamGames).to.equal(11);
            expect(tuesdayEvening.teamAvg).to.equal(-3);
            expect(wednesday.teamWins).to.equal(1);
            expect(wednesday.teamLosses).to.equal(0);
            expect(wednesday.teamGames).to.equal(1);
            expect(wednesday.teamAvg).to.equal(21);
        });

        it('Days with games show correct values', () => {
            const { allTeamStats } = stats;
            const monday = allTeamStats.find((team: any) => {
                return team.teamName === 'monday combined leeds';
            });
            const tuesVets = allTeamStats.find((team: any) => {
                return team.teamName === 'tuesday vets leeds';
            });
            const thursVets = allTeamStats.find((team: any) => {
                return team.teamName === 'thursday vets leeds';
            });
            const saturday = allTeamStats.find((team: any) => {
                return team.teamName === 'saturday leeds';
            });

            expect(monday.teamWins).to.equal(7);
            expect(monday.teamLosses).to.equal(6);
            expect(monday.teamGames).to.equal(13);
            expect(monday.teamAvg.toFixed(2)).to.equal('3.15');

            expect(tuesVets.teamWins).to.equal(12);
            expect(tuesVets.teamLosses).to.equal(2);
            expect(tuesVets.teamGames).to.equal(14);
            expect(tuesVets.teamAvg.toFixed(2)).to.equal('10.36');

            expect(thursVets.teamWins).to.equal(7);
            expect(thursVets.teamLosses).to.equal(2);
            expect(thursVets.teamGames).to.equal(9);
            expect(thursVets.teamAvg.toFixed(2)).to.equal('10.78');

            expect(saturday.teamWins).to.equal(17);
            expect(saturday.teamLosses).to.equal(0);
            expect(saturday.teamGames).to.equal(17);
            expect(saturday.teamAvg.toFixed(2)).to.equal('13.41');
        });
    });

    describe('#returnStructuredResultsArray()', () => {
        it('Correctly structures results array', () => {
            const results = [
                'ali 21 - 10 mr alan taylor',
                "barry o'geary 1 - 21 steve smith-rowe",
            ];

            const structuredResult = returnStructuredResultsArray(results);

            const expectedResult = [
                {
                    home: {
                        name: 'ali',
                        score: '21',
                    },
                    away: {
                        name: 'mr alan taylor',
                        score: '10',
                    },
                },
                {
                    home: {
                        name: "barry o'geary",
                        score: '1',
                    },
                    away: {
                        name: 'steve smith-rowe',
                        score: '21',
                    },
                },
            ];
            expect(structuredResult).to.deep.equal(expectedResult);
        });
    });

    describe('#returnPlayerStatSummary()', () => {
        it('Correctly aggregates stats for players across multiple years', () => {
            const result = returnPlayerStatSummary(stats2022.playerResults, [
                'vanessa lancaster',
                'paul bowes',
                'alison woodfine',
            ]);

            expect(result.length).to.equal(3);
            const player = result.find(
                (player) => player.player === 'vanessa lancaster'
            );

            expect(player).to.deep.equal({
                player: 'vanessa lancaster',
                games: 4,
                wins: 1,
                winPerc: 25,
                average: -3.5,
                agg: 57,
                aggAgainst: 71,

                singlesGames: 0,
                singlesWins: 0,
                singlesWinPerc: 0,
                singlesAverage: -99,
                singlesAgg: 0,
                singlesAggAgainst: 0,

                pairsGames: 4,
                pairsWins: 1,
                pairsWinPerc: 25,
                pairsAverage: -3.5,
                pairsAgg: 57,
                pairsAggAgainst: 71,

                homeGames: 2,
                homeWins: 1,
                homeWinPerc: 50,
                homeAverage: 0,
                homeAgg: 29,
                homeAggAgainst: 29,

                awayGames: 2,
                awayWins: 0,
                awayWinPerc: 0,
                awayAverage: -7,
                awayAgg: 28,
                awayAggAgainst: 42,

                cupGames: 0,
                cupWins: 0,
                cupWinPerc: 0,
                cupAverage: -99,
                cupAgg: 0,
                cupAggAgainst: 0,

                pairsHomeAgg: 29,
                pairsHomeAggAgainst: 29,
                pairsHomeAverage: 0,
                pairsHomeGames: 2,
                pairsHomeWinPerc: 50,
                pairsHomeWins: 1,

                pairsAwayAgg: 28,
                pairsAwayAggAgainst: 42,
                pairsAwayAverage: -7,
                pairsAwayGames: 2,
                pairsAwayWinPerc: 0,
                pairsAwayWins: 0,

                pairsCupAgg: 0,
                pairsCupAggAgainst: 0,
                pairsCupAverage: -99,
                pairsCupGames: 0,
                pairsCupWinPerc: 0,
                pairsCupWins: 0,

                singlesHomeAgg: 0,
                singlesHomeAggAgainst: 0,
                singlesHomeAverage: -99,
                singlesHomeGames: 0,
                singlesHomeWinPerc: 0,
                singlesHomeWins: 0,

                singlesAwayAgg: 0,
                singlesAwayAggAgainst: 0,
                singlesAwayAverage: -99,
                singlesAwayGames: 0,
                singlesAwayWinPerc: 0,
                singlesAwayWins: 0,

                singlesCupAgg: 0,
                singlesCupAggAgainst: 0,
                singlesCupAverage: -99,
                singlesCupGames: 0,
                singlesCupWinPerc: 0,
                singlesCupWins: 0,
            });
        });
    });
});
