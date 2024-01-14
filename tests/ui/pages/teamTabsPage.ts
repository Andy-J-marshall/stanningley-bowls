import { Locator, Page } from '@playwright/test';

export class TeamTabsPage {
  readonly page: Page;
  readonly tuesVetsTeamStats: Locator;
  readonly thurVetsTeamStats: Locator;
  readonly wedPairsTeamStats: Locator;
  readonly tuesVetsTeamRecords: Locator;
  readonly thurVetsTeamRecords: Locator;
  readonly wedPairsTeamRecords: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tuesVetsTeamStats = page.locator(
      '#team-stats #team-stat-tab-tuesday-vets'
    );
    this.tuesVetsTeamRecords = page.locator(
      '#player-records #player-record-tab-tuesday-vets'
    );
    this.thurVetsTeamStats = page.locator(
      '#team-stats #team-stat-tab-thursday-vets'
    );
    this.thurVetsTeamRecords = page.locator(
      '#player-records #player-record-tab-thursday-vets'
    );
    this.wedPairsTeamStats = page.locator(
      '#team-stats #team-stat-tab-wednesday-pairs'
    );
    this.wedPairsTeamRecords = page.locator(
      '#player-records #player-record-tab-wednesday-pairs'
    );
  }

  async selectTuesVetsTeamFromStatsTabs() {
    await this.tuesVetsTeamStats.click();
  }

  async selectWedPairsTeamFromStatsTabs() {
    await this.wedPairsTeamStats.click();
  }

  async selectWedPairsTeamFromRecordsTabs() {
    await this.wedPairsTeamRecords.click();
  }

  async selectThurVetsTeamFromRecordsTabs() {
    await this.thurVetsTeamRecords.click();
  }
}
