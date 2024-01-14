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
  readonly TuesVetsGamesValue: Locator;
  readonly TuesVetsWinsValue: Locator;
  readonly TuesVetsLossesValue: Locator;
  readonly TuesVetsDrawsValue: Locator;
  readonly TuesVetsHomeWinPercValue: Locator;
  readonly TuesVetsAwayWinPercValue: Locator;
  readonly TuesVetsCupWinPercValue: Locator;
  readonly TuesVetsAggValue: Locator;
  readonly TuesVetsOpponentAggValue: Locator;

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
    this.TuesVetsGamesValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalGamesValue'
    );
    this.TuesVetsWinsValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalWinsValue'
    );
    this.TuesVetsLossesValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalLossesValue'
    );
    this.TuesVetsDrawsValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalDrawsValue'
    );
    this.TuesVetsHomeWinPercValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalHomeWinPercValue'
    );
    this.TuesVetsAwayWinPercValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalAwayWinPercValue'
    );
    this.TuesVetsCupWinPercValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalCupWinPercValue'
    );
    this.TuesVetsAggValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalAggValue'
    );
    this.TuesVetsOpponentAggValue = page.locator(
      '#tuesdayvetsleeds-team-results #totalOpponentAggValue'
    );
  }

  async goto() {
    await this.page.goto('/#/stats/team');
  }

  teamStatsOverviewHasCorrectValuesFor2023() {
    expect(this.totalGamesValue).toBeVisible();
    expect(this.TuesVetsGamesValue).toBeVisible({ visible: false });

    expect(this.totalGamesValue).toContainText('112');
    expect(this.totalWinsValue).toContainText('87');
    expect(this.totalLossesValue).toContainText('20');
    expect(this.totalDrawsValue).toContainText('5');
    expect(this.totalHomeWinPercValue).toContainText('94%');
    expect(this.totalAwayWinPercValue).toContainText('59%');
    expect(this.totalCupWinPercValue).toContainText('86%');
    expect(this.totalAggValue).toContainText('15238');
    expect(this.totalOpponentAggValue).toContainText('11461');
  }

  teamStatsHasCorrectValuesForTuesVets() {
    expect(this.TuesVetsGamesValue).toBeVisible();
    expect(this.totalGamesValue).toBeVisible({ visible: false });

    expect(this.TuesVetsGamesValue).toContainText('22');
    expect(this.TuesVetsWinsValue).toContainText('21');
    expect(this.TuesVetsLossesValue).toContainText('1');
    expect(this.TuesVetsDrawsValue).toHaveCount(0);
    expect(this.TuesVetsHomeWinPercValue).toContainText('100%');
    expect(this.TuesVetsAwayWinPercValue).toContainText('89%');
    expect(this.TuesVetsCupWinPercValue).toContainText('100%');
    expect(this.TuesVetsAggValue).toContainText('3479');
    expect(this.TuesVetsOpponentAggValue).toContainText('2119');
  }
}
