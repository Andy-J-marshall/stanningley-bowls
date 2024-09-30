import { expect, Locator, Page } from '@playwright/test';

export class ResultPage {
    private readonly page: Page;
    private readonly teamResultsSections: Locator;

    constructor(page: Page) {
        this.page = page;
        this.teamResultsSections = page.locator('#result > .teamResult');
    }

    async goto() {
        await this.page.goto('/#/results');
    }

    resultsForAll2023TeamsAppear() {
        expect(this.teamResultsSections).toHaveCount(6);
    }
}
