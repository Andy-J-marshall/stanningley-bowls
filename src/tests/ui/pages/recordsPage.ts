import { expect, Locator, Page } from '@playwright/test';
import config from '../../../config';

const teamName = config.teamNames.shortName;

export class RecordsPage {
    private readonly page: Page;
    private readonly overallWinRecord: Locator;
    private readonly overallWinsRecordPlayer: Locator;
    private readonly overallGamesRecord: Locator;
    private readonly overallGamesRecordPlayer: Locator;
    private readonly overallWinPercRecord: Locator;
    private readonly overallWinPercRecordPlayer: Locator;
    private readonly overallAverageRecord: Locator;
    private readonly overallAverageRecordPlayer: Locator;

    private readonly tuesVetsWinRecord: Locator;
    private readonly tuesVetsWinsRecordPlayer: Locator;
    private readonly tuesVetsWinPercRecord: Locator;
    private readonly tuesVetsWinPercRecordPlayer: Locator;
    private readonly tuesVetsAverageRecord: Locator;
    private readonly tuesVetsAverageRecordPlayer: Locator;

    private readonly thurVetsWinRecord: Locator;
    private readonly thurVetsWinsRecordPlayer: Locator;
    private readonly thurVetsWinPercRecord: Locator;
    private readonly thurVetsWinPercRecordPlayer: Locator;
    private readonly thurVetsAverageRecord: Locator;
    private readonly thurVetsAverageRecordPlayer: Locator;

    private readonly wedPairsNoGamesPlayedMessage: Locator;

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

    recordsOverviewHasCorrectValuesFor2023() {
        expect(this.overallGamesRecord).toBeVisible();
        expect(this.thurVetsWinRecord).toBeVisible({ visible: false });

        expect(this.overallGamesRecord).toContainText('92');
        expect(this.overallGamesRecordPlayer).toContainText(
            'Shirley Biancardo'
        );
        expect(this.overallWinRecord).toContainText('81');
        expect(this.overallWinsRecordPlayer).toContainText('Shirley Biancardo');
        expect(this.overallWinPercRecord).toContainText('89%');
        expect(this.overallWinPercRecordPlayer).toContainText('Peter Crowther');
        expect(this.overallAverageRecord).toContainText('9.11');
        expect(this.overallAverageRecordPlayer).toContainText(
            'Mario Biancardo'
        );
    }

    recordsHasCorrectValuesForThurVets2023() {
        expect(this.thurVetsWinRecord).toBeVisible();
        expect(this.overallGamesRecord).toBeVisible({ visible: false });

        expect(this.thurVetsWinRecord).toContainText('12');
        expect(this.thurVetsWinsRecordPlayer).toContainText('Mario Biancardo');
        expect(this.thurVetsWinPercRecord).toContainText('92%');
        expect(this.thurVetsWinPercRecordPlayer).toContainText(
            'Mario Biancardo'
        );
        expect(this.thurVetsAverageRecord).toContainText('10.85');
        expect(this.thurVetsAverageRecordPlayer).toContainText(
            'Mario Biancardo'
        );
    }

    recordsHasCorrectValuesForTuesVets2022() {
        expect(this.tuesVetsWinRecord).toBeVisible();
        expect(this.overallGamesRecord).toBeVisible({ visible: false });

        expect(this.tuesVetsWinRecord).toContainText('15');
        expect(this.tuesVetsWinsRecordPlayer).toContainText(
            'Jim Moorin, Shirley Biancardo, Stewart Watson'
        );
        expect(this.tuesVetsWinPercRecord).toContainText('100%');
        expect(this.tuesVetsWinPercRecordPlayer).toContainText('John Armitage');
        expect(this.tuesVetsAverageRecord).toContainText('12.36');
        expect(this.tuesVetsAverageRecordPlayer).toContainText('John Armitage');
    }

    recordsDoNotExistForWednesdayPairsIn2023() {
        expect(this.wedPairsNoGamesPlayedMessage).toContainText(
            `${teamName} did not play on this day for the selected year`
        );
    }
}
