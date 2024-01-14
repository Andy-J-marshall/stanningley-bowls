import { expect, Locator, Page } from '@playwright/test';

export class TeamRecordsPage {
  readonly page: Page;
  readonly overallWinPercRecord: Locator;
  readonly overallWinPercRecordTeam: Locator;
  readonly bestAggRecord: Locator;
  readonly bestAggRecordTeam: Locator;
  readonly bestAggConcededRecord: Locator;
  readonly bestAggConcededRecordTeam: Locator;
  readonly bestWinMargin: Locator;
  readonly bestWinMarginTeam: Locator;

  constructor(page: Page) {
    this.page = page;
    this.overallWinPercRecord = page.locator(
      '#team-record #bestWinPerc'
    );
    this.overallWinPercRecordTeam = page.locator(
      '#team-record #bestWinPercPlayerOrTeam'
    );
    this.bestAggRecord = page.locator(
      '#team-record #bestAgg'
    );
    this.bestAggRecordTeam = page.locator(
      '#team-record #bestAggTeam'
    );
    this.bestAggConcededRecord = page.locator(
      '#team-record #bestAggConceded'
    );
    this.bestAggConcededRecordTeam = page.locator(
      '#team-record #bestAggConcededTeam'
    );
    this.bestWinMargin = page.locator(
      '#team-record #bestWinMargin'
    );
    this.bestWinMarginTeam = page.locator(
      '#team-record #bestWinMarginTeam'
    );
  }

  async goto() {
    await this.page.goto('/#/stats/records');
  }

  teamRecordsAreCorrectFor2023() {
    expect(this.overallWinPercRecord).toContainText('95.5%');
    expect(this.overallWinPercRecordTeam).toContainText('Tuesday Vets');
    expect(this.bestAggRecord).toContainText('20.25');
    expect(this.bestAggRecordTeam).toContainText('Wednesday Half Holiday');
    expect(this.bestAggConcededRecord).toContainText('12.04');
    expect(this.bestAggConcededRecordTeam).toContainText('Tuesday Vets');
    expect(this.bestWinMargin).toContainText('1360');
    expect(this.bestWinMarginTeam).toContainText('Tuesday Vets');
  }
}
