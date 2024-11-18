import { Locator, Page } from '@playwright/test';

export class RecordsPage {
    public readonly page: Page;

    public readonly overallWinRecord: Locator;
    public readonly overallWinsRecordPlayer: Locator;
    public readonly overallGamesRecord: Locator;
    public readonly overallGamesRecordPlayer: Locator;
    public readonly overallWinPercRecord: Locator;
    public readonly overallWinPercRecordPlayer: Locator;
    public readonly overallAverageRecord: Locator;
    public readonly overallAverageRecordPlayer: Locator;

    public readonly tuesVetsWinRecord: Locator;
    public readonly tuesVetsWinsRecordPlayer: Locator;
    public readonly tuesVetsWinPercRecord: Locator;
    public readonly tuesVetsWinPercRecordPlayer: Locator;
    public readonly tuesVetsAverageRecord: Locator;
    public readonly tuesVetsAverageRecordPlayer: Locator;

    public readonly thurVetsWinRecord: Locator;
    public readonly thurVetsWinsRecordPlayer: Locator;
    public readonly thurVetsWinPercRecord: Locator;
    public readonly thurVetsWinPercRecordPlayer: Locator;
    public readonly thurVetsAverageRecord: Locator;
    public readonly thurVetsAverageRecordPlayer: Locator;

    public readonly wedPairsNoGamesPlayedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.overallGamesRecord = page.locator(
            '#team-select-tabs-tabpane-Combined #mostGames'
        );
        this.overallGamesRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-Combined #mostGamesPlayer'
        );
        this.overallWinRecord = page.locator(
            '#team-select-tabs-tabpane-Combined #mostWins'
        );
        this.overallWinsRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-Combined #mostWinsPlayer'
        );
        this.overallWinPercRecord = page.locator(
            '#team-select-tabs-tabpane-Combined #bestWinPerc'
        );
        this.overallWinPercRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-Combined #bestWinPercPlayer'
        );
        this.overallAverageRecord = page.locator(
            '#team-select-tabs-tabpane-Combined #bestAverage'
        );
        this.overallAverageRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-Combined #bestAveragePlayer'
        );

        this.tuesVetsWinRecord = page.locator(
            '#team-select-tabs-tabpane-tuevets #mostWins'
        );
        this.tuesVetsWinsRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-tuevets #mostWinsPlayer'
        );
        this.tuesVetsWinPercRecord = page.locator(
            '#team-select-tabs-tabpane-tuevets #bestWinPerc'
        );
        this.tuesVetsWinPercRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-tuevets #bestWinPercPlayer'
        );
        this.tuesVetsAverageRecord = page.locator(
            '#team-select-tabs-tabpane-tuevets #bestAverage'
        );
        this.tuesVetsAverageRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-tuevets #bestAveragePlayer'
        );

        this.thurVetsWinRecord = page.locator(
            '#team-select-tabs-tabpane-thuvets #mostWins'
        );
        this.thurVetsWinsRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-thuvets #mostWinsPlayer'
        );
        this.thurVetsWinPercRecord = page.locator(
            '#team-select-tabs-tabpane-thuvets #bestWinPerc'
        );
        this.thurVetsWinPercRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-thuvets #bestWinPercPlayer'
        );
        this.thurVetsAverageRecord = page.locator(
            '#team-select-tabs-tabpane-thuvets #bestAverage'
        );
        this.thurVetsAverageRecordPlayer = page.locator(
            '#team-select-tabs-tabpane-thuvets #bestAveragePlayer'
        );

        this.wedPairsNoGamesPlayedMessage = page.locator(
            '#team-select-tabs-tabpane-wedpairs p'
        );
    }

    async goto() {
        await this.page.goto('/#/stats/records');
    }
}
