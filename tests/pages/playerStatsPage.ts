import { expect, Locator, Page } from '@playwright/test';

export class PlayerStatsPage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly searchBar: Locator;
  readonly playerListInDropdown: Locator;
  readonly playerStatsItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.locator(
      '#player-search-form input.rbt-input-main.form-control.rbt-input.form-control-lg'
    );
    this.playerListInDropdown = page.locator('#player-search');
    this.searchButton = page.locator('#player-search-form > button');
    this.playerStatsItem = page.locator('#stats .list-group-item');
  }

  async goto() {
    await this.page.goto('/#/stats/player');
  }

  async searchForPlayer(playerName: string) {
    await this.searchBar.type(playerName);
    await this.playerListInDropdown.click();
    await this.searchButton.click();
  }

  async checkNumberOfPlayersReturned(expectedNumberOfPlayers: number) {
    await expect(this.playerStatsItem).toHaveCount(expectedNumberOfPlayers);
  }
}
 