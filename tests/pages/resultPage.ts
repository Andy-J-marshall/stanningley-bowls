import { Locator, Page } from '@playwright/test';

export class ResultPage {
    public readonly page: Page;

    public readonly teamResultsSections: Locator;
    public readonly resultRows: Locator;

    constructor(page: Page) {
        this.page = page;

        this.resultRows = page.locator('#result tbody tr');
        this.teamResultsSections = page.locator('#result > .teamResult');
    }

    async goto() {
        await this.page.goto('/#/results');
    }
}
