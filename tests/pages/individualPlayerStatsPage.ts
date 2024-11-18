import { expect, Locator, Page } from '@playwright/test';
import { PlayerStatsToCheck } from '../utils/interfaces';

export class IndividualPlayerStatsPage {
    public readonly page: Page;
    public readonly playerStatsItem: Locator;
    public readonly playerNameTitle: Locator;
    private readonly overviewAccordionButton: Locator;
    private readonly winLossAccordionButton: Locator;
    private readonly teamAccordionButton: Locator;
    private readonly aggAccordionButton: Locator;
    private readonly resultsAccordionButton: Locator;
    private readonly accordionButtons: Locator;
    private readonly totalGamesPlayed: Locator;
    private readonly totalWins: Locator;
    private readonly totalLosses: Locator;
    private readonly totalAverage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.playerStatsItem = page.locator('#detailed-player-stats');
        this.playerNameTitle = page.locator('#playerNameTitle');
        this.overviewAccordionButton = page.locator('#stats-overview');
        this.winLossAccordionButton = page.locator('#stats-wl');
        this.teamAccordionButton = page.locator('#stats-teams');
        this.aggAccordionButton = page.locator('#stats-aggregate');
        this.resultsAccordionButton = page.locator('#stats-results');
        this.accordionButtons = page.locator(
            '#detailed-player-stats .accordion-button'
        );
        this.totalGamesPlayed = page.locator('#totalGamesPlayed');
        this.totalWins = page.locator('#totalWins');
        this.totalLosses = page.locator('#totalLosses');
        this.totalAverage = page.locator('#totalAverage');
    }

    async checkTeamAccordionHeadersExist() {
        await expect(this.accordionButtons).toHaveCount(5);
        await this.checkAccordionHeaderExists();
        await expect(this.teamAccordionButton).toHaveText('TEAMS');
    }

    async checkTeamAccordionHeadersNotExists() {
        await expect(this.accordionButtons).toHaveCount(4);
        await this.checkAccordionHeaderExists();
    }

    private async checkAccordionHeaderExists() {
        await expect(this.overviewAccordionButton).toHaveText('OVERVIEW');
        await expect(this.winLossAccordionButton).toHaveText('WINS & LOSSES');
        await expect(this.aggAccordionButton).toHaveText('AGGREGATES');
        await expect(this.resultsAccordionButton).toHaveText('RESULTS');
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
