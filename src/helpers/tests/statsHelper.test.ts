import { expect } from 'chai';
import { returnTabName } from '../statsHelper';
import { checkWinPercAndAverageAreNumbers } from '../statsHelper';

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
                winPerc: 'NaN',
                average: 'NaN',
                singlesWinPerc: 'NaN',
                singlesAverage: 'NaN',
                pairsWinPerc: 'NaN',
                pairsAverage: 'NaN',
            };

            const expectedResult = {
                winPerc: 0,
                average: -99,
                singlesWinPerc: 0,
                singlesAverage: -99,
                pairsWinPerc: 0,
                pairsAverage: -99,
            };

            const result = checkWinPercAndAverageAreNumbers(stats);
            expect(result).to.deep.equal(expectedResult);
        });
    });
});
