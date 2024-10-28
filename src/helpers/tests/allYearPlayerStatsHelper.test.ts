import { expect } from 'chai';
import { returnPlayerStatSummaryForAllYears } from '../allYearPlayerStatsHelper';
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
});
