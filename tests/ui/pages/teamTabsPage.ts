import { Locator, Page } from '@playwright/test';

export class TeamTabsPage {
  readonly page: Page;
  readonly tuesVetsTeamStats: Locator;
  readonly thurVetsTeamStats: Locator;
  readonly tuesVetsTeamRecords: Locator;
  readonly thurVetsTeamRecords: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tuesVetsTeamStats = page.locator('#team-stats #team-stat-tab-tuesday-vets');
    this.tuesVetsTeamRecords = page.locator('#player-records #player-record-tab-tuesday-vets');
    this.thurVetsTeamStats = page.locator('#team-stats #team-stat-tab-thursday-vets');
    this.thurVetsTeamRecords = page.locator('#player-records #player-record-tab-thursday-vets');
  }

  async selectTuesVetsTeamFromStatsTabs() {
    await this.tuesVetsTeamStats.click();
  }

  async selectThurVetsTeamFromRecordsTabs() {
    await this.thurVetsTeamRecords.click();
  }
}
