import { expect, Locator, Page } from '@playwright/test';

export class IndividualPlayerStatsPage {
    public readonly page: Page;
    public readonly playerStats: Locator;
    public readonly title: Locator;

    public readonly overviewAccordion: Locator;
    public readonly winLossAccordion: Locator;
    public readonly aggAccordion: Locator;
    public readonly teamAccordion: Locator;
    public readonly resultsAccordion: Locator;
    public readonly accordions: Locator;

    private readonly totalGamesPlayed: Locator;
    private readonly totalWins: Locator;
    private readonly totalWinPerc: Locator;
    private readonly totalLosses: Locator;
    private readonly totalAverage: Locator;

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

        this.totalGamesPlayed = page.locator('#totalGamesPlayed');
        this.totalWins = page.locator('#totalWins');
        this.totalWinPerc = page.locator('#totalWinPerc');
        this.totalLosses = page.locator('#totalLosses');
        this.totalAverage = page.locator('#totalAverage');
    }

    async validateOverviewStats(games: number, wins: number, avg: number) {
        const winPerc = ((wins / games) * 100).toFixed(0);
        const losses = games - wins;

        await expect(this.totalGamesPlayed).toHaveText(games.toString());
        await expect(this.totalWins).toHaveText(wins.toString());
        await expect(this.totalLosses).toHaveText(losses.toString());
        await expect(this.totalWinPerc).toHaveText(`${winPerc}%`);
        await expect(this.totalAverage).toHaveText(avg.toFixed(2).toString());
        // TODO also check biggest win
    }
}

// TODO improve locators for each page
