import { expect } from 'chai';
import {
    returnPlayerStatsForAllYears,
    returnPlayerStatSummaryForAllYears,
} from '../allYearPlayerStatsHelper';
import { FullStatsFile } from '../../types/interfaces';
import stats2022 from '../../data/bowlsStats2022.json';
import stats2023 from '../../data/bowlsStats2023.json';
const statsArray = [stats2022, stats2023];

describe('#allYearPlayerStatsHelper Tests', () => {
    describe('#returnPlayerStatSummaryForAllYears()', () => {
        it('Correctly aggregates stats for players across multiple years', () => {
            const result = returnPlayerStatSummaryForAllYears(statsArray);

            expect(result.length).to.equal(36);
            const player = result.find(
                (player) => player.player === 'vanessa lancaster'
            );

            expect(player).to.deep.equal({
                player: 'vanessa lancaster',
                agg: 315,
                aggAgainst: 357,
                average: -2,
                games: 21,
                pairsAgg: 100,
                pairsAggAgainst: 126,
                pairsAverage: -3.7142857142857144,
                pairsGames: 7,
                pairsWinPerc: 28.57142857142857,
                pairsWins: 2,
                singleGames: 14,
                singlesAgg: 215,
                singlesAggAgainst: 231,
                singlesAverage: -1.1428571428571428,
                singlesWinPerc: 50,
                singlesWins: 7,
                winPerc: 42.857142857142854,
                wins: 9,
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
        const result = returnPlayerStatsForAllYears(statsArray);

        const players = Object.keys(result);

        expect(players.length).to.equal(36);

        expect(result['vanessa lancaster']).to.deep.equal({
            totalAgg: 315,
            totalAggAgainst: 357,
            availableAgg: 441,
            availablePairsAgg: 147,
            availableHomeAgg: 210,
            availableAwayAgg: 210,
            availablePairsHomeAgg: 84,
            availablePairsAwayAgg: 63,
            totalPairsAgg: 100,
            totalPairsAggAgainst: 126,
            totalHomeAgg: 174,
            totalHomeAggAgainst: 161,
            totalPairsHomeAgg: 68,
            totalPairsHomeAggAgainst: 63,
            totalAwayAgg: 138,
            totalAwayAggAgainst: 175,
            totalPairsAwayAgg: 32,
            totalPairsAwayAggAgainst: 63,
            homeWins: 6,
            homeLosses: 4,
            awayWins: 3,
            awayLosses: 7,
            cupWins: 0,
            cupLosses: 1,
            pairWins: 2,
            pairLosses: 5,
            pairHomeWins: 2,
            pairHomeLosses: 2,
            pairAwayWins: 0,
            pairAwayLosses: 3,
            pairCupWins: 0,
            pairCupLosses: 0,
            totalGamesPlayed: 21,
            dayPlayed: [
                'Monday Combined Leeds',
                'Monday Combined Leeds',
                'Monday Combined Leeds',
                'Monday Combined Leeds',
                'Monday Combined Leeds',
                'Monday Combined Leeds',
                'Monday Combined Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
                'Tuesday Leeds',
            ],
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
            ],
            'monday combined leeds': { games: 7, wins: 2, aggDiff: -26 },
            'tuesday vets leeds': { games: 0, wins: 0, aggDiff: 0 },
            'thursday vets leeds': { games: 0, wins: 0, aggDiff: 0 },
            'saturday leeds': { games: 0, wins: 0, aggDiff: 0 },
            'tuesday leeds': { aggDiff: -16, games: 14, wins: 7 },
        });
    });
});
