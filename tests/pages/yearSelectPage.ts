import { expect, Locator, Page } from '@playwright/test';

export class YearSelectPage {
    public readonly page: Page;

    private readonly yearSelectDropdown: Locator;
    private readonly AllYears: Locator;
    private readonly allYearsInDropdown: Locator;

    private readonly yearButtons: { [key: string]: Locator };

    constructor(page: Page) {
        this.page = page;
        this.yearSelectDropdown = page.locator('#year-select-dropdown-button');
        this.AllYears = page.getByRole('button', { name: 'All Years' });
        this.allYearsInDropdown = page.locator(
            '#full-stat-years-options > .dropdown-item'
        );

        this.yearButtons = {
            '2013': page.getByRole('button', { name: '2013' }),
            '2014': page.getByRole('button', { name: '2014' }),
            '2015': page.getByRole('button', { name: '2015' }),
            '2016': page.getByRole('button', { name: '2016' }),
            '2017': page.getByRole('button', { name: '2017' }),
            '2018': page.getByRole('button', { name: '2018' }),
            '2019': page.getByRole('button', { name: '2019' }),
            '2021': page.getByRole('button', { name: '2021' }),
            '2022': page.getByRole('button', { name: '2022' }),
            '2023': page.getByRole('button', { name: '2023' }),
            '2024': page.getByRole('button', { name: '2024' }),
        };
    }

    async selectAllYears() {
        await this.yearSelectDropdown.click();
        await this.AllYears.click();
    }

    async selectYear(year: number) {
        const yearButton = this.yearButtons[year];
        if (yearButton) {
            await this.yearSelectDropdown.click();
            await yearButton.click();
        } else {
            throw new Error(`Year ${year} button not found`);
        }
    }

    async checkYearDropdownHasAllYearOptions(expectedNumber: number) {
        await expect(this.yearSelectDropdown).toBeVisible();
        await this.yearSelectDropdown.click();
        await expect(this.allYearsInDropdown).toHaveCount(expectedNumber);
    }
}
