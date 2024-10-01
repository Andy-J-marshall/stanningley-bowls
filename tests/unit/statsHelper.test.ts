import { expect } from 'chai';
import {
    combineTeamStats,
    findBiggestWin,
} from '../../src/helpers/statsHelper';

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

        it('Null returned if player has no wins', () => {
            const results = [
                "ali 20 - 21 leslie strang ('A')",
                'ali 13 - 21 shirley biancardo',
                'ali 0 - 21 roy tebbutt',
            ];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.be.null;
        });

        it('Null returned if player has no results', () => {
            const results: Array<string> = [];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.be.null;
        });
    });

    describe('#CombinedTeamStats()', () => {
        const stats = {
            teamResults: [
                {
                    day: 'Monday Combined Leeds',
                    awayWins: 5,
                    homeWins: 7,
                    awayLosses: 2,
                    homeLosses: 1,
                    homeDraws: 1,
                    awayDraws: 2,
                    cupWins: 1,
                    cupLosses: 0,
                    agg: 1949,
                    opponentAgg: 1572,
                    results: [
                        'Stanningley 26 - 14 Sth Lds Cons',
                        'Gildersome 14 - 26 Stanningley',
                        'Stanningley 30 - 8 Meanwood B',
                        'Western Flatts 12 - 30 Stanningley',
                        'Stanningley 28 - 17 New Wortley',
                        'Harehills 17 - 26 Stanningley',
                        'Stanningley 18 - 25 Rothwell BC',
                        'New Farnley B 27 - 15 Stanningley',
                        'Stanningley 23 - 23 Whitkirk A',
                        'Crossgates BC 29 - 11 Stanningley',
                        'Sth Lds Cons 25 - 25 Stanningley',
                        'Stanningley 26 - 13 Gildersome',
                        'Meanwood B 18 - 22 Stanningley',
                        'Stanningley 30 - 8 Western Flatts',
                        'New Wortley 21 - 24 Stanningley',
                        'Stanningley 27 - 12 Harehills',
                        'Rothwell BC 21 - 21 Stanningley',
                        'Stanningley 26 - 20 New Farnley B',
                    ],
                },
                {
                    day: 'Tuesday Vets Leeds',
                    awayWins: 4,
                    homeWins: 6,
                    awayLosses: 1,
                    homeLosses: 0,
                    homeDraws: 0,
                    awayDraws: 1,
                    cupWins: 0,
                    cupLosses: 1,
                    agg: 1866,
                    opponentAgg: 1233,
                    results: [
                        'Horsforth Woodside 21 - 38 Stanningley',
                        'New Armley 13 - 40 Stanningley',
                        'Stanningley 34 - 27 Harehills Park A',
                        'Stanningley 39 - 19 West Royd Park',
                        'Western Flatts 19 - 37 Stanningley',
                        'Stanningley 33 - 23 Barwick BC',
                        'Stanningley 40 - 14 Holbeck Moor',
                        'Gildersome 15 - 37 Stanningley',
                        'Harehills Park A 145 - 130 Stanningley',
                        'Stanningley 40 - 11 Horsforth Woodside',
                        'Stanningley 40 - 11 New Armley',
                        'Harehills Park A 34 - 24 Stanningley',
                    ],
                },
                {
                    day: 'Thursday Vets Leeds',
                    awayWins: 2,
                    homeWins: 4,
                    awayLosses: 3,
                    homeLosses: 1,
                    homeDraws: 0,
                    awayDraws: 0,
                    cupWins: 0,
                    cupLosses: 1,
                    agg: 1567,
                    opponentAgg: 1347,
                    results: [
                        'Stanningley 24 - 36 Churwell Pk',
                        'Pudsey Park A 30 - 26 Stanningley',
                        'Stanningley 36 - 16 Middleton Community',
                        'New Armley 13 - 40 Stanningley',
                        'Stanningley 34 - 25 Scatcherd Pk A',
                        'Cross Flatts Pk 32 - 24 Stanningley',
                        'Churwell Pk 35 - 32 Stanningley',
                        'Stanningley 129 - 132 Middleton Community',
                        'Stanningley 28 - 26 Pudsey Park A',
                        'Middleton Community 30 - 37 Stanningley',
                        'Stanningley 37 - 13 New Armley',
                    ],
                },
                {
                    day: 'Saturday Leeds',
                    awayWins: 6,
                    homeWins: 7,
                    awayLosses: 0,
                    homeLosses: 0,
                    homeDraws: 1,
                    awayDraws: 0,
                    cupWins: 1,
                    cupLosses: 1,
                    agg: 2298,
                    opponentAgg: 1546,
                    results: [
                        'Sth Leeds Cons B 18 - 35 Stanningley',
                        'Stanningley 37 - 22 Gildersome B',
                        'Cranmore 23 - 33 Stanningley',
                        'Stanningley 36 - 20 Middleton Comm',
                        'Stanningley 37 - 17 New Wortley',
                        'Stanningley 35 - 19 Western Flatts',
                        'Scatcherd Park B 14 - 40 Stanningley',
                        'Stanningley 161 - 119 Sth Leeds Cons B',
                        'Stanningley 37 - 17 Middleton Park',
                        'Stanningley 36 - 18 Sth Leeds Cons B',
                        'Western Flatts 121 - 120 Stanningley',
                        'Gildersome B 23 - 35 Stanningley',
                        'Stanningley 37 - 14 Cranmore',
                        'Middleton Comm 22 - 37 Stanningley',
                        'New Wortley 27 - 30 Stanningley',
                    ],
                },
            ],
        };

        let combinedStats = combineTeamStats(stats.teamResults);

        beforeEach(() => {
            // reset stats to default before each test
            combinedStats = combineTeamStats(stats.teamResults);
        });

        it('Total wins are calculated correctly', () => {
            expect(combinedStats.totalWins).to.equal(43);
        });

        it('Win breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayWins).to.equal(17);
            expect(combinedStats.combinedHomeWins).to.equal(24);
            expect(combinedStats.combinedCupWins).to.equal(2);
        });

        it('Total losses are calculated correctly', () => {
            expect(combinedStats.totalLosses).to.equal(11);
        });

        it('Losses breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayLosses).to.equal(6);
            expect(combinedStats.combinedHomeLosses).to.equal(2);
            expect(combinedStats.combinedCupLosses).to.equal(3);
        });

        it('Total draws are calculated correctly', () => {
            expect(combinedStats.totalDraws).to.equal(5);
        });

        it('Draws breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayDraws).to.equal(3);
            expect(combinedStats.combinedHomeDraws).to.equal(2);
        });

        it('Team aggregates calculated correctly', () => {
            expect(combinedStats.combinedAgg).to.equal(7680);
        });

        it('Opponent aggregates calculated correctly', () => {
            expect(combinedStats.combinedOpponentAgg).to.equal(5698);
        });
    });
});
