import { expect } from 'chai';
import { orderBy, returnTabName } from '../statsHelper';
import { checkAllWinPercAndAverageAreNumbers } from '../statsHelper';

describe('#StatsHelper Tests', () => {
    describe('returnTabName', () => {
        // TODO remember to rename files!
        it('should return the display name without any modifications when team has 1 word', () => {
            const teamName = 'Bradford Saturday';
            const displayName = returnTabName(teamName);
            expect(displayName).to.equal('SAT');
        });

        it('should return the display name without any modifications when team has 1 word', () => {
            const teamName = 'Mirfield';
            const displayName = returnTabName(teamName);
            expect(displayName).to.equal('MIR');
        });

        it('should append "(VETS)" to the display name if team name includes "vets"', () => {
            const teamName = 'Leeds Tuesday Vets';
            const displayName = returnTabName(teamName);
            expect(displayName).to.equal('TUE (VETS)');
        });

        it('should append "(PAIRS)" to the display name if team name includes "pairs"', () => {
            const teamName = 'AireWharfe Wednesday Pairs';
            const displayName = returnTabName(teamName);
            expect(displayName).to.equal('WED (PAIRS)');
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

    describe('orderBy', () => {
        it('should order player stats by the specified property in descending order', () => {
            const playerStats = [
                {
                    player: 'Player A',
                    games: 20,
                    wins: 18,
                    winPerc: 90,
                    average: 10,
                    aggDiff: 200,
                },
                {
                    player: 'Player B',
                    games: 30,
                    wins: 0,
                    winPerc: 0,
                    average: -12,
                    aggDiff: -360,
                },
                {
                    player: 'Player C',
                    games: 10,
                    wins: 5,
                    winPerc: 50,
                    average: 0,
                    aggDiff: 0,
                },
                {
                    player: 'Player D',
                    games: 11,
                    wins: 11,
                    winPerc: 100,
                    average: 11,
                    aggDiff: 121,
                },
            ];

            const orderedStatsGames = orderBy('games', playerStats);
            expect(orderedStatsGames[0].player).to.equal('Player B');
            expect(orderedStatsGames[1].player).to.equal('Player A');
            expect(orderedStatsGames[2].player).to.equal('Player D');
            expect(orderedStatsGames[3].player).to.equal('Player C');

            const orderedStatsWins = orderBy('wins', playerStats);
            expect(orderedStatsWins[0].player).to.equal('Player A');
            expect(orderedStatsWins[1].player).to.equal('Player D');
            expect(orderedStatsWins[2].player).to.equal('Player C');
            expect(orderedStatsWins[3].player).to.equal('Player B');

            const orderedStatsWinPerc = orderBy('winPerc', playerStats);
            expect(orderedStatsWinPerc[0].player).to.equal('Player D');
            expect(orderedStatsWinPerc[1].player).to.equal('Player A');
            expect(orderedStatsWinPerc[2].player).to.equal('Player C');
            expect(orderedStatsWinPerc[3].player).to.equal('Player B');

            const orderedStatsAverage = orderBy('average', playerStats);
            expect(orderedStatsAverage[0].player).to.equal('Player D');
            expect(orderedStatsAverage[1].player).to.equal('Player A');
            expect(orderedStatsAverage[2].player).to.equal('Player C');
            expect(orderedStatsAverage[3].player).to.equal('Player B');
        });
    });
});
