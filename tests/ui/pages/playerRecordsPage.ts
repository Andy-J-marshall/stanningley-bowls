import { expect, Locator, Page } from '@playwright/test';

export class PlayerRecordsPage {
  readonly page: Page;
  readonly overallWinRecord: Locator;
  readonly overallWinsRecordPlayer: Locator;
  readonly overallGamesRecord: Locator;
  readonly overallGamesRecordPlayer: Locator;
  readonly overallWinPercRecord: Locator;
  readonly overallWinPercRecordPlayer: Locator;
  readonly overallAverageRecord: Locator;
  readonly overallAverageRecordPlayer: Locator;
  readonly overallOpponentAggValue: Locator;

  readonly ThurVetsWinRecord: Locator;
  readonly ThurVetsWinsRecordPlayer: Locator;
  readonly ThurVetsWinPercRecord: Locator;
  readonly ThurVetsWinPercRecordPlayer: Locator;
  readonly ThurVetsAverageRecord: Locator;
  readonly ThurVetsAverageRecordPlayer: Locator;
  readonly ThurVetsOpponentAggValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.overallGamesRecord = page.locator(
      '#player-record-tabpane-Combined #mostGames'
    );
    this.overallGamesRecordPlayer = page.locator(
      '#player-record-tabpane-Combined #mostGamesPlayer'
    );
    this.overallWinRecord = page.locator(
      '#player-record-tabpane-Combined #mostWins'
    );
    this.overallWinsRecordPlayer = page.locator(
      '#player-record-tabpane-Combined #mostWinsPlayer'
    );
    this.overallWinPercRecord = page.locator(
      '#player-record-tabpane-Combined #bestWinPerc'
    );
    this.overallWinPercRecordPlayer = page.locator(
      '#player-record-tabpane-Combined #bestWinPercPlayerOrTeam'
    );
    this.overallAverageRecord = page.locator(
      '#player-record-tabpane-Combined #bestAverage'
    );
    this.overallAverageRecordPlayer = page.locator(
      '#player-record-tabpane-Combined #bestAveragePlayer'
    );

    this.ThurVetsWinRecord = page.locator(
      '#player-record-tabpane-thursday-vets #mostWins'
    );
    this.ThurVetsWinsRecordPlayer = page.locator(
      '#player-record-tabpane-thursday-vets #mostWinsPlayer'
    );
    this.ThurVetsWinPercRecord = page.locator(
      '#player-record-tabpane-thursday-vets #bestWinPerc'
    );
    this.ThurVetsWinPercRecordPlayer = page.locator(
      '#player-record-tabpane-thursday-vets #bestWinPercPlayerOrTeam'
    );
    this.ThurVetsAverageRecord = page.locator(
      '#player-record-tabpane-thursday-vets #bestAverage'
    );
    this.ThurVetsAverageRecordPlayer = page.locator(
      '#player-record-tabpane-thursday-vets #bestAveragePlayer'
    );
  }

  async goto() {
    await this.page.goto('/#/stats/records');
  }

  playerRecordsOverviewHasCorrectValuesFor2023() {
    expect(this.overallGamesRecord).toBeVisible();
    expect(this.ThurVetsWinRecord).toBeVisible({ visible: false });

    expect(this.overallGamesRecord).toContainText('92');
    expect(this.overallGamesRecordPlayer).toContainText('Shirley Biancardo');
    expect(this.overallWinRecord).toContainText('81');
    expect(this.overallWinsRecordPlayer).toContainText('Shirley Biancardo');
    expect(this.overallWinPercRecord).toContainText('89%');
    expect(this.overallWinPercRecordPlayer).toContainText('Peter Crowther');
    expect(this.overallAverageRecord).toContainText('9.11');
    expect(this.overallAverageRecordPlayer).toContainText('Mario Biancardo');
  }

  playerRecordsHasCorrectValuesForThurVets() {
    expect(this.ThurVetsWinRecord).toBeVisible();
    expect(this.overallGamesRecord).toBeVisible({ visible: false });

    expect(this.ThurVetsWinRecord).toContainText('12');
    expect(this.ThurVetsWinsRecordPlayer).toContainText('Mario Biancardo');
    expect(this.ThurVetsWinPercRecord).toContainText('92%');
    expect(this.ThurVetsWinPercRecordPlayer).toContainText('Mario Biancardo');
    expect(this.ThurVetsAverageRecord).toContainText('10.85');
    expect(this.ThurVetsAverageRecordPlayer).toContainText('Mario Biancardo');
  }
}
