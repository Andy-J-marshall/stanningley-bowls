import { expect, Locator, Page } from '@playwright/test';

interface PlayerStats {
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  totalAverage: number;
}

export class PlayerStatsPage {
  private readonly page: Page;
  private readonly searchButton: Locator;
  private readonly backButton: Locator;
  private readonly searchBar: Locator;
  private readonly playerListInDropdown: Locator;
  private readonly playerStatsItem: Locator;
  private readonly playerStatsRows: Locator;
  private readonly playerNameTitle: Locator;
  private readonly overviewAccordionButton: Locator;
  private readonly winLossAccordionButton: Locator;
  private readonly teamAccordionButton: Locator;
  private readonly aggAccordionButton: Locator;
  private readonly resultsAccordionButton: Locator;
  private readonly accordionButtons: Locator;
  private readonly totalGamesPlayed: Locator;
  private readonly totalWins: Locator;
  private readonly totalLosses: Locator;
  private readonly totalAverage: Locator;
  private readonly teamCheckBox: Locator;
  private readonly allYearCheckBox: Locator;
  private readonly singlesOnlyCheckBox: Locator;
  private readonly sgGames: Locator;
  private readonly sgWins: Locator;
  private readonly sgWinPerc: Locator;
  private readonly sgAvg: Locator;
  private readonly jmGames: Locator;
  private readonly jmWins: Locator;
  private readonly jmWinPerc: Locator;
  private readonly jmAvg: Locator;
  private readonly amGames: Locator;
  private readonly amWins: Locator;
  private readonly amWinPerc: Locator;
  private readonly amAvg: Locator;
  private readonly bmGames: Locator;
  private readonly bmWins: Locator;
  private readonly bmWinPerc: Locator;
  private readonly bmAvg: Locator;
  private readonly dhGames: Locator;
  private readonly dhWins: Locator;
  private readonly dhWinPerc: Locator;
  private readonly dhAvg: Locator;

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
    this.bmGames = page.locator('#bernie-miller-games');
    this.bmWins = page.locator('#bernie-miller-wins');
    this.bmWinPerc = page.locator('#bernie-miller-win-perc');
    this.bmAvg = page.locator('#bernie-miller-avg');
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

  async selectAllTeamStatsCheckbox() {
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

  playerStatsAreCorrectForBM(
    games: string,
    wins: string,
    winPerc: string,
    avg: string
  ) {
    expect(this.bmGames).toContainText(games);
    expect(this.bmWins).toContainText(wins);
    expect(this.bmWinPerc).toContainText(winPerc);
    expect(this.bmAvg).toContainText(avg);
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
