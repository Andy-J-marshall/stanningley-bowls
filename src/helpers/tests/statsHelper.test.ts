import { expect } from 'chai';
import {
    combineTeamStats,
    findBiggestWin,
    returnStatsForPlayersInAllYears,
} from '../statsHelper';
import stats2022 from '../../data/bowlsStats2022.json';
import { FullStatsFile } from '../../types/interfaces';

describe('#StatsHelper Tests', () => {
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

    describe('#CombinedTeamStats()', () => {
        const stats: any = stats2022;

        let combinedStats = combineTeamStats(stats.teamResults);

        it('Total wins are calculated correctly', () => {
            expect(combinedStats.totalWins).to.equal(51);
        });

        it('Win breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayWins).to.equal(22);
            expect(combinedStats.combinedHomeWins).to.equal(28);
            expect(combinedStats.combinedCupWins).to.equal(1);
        });

        it('Total losses are calculated correctly', () => {
            expect(combinedStats.totalLosses).to.equal(14);
        });

        it('Losses breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayLosses).to.equal(8);
            expect(combinedStats.combinedHomeLosses).to.equal(3);
            expect(combinedStats.combinedCupLosses).to.equal(3);
        });

        it('Total draws are calculated correctly', () => {
            expect(combinedStats.totalDraws).to.equal(3);
        });

        it('Draws breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayDraws).to.equal(2);
            expect(combinedStats.combinedHomeDraws).to.equal(1);
        });

        it('Team aggregates calculated correctly', () => {
            expect(combinedStats.combinedAgg).to.equal(9340);
        });

        it('Opponent aggregates calculated correctly', () => {
            expect(combinedStats.combinedOpponentAgg).to.equal(6894);
        });
    });

    describe('#returnStatsForPlayersInAllYears()', () => {
        it('Correctly aggregates stats for players across multiple years', () => {
            const statsArray = [
                {
                    statsYear: '2021',
                    lastUpdated: '2021-12-31',
                    playerResults: {
                        player1: {
                            totalAgg: 100,
                            totalAggAgainst: 50,
                            totalWins: 10,
                            gamesPlayed: 15,
                            singlesAgg: 60,
                            singlesAggAgainst: 30,
                            pairWins: 3,
                            singlesGames: 10,
                            totalPairsAgg: 40,
                            totalPairsAggAgainst: 20,
                            pairsGames: 5,
                            availableAgg: 500,
                            availablePairsAgg: 250,
                            availableHomeAgg: 300,
                            availableAwayAgg: 200,
                            availablePairsHomeAgg: 150,
                            availablePairsAwayAgg: 100,
                            totalHomeAgg: 300,
                            totalHomeAggAgainst: 150,
                            totalPairsHomeAgg: 100,
                            totalPairsHomeAggAgainst: 50,
                            totalAwayAgg: 200,
                            totalAwayAggAgainst: 100,
                            totalPairsAwayAgg: 50,
                            totalPairsAwayAggAgainst: 25,
                            homeWins: 5,
                            homeLosses: 2,
                            awayWins: 3,
                            awayLosses: 1,
                            cupWins: 2,
                            cupLosses: 1,
                            pairLosses: 2,
                            pairHomeWins: 2,
                            pairHomeLosses: 1,
                            pairAwayWins: 1,
                            pairAwayLosses: 1,
                            pairCupWins: 1,
                            pairCupLosses: 1,
                            totalGamesPlayed: 10,
                            results: ['ali 21 - 10 leslie strang'],
                            dayPlayed: ['Monday', 'Tuesday'],
                        },
                    },
                },
                {
                    statsYear: '2021',
                    lastUpdated: '2021-12-31',
                    playerResults: {
                        player1: {
                            totalAgg: 1000,
                            totalAggAgainst: 50,
                            totalWins: 10,
                            gamesPlayed: 15,
                            singlesAgg: 60,
                            singlesAggAgainst: 30,
                            pairWins: 3,
                            singlesGames: 10,
                            totalPairsAgg: 40,
                            totalPairsAggAgainst: 20,
                            pairsGames: 5,
                            availableAgg: 500,
                            availablePairsAgg: 250,
                            availableHomeAgg: 300,
                            availableAwayAgg: 200,
                            availablePairsHomeAgg: 150,
                            availablePairsAwayAgg: 100,
                            totalHomeAgg: 300,
                            totalHomeAggAgainst: 150,
                            totalPairsHomeAgg: 100,
                            totalPairsHomeAggAgainst: 50,
                            totalAwayAgg: 100,
                            totalAwayAggAgainst: 200,
                            totalPairsAwayAgg: 50,
                            totalPairsAwayAggAgainst: 25,
                            homeWins: 4,
                            homeLosses: 5,
                            awayWins: 7,
                            awayLosses: 15,
                            cupWins: 2,
                            cupLosses: 1,
                            pairLosses: 2,
                            pairHomeWins: 2,
                            pairHomeLosses: 3,
                            pairAwayWins: 1,
                            pairAwayLosses: 1,
                            pairCupWins: 1,
                            pairCupLosses: 1,
                            totalGamesPlayed: 10,
                            results: ['ali 21 - 10 leslie strang'],
                            dayPlayed: ['Monday', 'Tuesday'],
                        },
                    },
                },
            ];

            const result = returnStatsForPlayersInAllYears(statsArray);

            expect(result).to.deep.equal([
                {
                    player: 'player1',
                    games: 48,
                    wins: 23,
                    agg: 1100,
                    aggAgainst: 100,
                    average: 20.833333333333332,
                    winPerc: 47.91666666666667,
                    singleGames: 38,
                    singlesWins: 17,
                    singlesAgg: 1020,
                    singlesAggAgainst: 60,
                    singlesAverage: 25.263157894736842,
                    singlesWinPerc: 44.73684210526316,
                    pairsGames: 10,
                    pairsWins: 6,
                    pairsAgg: 80,
                    pairsAggAgainst: 40,
                    pairsAverage: 4,
                    pairsWinPerc: 60,
                },
            ]);
        });

        it('Handles empty stats array', () => {
            const statsArray: FullStatsFile[] = [];
            const result = returnStatsForPlayersInAllYears(statsArray);
            expect(result).to.deep.equal([]);
        });

        it('Handles players with no stats', () => {
            const statsArray = [
                {
                    statsYear: '2021',
                    lastUpdated: '2021-12-31',
                    playerResults: {},
                },
            ];
            const result = returnStatsForPlayersInAllYears(statsArray);
            expect(result).to.deep.equal([]);
        });
    });
});
