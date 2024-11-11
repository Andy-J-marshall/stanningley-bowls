import { expect } from 'chai';
import stats2022 from '../../data/bowlsStats2022.json';
import { returnPlayerStatSummary } from '../playerStatsSummaryHelper';

describe('#playersStatsHelper Tests', () => {
    describe('#returnPlayerStatSummary()', () => {
        it('Correctly aggregates stats for players across multiple years', () => {
            const result = returnPlayerStatSummary(stats2022.playerResults, [
                'paul bowes',
                'alison woodfine',
            ]);

            expect(result.length).to.equal(2);
            const player = result.find(
                (player) => player.player === 'paul bowes'
            );

            expect(player).to.deep.equal({
                player: 'paul bowes',

                games: 53,
                wins: 43,
                winPerc: 81.13207547169812,
                average: 9.641509433962264,
                agg: 1059,
                aggAgainst: 548,

                singlesGames: 43,
                singlesWins: 38,
                singlesWinPerc: 88.37209302325581,
                singlesAverage: 11.55813953488372,
                singlesAgg: 884,
                singlesAggAgainst: 387,

                pairsGames: 10,
                pairsWins: 5,
                pairsWinPerc: 50,
                pairsAverage: 1.4,
                pairsAgg: 175,
                pairsAggAgainst: 161,

                homeGames: 25,
                homeWins: 22,
                homeWinPerc: 88,
                homeAverage: 10.48,
                homeAgg: 498,
                homeAggAgainst: 236,

                awayGames: 24,
                awayWins: 17,
                awayWinPerc: 70.83333333333334,
                awayAverage: 8.041666666666666,
                awayAgg: 477,
                awayAggAgainst: 284,

                cupAgg: 84,
                cupAggAgainst: 28,
                cupAverage: 14,
                cupGames: 4,
                cupWinPerc: 100,
                cupWins: 4,

                singlesAwayGames: 19,
                singlesAwayWins: 15,
                singlesAwayWinPerc: 78.94736842105263,
                singlesAwayAverage: 10.052631578947368,
                singlesAwayAgg: 390,
                singlesAwayAggAgainst: 199,

                singlesCupGames: 4,
                singlesCupWins: 4,
                singlesCupWinPerc: 100,
                singlesCupAverage: 14,
                singlesCupAgg: 84,
                singlesCupAggAgainst: 28,

                singlesHomeGames: 20,
                singlesHomeWins: 19,
                singlesHomeWinPerc: 95,
                singlesHomeAverage: 12.5,
                singlesHomeAgg: 410,
                singlesHomeAggAgainst: 160,

                pairsHomeGames: 5,
                pairsHomeWins: 3,
                pairsHomeWinPerc: 60,
                pairsHomeAverage: 2.4,
                pairsHomeAgg: 88,
                pairsHomeAggAgainst: 76,

                pairsAwayGames: 5,
                pairsAwayWins: 2,
                pairsAwayWinPerc: 40,
                pairsAwayAverage: 0.4,
                pairsAwayAgg: 87,
                pairsAwayAggAgainst: 85,

                pairsCupGames: 0,
                pairsCupWins: 0,
                pairsCupWinPerc: 0,
                pairsCupAverage: -99,
                pairsCupAgg: 0,
                pairsCupAggAgainst: 0,
            });
        });
    });

    // TODO create test for returnPlayerSummaryDisplayStats
});
