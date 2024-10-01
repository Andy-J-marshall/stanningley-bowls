import { expect } from 'chai';
import { combineTeamStats, findBiggestWin } from '../statsHelper';
import stats2022 from '../../data/bowlsStats2022.json';

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
            const results: Array<string> = [];
            const biggestWin = findBiggestWin(results);
            expect(biggestWin).to.equal('');
        });

        it('Empty string returned if player has invalid result', () => {
            const results = ['ali 21 - roy tebbutt'];
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
});
