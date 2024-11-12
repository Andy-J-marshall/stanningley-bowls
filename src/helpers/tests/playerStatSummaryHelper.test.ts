import { expect } from 'chai';
import stats2022 from '../../data/bowlsStats2022.json';
import {
    returnPlayerStatSummary,
    returnPlayerSummaryDisplayStats,
} from '../playerStatsSummaryHelper';

describe('#playersStatsSummaryHelper Tests', () => {
    describe('#returnPlayerStatSummary()', () => {
        it('Correctly calculates stats for players for given year', () => {
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

    describe('#returnPlayerSummaryDisplayStats()', () => {
        const playerName = 'paul bowes';

        const stats = [
            {
                player: 'paul bowes',

                games: 100,
                wins: 70,
                winPerc: 70,
                average: 6,
                agg: 2000,
                aggAgainst: 1300,

                singlesGames: 89,
                singlesWins: 65,
                singlesWinPerc: 73.03,
                singlesAverage: 6.5,
                singlesAgg: 1800,
                singlesAggAgainst: 1110,

                pairsGames: 11,
                pairsWins: 5,
                pairsWinPerc: 45.45,
                pairsAverage: 0.8,
                pairsAgg: 200,
                pairsAggAgainst: 190,

                homeGames: 40,
                homeWins: 36,
                homeWinPerc: 90,
                homeAverage: 10,
                homeAgg: 800,
                homeAggAgainst: 400,

                singlesHomeGames: 34,
                singlesHomeWins: 30,
                singlesHomeWinPerc: 88.23,
                singlesHomeAverage: 10,
                singlesHomeAgg: 700,
                singlesHomeAggAgainst: 300,

                pairsHomeGames: 6,
                pairsHomeWins: 2,
                pairsHomeWinPerc: 33.33,
                pairsHomeAverage: -0.75,
                pairsHomeAgg: 75,
                pairsHomeAggAgainst: 80,

                awayGames: 50,
                awayWins: 30,
                awayWinPerc: 60,
                awayAverage: 1,
                awayAgg: 900,
                awayAggAgainst: 850,

                singlesAwayGames: 45,
                singlesAwayWins: 26,
                singlesAwayWinPerc: 57.77,
                singlesAwayAverage: 0.5,
                singlesAwayAgg: 750,
                singlesAwayAggAgainst: 765,

                pairsAwayGames: 5,
                pairsAwayWins: 4,
                pairsAwayWinPerc: 80,
                pairsAwayAverage: 3,
                pairsAwayAgg: 100,
                pairsAwayAggAgainst: 85,

                cupGames: 10,
                cupWins: 8,
                cupWinPerc: 80,
                cupAverage: 2,
                cupAgg: 200,
                cupAggAgainst: 180,

                singlesCupGames: 10,
                singlesCupWins: 8,
                singlesCupWinPerc: 80,
                singlesCupAverage: 2,
                singlesCupAgg: 200,
                singlesCupAggAgainst: 180,

                pairsCupGames: 0,
                pairsCupWins: 0,
                pairsCupWinPerc: 0,
                pairsCupAverage: 0,
                pairsCupAgg: 0,
                pairsCupAggAgainst: 0,
            },
        ];

        it('Correctly determines which stats to display on the summary page - all', () => {
            const result = returnPlayerSummaryDisplayStats(
                stats,
                false,
                false,
                false,
                false,
                false
            );

            expect(result.length).to.equal(1);
            const player = result.find(
                (player) => player.player === playerName
            );

            expect(player).to.deep.equal({
                player: playerName,

                games: 100,
                wins: 70,
                winPerc: 70,
                average: 6.0,
                aggDiff: 600,
            });
        });

        it('Correctly determines which stats to display on the summary page - home', () => {
            const result = returnPlayerSummaryDisplayStats(
                stats,
                false,
                false,
                true,
                false,
                false
            );

            const player = result.find(
                (player) => player.player === playerName
            );

            expect(player).to.deep.equal({
                player: playerName,

                games: 40,
                wins: 36,
                winPerc: 90,
                average: 10.0,
                aggDiff: 400,
            });
        });

        it('Correctly determines which stats to display on the summary page - singles', () => {
            const result = returnPlayerSummaryDisplayStats(
                stats,
                true,
                false,
                false,
                false,
                false
            );

            const player = result.find(
                (player) => player.player === playerName
            );

            expect(player).to.deep.equal({
                player: playerName,

                games: 89,
                wins: 65,
                winPerc: 73,
                average: 6.5,
                aggDiff: 579,
            });
        });

        it('Correctly determines which stats to display on the summary page - away singles', () => {
            const result = returnPlayerSummaryDisplayStats(
                stats,
                true,
                false,
                false,
                true,
                false
            );

            const player = result.find(
                (player) => player.player === playerName
            );

            expect(player).to.deep.equal({
                player: playerName,

                games: 45,
                wins: 26,
                winPerc: 58,
                average: 0.5,
                aggDiff: 23,
            });
        });

        it('Correctly determines which stats to display on the summary page - pairs cup', () => {
            const result = returnPlayerSummaryDisplayStats(
                stats,
                false,
                true,
                false,
                false,
                true
            );

            const player = result.find(
                (player) => player.player === playerName
            );

            expect(player).to.deep.equal({
                player: playerName,

                games: 0,
                wins: 0,
                winPerc: 0,
                average: 0.0,
                aggDiff: 0,
            });
        });
    });
});
