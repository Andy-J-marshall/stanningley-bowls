import { expect } from '@playwright/test';
import { test } from './utils/fixture';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { findTotalNumberOfPlayersForYears } from './utils/statsHelper';

const playerCount = findTotalNumberOfPlayersForYears(bowlsStats);

test.describe('Player summary stats', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Summary of Steve Gardner stats are correct', async ({
        playerSummaryPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('steve gardner');

        await yearSelectPage.select2023Year();
        await playerSummaryPage.summaryStatsAreCorrect(57, 44, '77%', 7.81);

        await yearSelectPage.select2022Year();
        await playerSummaryPage.summaryStatsAreCorrect(43, 35, '81%', 7.86);
    });

    test('Summary of Jim Moorin stats for all clubs is correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('jim moorin');
        await playerStatOptionsPage.selectAllClubStatsSwitch();

        await yearSelectPage.select2023Year();
        await playerSummaryPage.summaryStatsAreCorrect(111, 66, '59%', 2.23);

        await yearSelectPage.select2022Year();
        await playerSummaryPage.summaryStatsAreCorrect(114, 83, '73%', 5.57);
    });

    test('Summary of Dave Hudson stats since 2013 are correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
    }) => {
        playerSummaryPage.setPlayerToFind('dave hudson');

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.summaryStatsAreCorrect(385, 147, '38%', -2.34);
    });

    test('Summary of Dave Hudson stats since 2013 for all clubs is correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
    }) => {
        playerSummaryPage.setPlayerToFind('dave hudson');
        await playerStatOptionsPage.selectAllClubStatsSwitch();

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.summaryStatsAreCorrect(463, 174, '38%', -2.48);
    });

    test('All players appear by default', async ({
        playerSummaryPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await expect(playerSummaryPage.playerRows).toHaveCount(playerCount);
    });

    test('Stats year dropdown appears if there are multiple years of stats available', async ({
        yearSelectPage,
    }) => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });
});
