import { Locator, Page } from '@playwright/test';

export class TeamTabsPage {
  readonly page: Page;
  readonly tuesVetsTeam: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tuesVetsTeam = page.locator('#team-stats #team-stat-tab-tuesday-vets');
  }

  async selectTuesVetsTeamFromTabs() {
    await this.tuesVetsTeam.click();
  }
}
