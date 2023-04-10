import { expect, Locator, Page } from '@playwright/test';

interface PlayerStats {
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  totalAverage: number;
}

export class PlayerStatsPage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly backButton: Locator;
  readonly searchBar: Locator;
  readonly playerListInDropdown: Locator;
  readonly playerStatsItem: Locator;
  readonly playerStatsRows: Locator;
  readonly playerNameTitle: Locator;
  readonly overviewAccordionButton: Locator;
  readonly gamesAccordionButton: Locator;
  readonly winLossAccordionButton: Locator;
  readonly averageAccordionButton: Locator;
  readonly pointsAccordionButton: Locator;
  readonly aggAccordionButton: Locator;
  readonly resultsAccordionButton: Locator;
  readonly opponentsAccordionButton: Locator;
  readonly accordionButtons: Locator;
  readonly totalGamesPlayed: Locator;
  readonly totalWins: Locator;
  readonly totalLosses: Locator;
  readonly totalAverage: Locator;
  readonly teamCheckBox: Locator;
  readonly yearSelectDropdown: Locator;
  readonly yearOptionInDropdownUsedByTests: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.locator(
      '#player-search-form input.rbt-input-main.form-control.rbt-input.form-control-lg'
    );
    this.playerListInDropdown = page.locator('#player-search');
    this.searchButton = page.locator('#search-button');
    this.backButton = page.locator('#back-button');
    this.playerStatsItem = page.locator('#stats .list-group-item');
    this.playerStatsRows = page.locator('#player-stats-per-team tbody');
    this.playerNameTitle = page.locator('#playerNameTitle');
    this.overviewAccordionButton = page.locator('#stats-summary');
    this.gamesAccordionButton = page.locator('#stats-games');
    this.winLossAccordionButton = page.locator('#stats-wl');
    this.averageAccordionButton = page.locator('#stats-average');
    this.pointsAccordionButton = page.locator('#stats-points');
    this.aggAccordionButton = page.locator('#stats-aggregate');
    this.resultsAccordionButton = page.locator('#stats-results');
    this.opponentsAccordionButton = page.locator('#stats-opponents');
    this.accordionButtons = page.locator(
      '#detailed-player-stats .accordion-button'
    );
    this.totalGamesPlayed = page.locator('#totalGamesPlayed');
    this.totalWins = page.locator('#totalWins');
    this.totalLosses = page.locator('#totalLosses');
    this.totalAverage = page.locator('#totalAverage');
    this.teamCheckBox = page.locator(
      ".form-check input[id='#all-stats-select-checkbox']"
    );
    this.yearSelectDropdown = page.locator('#year-select-dropdown-button');
    this.yearOptionInDropdownUsedByTests = page.locator('#option2022');
  }

  async goto() {
    await this.page.goto('/#/stats/player');
  }

  async searchForPlayer(playerName: string) {
    await this.searchBar.fill(playerName);
    await this.playerListInDropdown.click();
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async checkNumberOfPlayersReturned(expectedNumberOfPlayers: number) {
    await expect(this.playerStatsRows).toHaveCount(expectedNumberOfPlayers);
  }

  async checkPlayerIsReturned() {
    await expect(this.playerStatsItem).toHaveCount(1);
  }

  async checkPlayerName(expectedPlayer: string) {
    await expect(this.playerNameTitle).toHaveText(expectedPlayer);
  }

  async checkYearDropdownExists() {
    await expect(this.yearSelectDropdown).toBeVisible();
  }

  async checkTeamAccordionHeadersExist() {
    await expect(this.accordionButtons).toHaveCount(8);
    await expect(this.overviewAccordionButton).toHaveText('OVERVIEW');
    await expect(this.gamesAccordionButton).toHaveText('GAMES PLAYED');
    await expect(this.winLossAccordionButton).toHaveText('WINS & LOSSES');
    await expect(this.averageAccordionButton).toHaveText('AVERAGES');
    await expect(this.pointsAccordionButton).toHaveText('POINTS');
    await expect(this.aggAccordionButton).toHaveText('AGGREGATES');
    await expect(this.resultsAccordionButton).toHaveText('RESULTS');
    await expect(this.opponentsAccordionButton).toHaveText('OPPONENTS');
  }

  async checkOnlyBasicAccordionHeadersExist() {
    await expect(this.accordionButtons).toHaveCount(7);
    await expect(this.overviewAccordionButton).toHaveText('OVERVIEW');
    await expect(this.resultsAccordionButton).toHaveText('RESULTS');
  }

  async selectTeamStatsCheckbox() {
    await this.teamCheckBox.check();
  }

  async deselectTeamStatsCheckbox() {
    await this.teamCheckBox.uncheck();
  }

  async select2022Year() {
    await this.yearSelectDropdown.click();
    await this.yearOptionInDropdownUsedByTests.click();
  }

  async validateSummaryStats(playerStats: PlayerStats) {
    await expect(this.totalGamesPlayed).toHaveText(
      `Games played = ${playerStats.totalGamesPlayed}`
    );
    await expect(this.totalWins).toHaveText(`Wins = ${playerStats.totalWins}`);
    await expect(this.totalLosses).toHaveText(
      `Losses = ${playerStats.totalLosses}`
    );
    await expect(this.totalAverage).toHaveText(
      `Average = ${playerStats.totalAverage.toFixed(2)}`
    );
    expect(playerStats.totalAverage).toBeGreaterThan(-22);
    expect(playerStats.totalAverage).toBeLessThan(22);
  }
}
