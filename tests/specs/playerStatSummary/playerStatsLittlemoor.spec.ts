import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';
import littlemoorStats from '../../../src/data/littlemoorStats2023.json';
import { findTotalNumberOfPlayersForYears } from '../../utils/statsHelper';

const playerCount = findTotalNumberOfPlayersForYears(littlemoorStats);

test.describe('Player stats - Littlemoor', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Summary of John Armitage stats are correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('john armitage');

        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');
        
        await yearSelectPage.select2023Year();
        await playerSummaryPage.validateSummaryStats(57, 43, 75, 5.21);

        await yearSelectPage.select2022Year();
        await playerSummaryPage.validateSummaryStats(58, 40, 69, 3.76);
    });

    test('Summary of Jim Moorin stats for all clubs is correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('jim moorin');
        
        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');
        await playerStatOptionsPage.selectAllClubsStatsSwitch();
        
        await yearSelectPage.select2023Year();
        await playerSummaryPage.validateSummaryStats(111, 66, 59, 2.23);

        await yearSelectPage.select2022Year();
        await playerSummaryPage.validateSummaryStats(114, 83, 73, 5.57);
    });

    // TODO not possible yet. Maybe try Pudsey stats? Or Jack Roberts?
    // test('Summary of Dave Hudson stats since 2013 are correct', async ({
    //     playerSummaryPage,
    //     playerStatOptionsPage,
    // }) => {
    //     playerSummaryPage.setPlayerToFind('dave hudson');

    //     await playerStatOptionsPage.selectAllYearsSwitch();
    //     await playerSummaryPage.validateSummaryStats(385, 147, 38, -2.34);
    // });

    // test('Summary of Dave Hudson stats since 2013 for all clubs is correct', async ({
    //     playerSummaryPage,
    //     playerStatOptionsPage,
    // }) => {
    //     playerSummaryPage.setPlayerToFind('dave hudson');
    //     await playerStatOptionsPage.selectAllClubsStatsSwitch();

    //     await playerStatOptionsPage.selectAllYearsSwitch();
    //     await playerSummaryPage.validateSummaryStats(463, 174, 38, -2.48);
    // });

    test('All players appear by default', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');
        await yearSelectPage.select2023Year();
        await expect(playerSummaryPage.playerRows).toHaveCount(playerCount);
    });
});
