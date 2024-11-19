import { Locator, Page } from '@playwright/test';

export class PlayerSearchPage {
    public readonly page: Page;

    private readonly backButton: Locator;
    private readonly searchBar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByPlaceholder('Player Search...');
        this.backButton = page.getByRole('button', { name: 'BACK TO SUMMARY' });
    }

    async goto() {
        await this.page.goto('/#/stats/player');
    }

    async searchForPlayer(playerName: string) {
        await this.searchBar.fill(playerName);
        await this.page.getByRole('option', { name: playerName }).click();
    }

    async clickBackToSummary() {
        await this.backButton.click();
    }
}
