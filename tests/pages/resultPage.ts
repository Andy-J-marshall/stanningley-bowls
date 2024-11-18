import { Locator, Page } from '@playwright/test';

export class ResultPage {
    public readonly page: Page;
    public readonly teamResultsSections: Locator;

    constructor(page: Page) {
        this.page = page;
        this.teamResultsSections = page.locator('#result > .teamResult');
    }

    async goto() {
        await this.page.goto('/#/results');
    }
}
