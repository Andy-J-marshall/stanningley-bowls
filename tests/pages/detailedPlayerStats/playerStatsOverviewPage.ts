import { expect, Locator, Page } from '@playwright/test';

export class PlayerStatsOverviewPage {
    public readonly page: Page;

    public readonly biggestWin: Locator;
    private readonly totalGamesPlayed: Locator;
    private readonly totalWins: Locator;
    private readonly totalWinPerc: Locator;
    private readonly totalLosses: Locator;
    private readonly totalAverage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.totalGamesPlayed = page.locator('#totalGamesPlayed');
        this.totalWins = page.locator('#totalWins');
        this.totalWinPerc = page.locator('#totalWinPerc');
        this.totalLosses = page.locator('#totalLosses');
        this.totalAverage = page.locator('#totalAverage');
        this.biggestWin = page.locator('#totalBiggestWin');
    }

    async validateOverviewStats(games: number, wins: number, avg: number) {
        const winPerc = ((wins / games) * 100).toFixed(0);
        const losses = games - wins;

        await expect(this.totalGamesPlayed).toHaveText(games.toString());
        await expect(this.totalWins).toHaveText(wins.toString());
        await expect(this.totalLosses).toHaveText(losses.toString());
        await expect(this.totalWinPerc).toHaveText(`${winPerc}%`);
        await expect(this.totalAverage).toHaveText(avg.toFixed(2).toString());
    }
}
