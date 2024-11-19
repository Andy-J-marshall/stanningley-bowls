import { Locator, Page } from '@playwright/test';

export class PlayerStatsWLPage {
    public readonly page: Page;

    public readonly gamesPlayed: Locator;
    public readonly wins: Locator;
    public readonly winPerc: Locator;
    public readonly losses: Locator;
    public readonly average: Locator;

    constructor(page: Page) {
        this.page = page;

        this.gamesPlayed = page.locator('#combinedGamesPlayed');
        this.wins = page.locator('#combinedWins');
        this.winPerc = page.locator('#combinedWinPerc');
        this.losses = page.locator('#combinedLosses');
        this.average = page.locator('#combinedAverage');
    }
}
