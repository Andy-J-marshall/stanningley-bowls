import { Locator, Page } from '@playwright/test';

export class PlayerSearchPage {
    public readonly page: Page;

    private readonly backButton: Locator;
    private readonly searchBar: Locator;
    private readonly playerListInDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.locator(
            '#search-form input.rbt-input-main.form-control.rbt-input.form-control-lg'
        );
        this.playerListInDropdown = page.locator('#search');
        this.backButton = page.locator('#back-button');
    }

    async goto() {
        await this.page.goto('/#/stats/player');
    }

    async searchForPlayer(playerName: string) {
        await this.searchBar.fill(playerName);
        await this.playerListInDropdown.click();
    }

    async clickBackToSummary() {
        await this.backButton.click();
    }
}
