import { expect } from 'chai';
import { combineTeamStats } from '../teamStatsHelper';
import stats2022 from '../../data/bowlsStats2022.json';

describe('#StatsHelper Tests', () => {
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
});
