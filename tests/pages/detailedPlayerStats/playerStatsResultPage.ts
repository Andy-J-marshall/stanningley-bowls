import { Locator, Page } from '@playwright/test';

export class PlayerStatsResultPage {
    public readonly page: Page;

    public readonly resultRows: Locator;
    public readonly firstResultName: Locator;
    public readonly firstResultScore: Locator;
    public readonly firstResultOpponent: Locator;
    public readonly firstResultOpponentScore: Locator;

    constructor(page: Page) {
        this.page = page;

        this.resultRows = page.locator('#player-results-table tbody');
        this.firstResultName = page
            .locator('#player-results-table tbody tr td:nth-child(1)')
            .first();
        this.firstResultOpponent = page
            .locator('#player-results-table tbody tr td:nth-child(4)')
            .first();
        this.firstResultScore = page
            .locator('#player-results-table tbody tr td:nth-child(2)')
            .first();
        this.firstResultOpponentScore = page
            .locator('#player-results-table tbody tr td:nth-child(3)')
            .first();
    }
}
