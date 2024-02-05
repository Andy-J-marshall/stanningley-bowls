import { Locator, Page } from '@playwright/test';

export class TeamTabsPage {
  private readonly page: Page;
  private readonly mondayTeamStats: Locator;
  private readonly mondayTeamRecords: Locator;
  private readonly tuesVetsTeamStats: Locator;
  private readonly tuesVetsTeamRecords: Locator;
  private readonly wedPairsTeamStats: Locator;
  private readonly wedPairsTeamRecords: Locator;
  private readonly thurVetsTeamStats: Locator;
  private readonly thurVetsTeamRecords: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mondayTeamStats = page.locator(
      '#team-stats #team-stat-tab-monday'
    );
    this.mondayTeamRecords = page.locator(
      '#player-records #player-record-tab-monday'
    );
    this.tuesVetsTeamStats = page.locator(
      '#team-stats #team-stat-tab-tuesday-vets'
    );
    this.tuesVetsTeamRecords = page.locator(
      '#player-records #player-record-tab-tuesday-vets'
    );
    this.wedPairsTeamStats = page.locator(
      '#team-stats #team-stat-tab-wednesday-pairs'
    );
    this.wedPairsTeamRecords = page.locator(
      '#player-records #player-record-tab-wednesday-pairs'
    );
    this.thurVetsTeamStats = page.locator(
      '#team-stats #team-stat-tab-thursday-vets'
    );
    this.thurVetsTeamRecords = page.locator(
      '#player-records #player-record-tab-thursday-vets'
    );
  }

  async selectMondayTeamFromStatsTabs() {
    await this.mondayTeamStats.click();
  }

  async selectTuesVetsTeamFromStatsTabs() {
    await this.tuesVetsTeamStats.click();
  }

  async selectWedPairsTeamFromStatsTabs() {
    await this.wedPairsTeamStats.click();
  }

  async selectTuesVetsTeamFromRecordsTabs() {
    await this.tuesVetsTeamRecords.click();
  }

  async selectWedPairsTeamFromRecordsTabs() {
    await this.wedPairsTeamRecords.click();
  }

  async selectThurVetsTeamFromRecordsTabs() {
    await this.thurVetsTeamRecords.click();
  }
}
