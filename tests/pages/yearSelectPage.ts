import { expect, Locator, Page } from '@playwright/test';

export class YearSelectPage {
    public readonly page: Page;

    private readonly yearSelectDropdown: Locator;
    private readonly year2013: Locator;
    private readonly year2022: Locator;
    private readonly year2023: Locator;
    private readonly allYears: Locator;

    constructor(page: Page) {
        this.page = page;
        this.yearSelectDropdown = page.locator('#year-select-dropdown-button');
        this.year2013 = page.getByRole('button', { name: '2013' });
        this.year2022 = page.getByRole('button', { name: '2022' });
        this.year2023 = page.getByRole('button', { name: '2023' });
        this.allYears = page.locator('.dropdown-menu .dropdown-item');
    }

    async select2023Year() {
        await this.yearSelectDropdown.click();
        await this.year2023.click();
    }

    async select2022Year() {
        await this.yearSelectDropdown.click();
        await this.year2022.click();
    }

    async select2013Year() {
        await this.yearSelectDropdown.click();
        await this.year2013.click();
    }

    async checkYearDropdownHasAllYearOptions(expectedNumber: number) {
        await expect(this.yearSelectDropdown).toBeVisible();
        await this.yearSelectDropdown.click();
        await expect(this.allYears).toHaveCount(expectedNumber);
    }
}
