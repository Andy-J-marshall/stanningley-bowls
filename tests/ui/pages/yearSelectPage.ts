import { expect, Locator, Page } from '@playwright/test';

export class YearSelectPage {
  private readonly page: Page;
  private readonly yearSelectDropdown: Locator;
  private readonly year2022InYearDropdown: Locator;
  private readonly year2023InYearDropdown: Locator;
  private readonly allYearOptionsInDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yearSelectDropdown = page.locator('#year-select-dropdown-button');
    this.year2022InYearDropdown = page.locator('#option2022');
    this.year2023InYearDropdown = page.locator('#option2023');
    this.allYearOptionsInDropdown = page.locator(
      '.dropdown-menu > .dropdown-item'
    );
  }

  async checkYearDropdownHasAllYearOptions() {
    await expect(this.yearSelectDropdown).toBeVisible();
    await this.yearSelectDropdown.click();
    await expect(this.allYearOptionsInDropdown).toHaveCount(3);
  }

  async select2023Year() {
    await this.yearSelectDropdown.click();
    await this.year2023InYearDropdown.click();
  }

  async select2022Year() {
    await this.yearSelectDropdown.click();
    await this.year2022InYearDropdown.click();
  }
}
