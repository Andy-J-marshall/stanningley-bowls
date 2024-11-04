import { expect } from 'chai';
import {
    returnPlayerStatsForAllYears,
    returnPlayerStatSummaryForAllYears,
} from '../allYearPlayerStatsHelper';
import { FullStatsFile } from '../../types/interfaces';
import stats2022 from '../../data/bowlsStats2022.json';
import stats2023 from '../../data/bowlsStats2023.json';
import stats2024 from '../../data/bowlsStats2024.json';

describe('#allYearPlayerStatsHelper Tests', () => {
    describe('#returnPlayerStatSummaryForAllYears()', () => {
        it('Correctly aggregates stats for players across multiple years', () => {
            const statsArray = [stats2022, stats2023];
            const result = returnPlayerStatSummaryForAllYears(statsArray);

            expect(result.length).to.equal(36);
            const player = result.find(
                (player) => player.player === 'vanessa lancaster'
            );

            expect(player).to.deep.equal({
                player: 'vanessa lancaster',
                games: 21,
                winPerc: 42.857142857142854,
                wins: 9,
                average: -2,
                agg: 315,
                aggAgainst: 357,

                pairsGames: 7,
                pairsWins: 2,
                pairsWinPerc: 28.57142857142857,
                pairsAverage: -3.7142857142857144,
                pairsAgg: 100,
                pairsAggAgainst: 126,

                singleGames: 14,
                singlesWins: 7,
                singlesWinPerc: 50,
                singlesAverage: -1.1428571428571428,
                singlesAgg: 215,
                singlesAggAgainst: 231,

                homeGames: 10,
                homeWins: 6,
                homeWinPerc: 60,
                homeAverage: 1.3,
                homeAgg: 174,
                homeAggAgainst: 161,

                awayGames: 10,
                awayWins: 3,
                awayWinPerc: 30,
                awayAverage: -3.7,
                awayAgg: 138,
                awayAggAgainst: 175,

                cupGames: 1,
                cupWins: 0,
                cupWinPerc: 0,
                cupAverage: -18,
                cupAgg: 3,
                cupAggAgainst: 21,
            });
        });

        it('Handles empty stats array', () => {
            const statsArray: FullStatsFile[] = [];
            const result = returnPlayerStatSummaryForAllYears(statsArray);
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
            const result = returnPlayerStatSummaryForAllYears(statsArray);
            expect(result).to.deep.equal([]);
        });
    });

    describe('#returnPlayerStatsForAllYears()', () => {
        const statsArray = [stats2022, stats2023, stats2024];
        const result = returnPlayerStatsForAllYears(statsArray);

        const players = Object.keys(result);

        expect(players.length).to.equal(47);

        expect(result['vanessa lancaster']).to.deep.equal({
            totalAgg: 725,
            totalAggAgainst: 788,
            availableAgg: 975,
            availablePairsAgg: 408,
            availableHomeAgg: 451,
            availableAwayAgg: 477,
            availablePairsHomeAgg: 220,
            availablePairsAwayAgg: 162,
            totalPairsAgg: 309,
            totalPairsAggAgainst: 336,
            totalHomeAgg: 353,
            totalHomeAggAgainst: 346,
            totalPairsHomeAgg: 170,
            totalPairsHomeAggAgainst: 159,
            totalAwayAgg: 345,
            totalAwayAggAgainst: 395,
            totalPairsAwayAgg: 115,
            totalPairsAwayAggAgainst: 151,
            homeWins: 11,
            homeLosses: 10,
            awayWins: 9,
            awayLosses: 13,
            cupWins: 0,
            cupLosses: 2,
            pairWins: 7,
            pairLosses: 11,
            pairHomeWins: 5,
            pairHomeLosses: 5,
            pairAwayWins: 2,
            pairAwayLosses: 5,
            pairCupWins: 0,
            pairCupLosses: 1,
            totalGamesPlayed: 45,
            results: [
                'vanessa lancaster & paul bowes 21 - 8 james wright-green & peter simmons',
                'vanessa lancaster & paul bowes 20 - 21 nicola pearson & gary dennison',
                'vanessa lancaster & paul bowes 8 - 21 keith skelton & harry dixon',
                'vanessa lancaster & paul bowes 8 - 21 helen johnson & thomas johnson',
                'vanessa lancaster & paul bowes 21 - 13 david bisby & joe doughty',
                'vanessa lancaster & malvin miller 18 - 21 graham hey & david l miller',
                'vanessa lancaster & malvin miller 4 - 21 angela morley & stuart reardon',
                'vanessa lancaster 21 - 8 barbara moss',
                'vanessa lancaster 10 - 21 malcolm cameron',
                'vanessa lancaster 15 - 21 simon malins',
                'vanessa lancaster 21 - 10 anthony rushfirth',
                'vanessa lancaster 10 - 21 hazel goodall',
                'vanessa lancaster 12 - 21 graham hey',
                'vanessa lancaster 3 - 21 sophie worral',
                'vanessa lancaster 21 - 19 tracy norton',
                'vanessa lancaster 12 - 21 dennis walters',
                'vanessa lancaster 21 - 19 graham fotherby',
                'vanessa lancaster 21 - 7 charlotte doris',
                'vanessa lancaster 6 - 21 nicholas ryder',
                'vanessa lancaster 21 - 10 margaret johnstone',
                'vanessa lancaster 21 - 11 nigel fotherby',
                'vanessa lancaster 9 - 21 g hodder',
                'vanessa lancaster & colin haque 21 - 16 graham hey & pat prosser',
                'vanessa lancaster & colin haque 10 - 21 gina long & david smith',
                'vanessa lancaster & colin haque 21 - 4 maveen tomlinson & peter colley',
                'vanessa lancaster & colin haque 9 - 21 lyn dye & ron owen',
                'vanessa lancaster & stuart potter 14 - 21 mark taylor & louie taylor',
                'vanessa lancaster 21 - 9 maveen tomlinson',
                'vanessa lancaster 14 - 21 phil lodge',
                'vanessa lancaster 12 - 21 carl birkin',
                'vanessa lancaster 21 - 12 brian scholes',
                'vanessa lancaster 21 - 10 edward gerngross',
                'vanessa lancaster 5 - 21 john ackroyd',
                'vanessa lancaster 12 - 21 malcolm hallas',
                'vanessa lancaster 17 - 21 steve barltrop',
                'vanessa lancaster 6 - 21 ian lee',
                'vanessa lancaster & laila packer 11 - 26 wendy allison & alan wittrick',
                'vanessa lancaster & ken green 26 - 8 maureen morris & alan taylor',
                'vanessa lancaster & colin haque 24 - 26 christine scott & ian scott',
                'vanessa lancaster & derek wilson 26 - 25 frank baker & joan baker',
                'vanessa lancaster & stuart potter 26 - 16 steve richardson & gordon robinson',
                'vanessa lancaster & ken green 21 - 26 john hindle & philip mcstay',
                'vanessa lancaster 21 - 16 tony morris',
                'vanessa lancaster 21 - 10 gerry faller',
                'vanessa lancaster 21 - 17 deborah stafford',
            ],
            'monday combined leeds': { games: 13, wins: 4, aggDiff: -46 },
            'tuesday vets leeds': { games: 0, wins: 0, aggDiff: 0 },
            'thursday vets leeds': { games: 0, wins: 0, aggDiff: 0 },
            'saturday leeds': { games: 0, wins: 0, aggDiff: 0 },
            'tuesday leeds': { aggDiff: -44, games: 23, wins: 10 },
            'wednesday pairs airewharfe': { aggDiff: 7, games: 6, wins: 3 },
            'saturday leeds (b)': { aggDiff: 20, games: 3, wins: 3 },
        });
    });
});
