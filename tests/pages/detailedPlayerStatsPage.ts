import { expect, Locator, Page } from '@playwright/test';

export class DetailedPlayerStatsPage {
    public readonly page: Page;
    public readonly playerStats: Locator;
    public readonly title: Locator;

    public readonly overviewAccordion: Locator;
    public readonly winLossAccordion: Locator;
    public readonly aggAccordion: Locator;
    public readonly teamAccordion: Locator;
    public readonly resultsAccordion: Locator;
    public readonly accordions: Locator;

    constructor(page: Page) {
        this.page = page;

        this.playerStats = page.locator('#detailed-player-stats');
        this.title = page.locator('#playerNameTitle');

        this.overviewAccordion = page.getByRole('heading', {
            name: 'OVERVIEW',
        });
        this.winLossAccordion = page.getByRole('heading', {
            name: 'WINS & LOSSES',
        });
        this.aggAccordion = page.getByRole('heading', { name: 'AGGREGATES' });
        this.teamAccordion = page.getByRole('heading', { name: 'TEAMS' });
        this.resultsAccordion = page.getByRole('heading', { name: 'RESULTS' });
        this.accordions = page.locator(
            '#detailed-player-stats .accordion-button'
        );
    }

    async clickWinsAndLossesAccordion() {
        await this.winLossAccordion.click();
    }

    async clickAggAccordion() {
        await this.aggAccordion.click();
    }

    async clickTeamAccordion() {
        await this.teamAccordion.click();
    }

    async clickResultsAccordion() {
        await this.resultsAccordion.click();
    }
}
