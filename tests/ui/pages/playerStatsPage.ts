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
  readonly winLossAccordionButton: Locator;
  readonly teamAccordionButton: Locator;
  readonly aggAccordionButton: Locator;
  readonly resultsAccordionButton: Locator;
  readonly accordionButtons: Locator;
  readonly totalGamesPlayed: Locator;
  readonly totalWins: Locator;
  readonly totalLosses: Locator;
  readonly totalAverage: Locator;
  readonly teamCheckBox: Locator;
  readonly allYearCheckBox: Locator;
  readonly singlesOnlyCheckBox: Locator;
  readonly sgGames: Locator;
  readonly sgWins: Locator;
  readonly sgWinPerc: Locator;
  readonly sgAvg: Locator;
  readonly jmGames: Locator;
  readonly jmWins: Locator;
  readonly jmWinPerc: Locator;
  readonly jmAvg: Locator;
  readonly amGames: Locator;
  readonly amWins: Locator;
  readonly amWinPerc: Locator;
  readonly amAvg: Locator;
  readonly dhGames: Locator;
  readonly dhWins: Locator;
  readonly dhWinPerc: Locator;
  readonly dhAvg: Locator;

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
    this.overviewAccordionButton = page.locator('#stats-overview');
    this.winLossAccordionButton = page.locator('#stats-wl');
    this.teamAccordionButton = page.locator('#stats-teams');
    this.aggAccordionButton = page.locator('#stats-aggregate');
    this.resultsAccordionButton = page.locator('#stats-results');
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
    this.singlesOnlyCheckBox = page.locator(
      ".form-check input[id='#only-singles-checkbox']"
    );
    this.allYearCheckBox = page.locator(
      ".form-check input[id='#all-years-select-checkbox']"
    );
    this.sgGames = page.locator('#steve-gardner-games');
    this.sgWins = page.locator('#steve-gardner-wins');
    this.sgWinPerc = page.locator('#steve-gardner-win-perc');
    this.sgAvg = page.locator('#steve-gardner-avg');
    this.jmGames = page.locator('#jim-moorin-games');
    this.jmWins = page.locator('#jim-moorin-wins');
    this.jmWinPerc = page.locator('#jim-moorin-win-perc');
    this.jmAvg = page.locator('#jim-moorin-avg');
    this.amGames = page.locator('#andy-marshall-games');
    this.amWins = page.locator('#andy-marshall-wins');
    this.amWinPerc = page.locator('#andy-marshall-win-perc');
    this.amAvg = page.locator('#andy-marshall-avg');
    this.dhGames = page.locator('#dave-hudson-games');
    this.dhWins = page.locator('#dave-hudson-wins');
    this.dhWinPerc = page.locator('#dave-hudson-win-perc');
    this.dhAvg = page.locator('#dave-hudson-avg');
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

  async clickBackToSummary() {
    await this.backButton.click();
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

  async checkTeamAccordionHeadersExist() {
    await expect(this.accordionButtons).toHaveCount(5);
    await expect(this.overviewAccordionButton).toHaveText('OVERVIEW');
    await expect(this.winLossAccordionButton).toHaveText('WINS & LOSSES');
    await expect(this.teamAccordionButton).toHaveText('TEAMS');
    await expect(this.aggAccordionButton).toHaveText('AGGREGATES');
    await expect(this.resultsAccordionButton).toHaveText('RESULTS');
  }

  async checkOnlyBasicAccordionHeadersExist() {
    await expect(this.accordionButtons).toHaveCount(4);
    await expect(this.overviewAccordionButton).toHaveText('OVERVIEW');
    await expect(this.winLossAccordionButton).toHaveText('WINS & LOSSES');
    await expect(this.aggAccordionButton).toHaveText('AGGREGATES');
    await expect(this.resultsAccordionButton).toHaveText('RESULTS');
  }

  async selectTeamStatsCheckbox() {
    await this.teamCheckBox.check();
  }

  async deselectTeamStatsCheckbox() {
    await this.teamCheckBox.uncheck();
  }

  async selectSinglesOnlyCheckbox() {
    await this.singlesOnlyCheckBox.check();
  }

  async deselectSinglesOnlyCheckbox() {
    await this.singlesOnlyCheckBox.uncheck();
  }

  async selectSince2022Checkbox() {
    await this.allYearCheckBox.check();
  }

  async deselectSince2022Checkbox() {
    await this.allYearCheckBox.uncheck();
  }

  async validateSummaryStats(playerStats: PlayerStats) {
    await expect(this.totalGamesPlayed).toHaveText(
      `Games played: ${playerStats.totalGamesPlayed}`
    );
    await expect(this.totalWins).toHaveText(`Wins: ${playerStats.totalWins}`);
    await expect(this.totalLosses).toHaveText(
      `Losses: ${playerStats.totalLosses}`
    );
    await expect(this.totalAverage).toHaveText(
      `Average: ${playerStats.totalAverage.toFixed(2)}`
    );
    expect(playerStats.totalAverage).toBeGreaterThan(-22);
    expect(playerStats.totalAverage).toBeLessThan(22);
  }

  playerStatsAreCorrectForSG(
    games: string,
    wins: string,
    winPerc: string,
    avg: string
  ) {
    expect(this.sgGames).toContainText(games);
    expect(this.sgWins).toContainText(wins);
    expect(this.sgWinPerc).toContainText(winPerc);
    expect(this.sgAvg).toContainText(avg);
  }

  playerStatsAreCorrectForJM(
    games: string,
    wins: string,
    winPerc: string,
    avg: string
  ) {
    expect(this.jmGames).toContainText(games);
    expect(this.jmWins).toContainText(wins);
    expect(this.jmWinPerc).toContainText(winPerc);
    expect(this.jmAvg).toContainText(avg);
  }

  playerStatsAreCorrectForAM(
    games: string,
    wins: string,
    winPerc: string,
    avg: string
  ) {
    expect(this.amGames).toContainText(games);
    expect(this.amWins).toContainText(wins);
    expect(this.amWinPerc).toContainText(winPerc);
    expect(this.amAvg).toContainText(avg);
  }

  playerStatsAreCorrectForDH(
    games: string,
    wins: string,
    winPerc: string,
    avg: string
  ) {
    expect(this.dhGames).toContainText(games);
    expect(this.dhWins).toContainText(wins);
    expect(this.dhWinPerc).toContainText(winPerc);
    expect(this.dhAvg).toContainText(avg);
  }
}
