import { expect, Locator, Page } from '@playwright/test';

export class YearSelectPage {
    public readonly page: Page;

    private readonly yearSelectDropdown: Locator;
    private readonly year2013InYearDropdown: Locator;
    private readonly year2022InYearDropdown: Locator;
    private readonly year2023InYearDropdown: Locator;
    private readonly year2024InYearDropdown: Locator;
    private readonly allYearOptionsInDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.yearSelectDropdown = page.locator('#year-select-dropdown-button');
        this.year2013InYearDropdown = page.locator('#option2013');
        this.year2022InYearDropdown = page.locator('#option2022');
        this.year2023InYearDropdown = page.locator('#option2023');
        this.year2024InYearDropdown = page.locator('#option2024');
        this.allYearOptionsInDropdown = page.locator(
            '.dropdown-menu .dropdown-item'
        );
    }

    async select2024Year() {
        await this.yearSelectDropdown.click();
        await this.year2024InYearDropdown.click();
    }

    async select2023Year() {
        await this.yearSelectDropdown.click();
        await this.year2023InYearDropdown.click();
    }

    async select2022Year() {
        await this.yearSelectDropdown.click();
        await this.year2022InYearDropdown.click();
    }

    async select2013Year() {
        await this.yearSelectDropdown.click();
        await this.year2013InYearDropdown.click();
    }

    async checkYearDropdownHasAllYearOptions(expectedNumber: number) {
        await expect(this.yearSelectDropdown).toBeVisible();
        await this.yearSelectDropdown.click();
        await expect(this.allYearOptionsInDropdown).toHaveCount(expectedNumber);
    }
}
