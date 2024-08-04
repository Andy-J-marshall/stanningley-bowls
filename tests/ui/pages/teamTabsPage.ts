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
    this.mondayTeamStats = page.locator(`text=MON`);
    this.mondayTeamRecords = page.locator(`text=MON`);
    this.tuesVetsTeamStats = page.locator(`text=TUE (VETS)`);
    this.tuesVetsTeamRecords = page.locator(`text=TUE (VETS)`);
    this.wedPairsTeamStats = page.locator(`text=WED (PAIRS)`);
    this.wedPairsTeamRecords = page.locator(`text=WED (PAIRS)`);
    this.thurVetsTeamStats = page.locator(`text=THU (VETS)`);
    this.thurVetsTeamRecords = page.locator(`text=THU (VETS)`);
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
