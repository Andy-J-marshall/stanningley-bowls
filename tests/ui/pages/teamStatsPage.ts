import { expect, Locator, Page } from '@playwright/test';

export class TeamStatsPage {
  readonly page: Page;
  readonly totalGamesValue: Locator;
  readonly totalWinsValue: Locator;
  readonly totalLossesValue: Locator;
  readonly totalDrawsValue: Locator;
  readonly totalHomeWinPercValue: Locator;
  readonly totalAwayWinPercValue: Locator;
  readonly totalCupWinPercValue: Locator;
  readonly totalAggValue: Locator;
  readonly totalOpponentAggValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalGamesValue = page.locator(
      '#combined-team-win-losses #totalGamesValue'
    );
    this.totalWinsValue = page.locator(
      '#combined-team-win-losses #totalWinsValue'
    );
    this.totalLossesValue = page.locator(
      '#combined-team-win-losses #totalLossesValue'
    );
    this.totalDrawsValue = page.locator(
      '#combined-team-win-losses #totalDrawsValue'
    );
    this.totalHomeWinPercValue = page.locator(
      '#combined-team-win-losses #totalHomeWinPercValue'
    );
    this.totalAwayWinPercValue = page.locator(
      '#combined-team-win-losses #totalAwayWinPercValue'
    );
    this.totalCupWinPercValue = page.locator(
      '#combined-team-win-losses #totalCupWinPercValue'
    );
    this.totalAggValue = page.locator(
      '#combined-team-win-losses #totalAggValue'
    );
    this.totalOpponentAggValue = page.locator(
      '#combined-team-win-losses #totalOpponentAggValue'
    );
  }

  async goto() {
    await this.page.goto('/#/stats/team');
  }

  teamStatsOverviewHasCorrectValues() {
    expect(this.totalGamesValue).toContainText('112');
    expect(this.totalWinsValue).toContainText('87');
    expect(this.totalLossesValue).toContainText('20');
    expect(this.totalDrawsValue).toContainText('5');
    expect(this.totalHomeWinPercValue).toContainText('93.88%');
    expect(this.totalAwayWinPercValue).toContainText('59.18%');
    expect(this.totalCupWinPercValue).toContainText('85.71%');
    expect(this.totalAggValue).toContainText('15238');
    expect(this.totalOpponentAggValue).toContainText('11461');
  }
}
