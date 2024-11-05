import { expect } from 'chai';
import { returnTabName } from '../statsHelper';
import { checkAllWinPercAndAverageAreNumbers } from '../statsHelper';

describe('#StatsHelper Tests', () => {
    describe('returnTabName', () => {
        it('should return the display name without any modifications', () => {
            const teamName = 'Team A';
            const displayName = returnTabName(teamName);
            expect(displayName).to.equal('TEA');
        });

        it('should append "(VETS)" to the display name if team name includes "vets"', () => {
            const teamName = 'Team A Vets';
            const displayName = returnTabName(teamName);
            expect(displayName).to.equal('TEA (VETS)');
        });

        it('should append "(B)" to the display name if team name includes "(b)"', () => {
            const teamName = 'Team A (B)';
            const displayName = returnTabName(teamName);
            expect(displayName).to.equal('TEA (B)');
        });

        it('should append "(PAIRS)" to the display name if team name includes "pairs"', () => {
            const teamName = 'Team A Pairs';
            const displayName = returnTabName(teamName);
            expect(displayName).to.equal('TEA (PAIRS)');
        });
    });

    describe('checkWinPercAndAverageAreNumbers', () => {
        it('should verify win percentage and average are numbers and set defaults if not', () => {
            const stats = {
                player: 'string',

                games: NaN,
                wins: NaN,
                winPerc: NaN,
                average: NaN,
                agg: NaN,
                aggAgainst: NaN,

                singlesGames: NaN,
                singlesWins: NaN,
                singlesWinPerc: NaN,
                singlesAverage: NaN,
                singlesAgg: NaN,
                singlesAggAgainst: NaN,

                pairsGames: NaN,
                pairsWins: NaN,
                pairsWinPerc: NaN,
                pairsAverage: NaN,
                pairsAgg: NaN,
                pairsAggAgainst: NaN,

                homeGames: NaN,
                homeWins: NaN,
                homeWinPerc: NaN,
                homeAverage: NaN,
                homeAgg: NaN,
                homeAggAgainst: NaN,

                singlesHomeGames: NaN,
                singlesHomeWins: NaN,
                singlesHomeWinPerc: NaN,
                singlesHomeAverage: NaN,
                singlesHomeAgg: NaN,
                singlesHomeAggAgainst: NaN,

                pairsHomeGames: NaN,
                pairsHomeWins: NaN,
                pairsHomeWinPerc: NaN,
                pairsHomeAverage: NaN,
                pairsHomeAgg: NaN,
                pairsHomeAggAgainst: NaN,

                awayGames: NaN,
                awayWins: NaN,
                awayWinPerc: NaN,
                awayAverage: NaN,
                awayAgg: NaN,
                awayAggAgainst: NaN,

                singlesAwayGames: NaN,
                singlesAwayWins: NaN,
                singlesAwayWinPerc: NaN,
                singlesAwayAverage: NaN,
                singlesAwayAgg: NaN,
                singlesAwayAggAgainst: NaN,

                pairsAwayGames: NaN,
                pairsAwayWins: NaN,
                pairsAwayWinPerc: NaN,
                pairsAwayAverage: NaN,
                pairsAwayAgg: NaN,
                pairsAwayAggAgainst: NaN,

                cupGames: NaN,
                cupWins: NaN,
                cupWinPerc: NaN,
                cupAverage: NaN,
                cupAgg: NaN,
                cupAggAgainst: NaN,

                singlesCupGames: NaN,
                singlesCupWins: NaN,
                singlesCupWinPerc: NaN,
                singlesCupAverage: NaN,
                singlesCupAgg: NaN,
                singlesCupAggAgainst: NaN,

                pairsCupGames: NaN,
                pairsCupWins: NaN,
                pairsCupWinPerc: NaN,
                pairsCupAverage: NaN,
                pairsCupAgg: NaN,
                pairsCupAggAgainst: NaN,
            };

            const expectedResult = {
                winPerc: 0,
                average: -99,
                singlesWinPerc: 0,
                singlesAverage: -99,
                pairsWinPerc: 0,
                pairsAverage: -99,
                homeWinPerc: 0,
                homeAverage: -99,
                awayWinPerc: 0,
                awayAverage: -99,
                cupWinPerc: 0,
                cupAverage: -99,
                singlesHomeWinPerc: 0,
                singlesHomeAverage: -99,
                singlesAwayWinPerc: 0,
                singlesAwayAverage: -99,
                singlesCupWinPerc: 0,
                singlesCupAverage: -99,
                pairsHomeWinPerc: 0,
                pairsHomeAverage: -99,
                pairsAwayWinPerc: 0,
                pairsAwayAverage: -99,
                pairsCupWinPerc: 0,
                pairsCupAverage: -99,
            };

            const result = checkAllWinPercAndAverageAreNumbers(stats);
            expect(result).to.deep.contain(expectedResult);
        });
    });
});
