import { expect } from '@playwright/test';
import { test } from '../utils/fixture';

test.describe('Records', () => {
    test.beforeEach(async ({ recordsPage }) => {
        await recordsPage.goto();
    });

    test('Records overview has correct records for 2023', async ({
        recordsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();

        expect(recordsPage.overallGamesRecord).toBeVisible();
        expect(recordsPage.thurVetsWinRecord).toBeVisible({ visible: false });

        expect(recordsPage.overallGamesRecord).toContainText('92');
        expect(recordsPage.overallGamesRecordPlayer).toContainText(
            'Shirley Biancardo'
        );
        expect(recordsPage.overallWinRecord).toContainText('81');
        expect(recordsPage.overallWinsRecordPlayer).toContainText(
            'Shirley Biancardo'
        );
        expect(recordsPage.overallWinPercRecord).toContainText('89%');
        expect(recordsPage.overallWinPercRecordPlayer).toContainText(
            'Peter Crowther'
        );
        expect(recordsPage.overallAverageRecord).toContainText('9.11');
        expect(recordsPage.overallAverageRecordPlayer).toContainText(
            'Mario Biancardo'
        );
    });

    test('Records has correct records for Thursday Vets in 2023', async ({
        recordsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await teamTabsPage.selectThurVetsTeamTab();

        expect(recordsPage.thurVetsWinRecord).toBeVisible();
        expect(recordsPage.overallGamesRecord).toBeVisible({ visible: false });

        expect(recordsPage.thurVetsWinRecord).toContainText('12');
        expect(recordsPage.thurVetsWinsRecordPlayer).toContainText(
            'Mario Biancardo'
        );
        expect(recordsPage.thurVetsWinPercRecord).toContainText('92%');
        expect(recordsPage.thurVetsWinPercRecordPlayer).toContainText(
            'Mario Biancardo'
        );
        expect(recordsPage.thurVetsAverageRecord).toContainText('10.85');
        expect(recordsPage.thurVetsAverageRecordPlayer).toContainText(
            'Mario Biancardo'
        );
    });

    test('Records has correct records for Tuesday Vets in 2022', async ({
        recordsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2022Year();
        await teamTabsPage.selectTuesVetsTeamTab();

        expect(recordsPage.tuesVetsWinRecord).toBeVisible();
        expect(recordsPage.overallGamesRecord).toBeVisible({ visible: false });

        expect(recordsPage.tuesVetsWinRecord).toContainText('15');
        expect(recordsPage.tuesVetsWinsRecordPlayer).toContainText(
            'Jim Moorin, Shirley Biancardo, Stewart Watson'
        );
        expect(recordsPage.tuesVetsWinPercRecord).toContainText('100%');
        expect(recordsPage.tuesVetsWinPercRecordPlayer).toContainText(
            'John Armitage'
        );
        expect(recordsPage.tuesVetsAverageRecord).toContainText('12.36');
        expect(recordsPage.tuesVetsAverageRecordPlayer).toContainText(
            'John Armitage'
        );
    });

    test('Records not show for Wednesday Pairs in 2023 as team did not exist', async ({
        recordsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await teamTabsPage.selectWedPairsTeamTab();

        await expect(recordsPage.noGamesMessage).toBeVisible();
    });

    test('Team records show B team if there is one', async ({
        recordsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await teamTabsPage.selectMondayTeamTab();

        await yearSelectPage.select2013Year();
        await expect(recordsPage.mondayTeamRecords).toHaveCount(2);

        await yearSelectPage.select2021Year();
        await expect(recordsPage.mondayTeamRecords).toHaveCount(1);
    });

    test(`Records year dropdown appears if there are multiple years of records available`, async ({
        yearSelectPage,
    }) => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(12);
    });
});
