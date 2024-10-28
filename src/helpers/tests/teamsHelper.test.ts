import { expect } from 'chai';
import { returnTabName } from '../statsHelper';

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
