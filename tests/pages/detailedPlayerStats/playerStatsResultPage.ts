import { Locator, Page } from '@playwright/test';

export class PlayerStatsResultPage {
    public readonly page: Page;

    public readonly resultRows: Locator;

    constructor(page: Page) {
        this.page = page;

        this.resultRows = page.locator('#player-results-table tbody');
    }
}
