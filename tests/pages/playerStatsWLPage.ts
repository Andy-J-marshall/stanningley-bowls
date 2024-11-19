import { Locator, Page } from '@playwright/test';

export class PlayerStatsWLPage {
    public readonly page: Page;

    private readonly allButton: Locator;
    private readonly singlesButton: Locator;
    private readonly pairsButton: Locator;

    public readonly gamesPlayed: Locator;
    public readonly wins: Locator;
    public readonly winPerc: Locator;
    public readonly losses: Locator;
    public readonly average: Locator;

    constructor(page: Page) {
        this.page = page;

        this.allButton = page.getByRole('group').getByText('All');
        this.singlesButton = page.getByRole('group').getByText('Singles');
        this.pairsButton = page.getByRole('group').getByText('Pairs');

        this.gamesPlayed = page.locator('#combinedGamesPlayed');
        this.wins = page.locator('#combinedWins');
        this.winPerc = page.locator('#combinedWinPerc');
        this.losses = page.locator('#combinedLosses');
        this.average = page.locator('#combinedAverage');
    }

    async clickAllButton() {
        await this.allButton.click();
    }

    async clickSinglesButton() {
        await this.singlesButton.click();
    }

    async clickPairsButton() {
        await this.pairsButton.click();
    }
}
