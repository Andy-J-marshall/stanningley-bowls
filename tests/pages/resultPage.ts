import { Locator, Page } from '@playwright/test';

export class ResultPage {
    public readonly page: Page;

    public readonly teamResultsSections: Locator;
    public readonly resultRows: Locator;
    public readonly firstResultHomeTeam: Locator;
    public readonly firstResultHomeScore: Locator;
    public readonly firstResultAwayTeam: Locator;
    public readonly firstResultAwayScore: Locator;

    constructor(page: Page) {
        this.page = page;

        this.resultRows = page.locator('#result tbody tr');
        this.teamResultsSections = page.locator('#result > .teamResult');
        this.firstResultHomeTeam = page
            .locator('#result tbody tr td:nth-child(1)')
            .first();
        this.firstResultAwayTeam = page
            .locator('#result tbody tr td:nth-child(4)')
            .first();
        this.firstResultHomeScore = page
            .locator('#result tbody tr td:nth-child(2)')
            .first();
        this.firstResultAwayScore = page
            .locator('#result tbody tr td:nth-child(3)')
            .first();
    }

    async goto() {
        await this.page.goto('/#/results');
    }
}
