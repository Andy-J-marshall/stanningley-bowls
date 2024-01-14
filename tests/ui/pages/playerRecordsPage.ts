import { expect, Locator, Page } from '@playwright/test';
import config from '../../../src/config';

const teamName = config.teamNames.short

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

  readonly thurVetsWinRecord: Locator;
  readonly thurVetsWinsRecordPlayer: Locator;
  readonly thurVetsWinPercRecord: Locator;
  readonly thurVetsWinPercRecordPlayer: Locator;
  readonly thurVetsAverageRecord: Locator;
  readonly thurVetsAverageRecordPlayer: Locator;
  readonly thurVetsOpponentAggValue: Locator;

  readonly wedPairsNoGamesPlayedMessage: Locator;

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

    this.thurVetsWinRecord = page.locator(
      '#player-record-tabpane-thursday-vets #mostWins'
    );
    this.thurVetsWinsRecordPlayer = page.locator(
      '#player-record-tabpane-thursday-vets #mostWinsPlayer'
    );
    this.thurVetsWinPercRecord = page.locator(
      '#player-record-tabpane-thursday-vets #bestWinPerc'
    );
    this.thurVetsWinPercRecordPlayer = page.locator(
      '#player-record-tabpane-thursday-vets #bestWinPercPlayerOrTeam'
    );
    this.thurVetsAverageRecord = page.locator(
      '#player-record-tabpane-thursday-vets #bestAverage'
    );
    this.thurVetsAverageRecordPlayer = page.locator(
      '#player-record-tabpane-thursday-vets #bestAveragePlayer'
    );
    
    this.wedPairsNoGamesPlayedMessage = page.locator(
      '#player-record-tabpane-wednesday-pairs p'
    );
  }

  async goto() {
    await this.page.goto('/#/stats/records');
  }

  playerRecordsOverviewHasCorrectValuesFor2023() {
    expect(this.overallGamesRecord).toBeVisible();
    expect(this.thurVetsWinRecord).toBeVisible({ visible: false });

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
    expect(this.thurVetsWinRecord).toBeVisible();
    expect(this.overallGamesRecord).toBeVisible({ visible: false });

    expect(this.thurVetsWinRecord).toContainText('12');
    expect(this.thurVetsWinsRecordPlayer).toContainText('Mario Biancardo');
    expect(this.thurVetsWinPercRecord).toContainText('92%');
    expect(this.thurVetsWinPercRecordPlayer).toContainText('Mario Biancardo');
    expect(this.thurVetsAverageRecord).toContainText('10.85');
    expect(this.thurVetsAverageRecordPlayer).toContainText('Mario Biancardo');
  }

  playerRecordsDoNotExistForWednesdayPairsIn2023() {
    expect(this.wedPairsNoGamesPlayedMessage).toContainText(`${teamName} did not play in this league for the selected year`)
  }
}
