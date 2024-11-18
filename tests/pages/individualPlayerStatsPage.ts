import { expect, Locator, Page } from '@playwright/test';
import { PlayerStatsToCheck } from '../utils/interfaces';

export class IndividualPlayerStatsPage {
    public readonly page: Page;
    public readonly playerStats: Locator;
    public readonly title: Locator;
    public readonly overviewAccordion: Locator;
    public readonly winLossAccordion: Locator;
    public readonly teamAccordion: Locator;
    public readonly aggAccordion: Locator;
    public readonly resultsAccordion: Locator;
    public readonly accordions: Locator;
    private readonly totalGamesPlayed: Locator;
    private readonly totalWins: Locator;
    private readonly totalLosses: Locator;
    private readonly totalAverage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.playerStats = page.locator('#detailed-player-stats');
        this.title = page.locator('#playerNameTitle');
        this.overviewAccordion = page.locator('#stats-overview');
        this.winLossAccordion = page.locator('#stats-wl');
        this.teamAccordion = page.locator('#stats-teams');
        this.aggAccordion = page.locator('#stats-aggregate');
        this.resultsAccordion = page.locator('#stats-results');
        this.accordions = page.locator(
            '#detailed-player-stats .accordion-button'
        );
        this.totalGamesPlayed = page.locator('#totalGamesPlayed');
        this.totalWins = page.locator('#totalWins');
        this.totalLosses = page.locator('#totalLosses');
        this.totalAverage = page.locator('#totalAverage');
    }

    async validateOverviewStats(playerStats: PlayerStatsToCheck) {
        await expect(this.totalGamesPlayed).toHaveText(
            `${playerStats.totalGamesPlayed}`
        );
        await expect(this.totalWins).toHaveText(`${playerStats.totalWins}`);
        await expect(this.totalLosses).toHaveText(`${playerStats.totalLosses}`);
        await expect(this.totalAverage).toHaveText(
            `${playerStats.totalAverage.toFixed(2)}`
        );
        expect(playerStats.totalAverage).toBeGreaterThan(-22);
        expect(playerStats.totalAverage).toBeLessThan(22);
    }
}
