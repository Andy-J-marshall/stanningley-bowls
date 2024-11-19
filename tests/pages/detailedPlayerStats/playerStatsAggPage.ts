import { Locator, Page } from '@playwright/test';

export class PlayerStatsAggPage {
    public readonly page: Page;

    public readonly aggFor: Locator;
    public readonly aggAgainst: Locator;
    public readonly homeAggFor: Locator;
    public readonly homeAggAgainst: Locator;
    public readonly awayAggFor: Locator;
    public readonly awayAggAgainst: Locator;
    public readonly cupAggFor: Locator;
    public readonly cupAggAgainst: Locator;

    constructor(page: Page) {
        this.page = page;

        this.aggFor = page.locator('#combinedAggFor');
        this.aggAgainst = page.locator('#combinedAggAgainst');
        this.homeAggFor = page.locator('#homeAggFor');
        this.homeAggAgainst = page.locator('#homeAggAgainst');
        this.awayAggFor = page.locator('#awayAggFor');
        this.awayAggAgainst = page.locator('#awayAggAgainst');
        this.cupAggFor = page.locator('#cupAggFor');
        this.cupAggAgainst = page.locator('#cupAggAgainst');
    }
}
