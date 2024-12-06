import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';

test.describe('Player stats - Other Clubs', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    // TODO create tests

    test('Detailed stats for John Armitage stats are correct', async ({
        playerSearchPage,
        playerStatOptionsPage,
        playerStatsOverviewPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');

        await playerSearchPage.searchForPlayer('john armitage');

        await playerStatsOverviewPage.validateOverviewStats(57, 43, 5.21);
        await expect(playerStatsOverviewPage.biggestWin).toHaveText('21 - 3');
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
        await playerStatOptionsPage.selectAllClubsFromDropdown();

        await yearSelectPage.select2023Year();
        await playerSummaryPage.validateSummaryStats(111, 66, 59, 2.23);

        await yearSelectPage.select2022Year();
        await playerSummaryPage.validateSummaryStats(114, 83, 73, 5.57);
    });

    test('Can filter for team specific stats in 2014', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('martin fulton');

        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');
        await yearSelectPage.select2014Year();
        await playerStatOptionsPage.selectTeamFromDropdown('Mirfield (B)');

        await expect(playerSummaryPage.playerRows).toHaveCount(3);
        await playerSummaryPage.validateSummaryStats(18, 11, 61, 1.83);
    });

    test('Can filter venue stats in 2014', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('martin fulton');

        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');
        await yearSelectPage.select2014Year();

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(31, 23, 74, 4.97);

        await playerStatOptionsPage.selectHomeOnlyRadio();
        await playerSummaryPage.validateSummaryStats(15, 13, 87, 7.47);

        await playerStatOptionsPage.selectAwayOnlyRadio();
        await playerSummaryPage.validateSummaryStats(16, 10, 63, 2.63);
    });

    test('Summary of Jack Roberts stats since 2013 are correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
    }) => {
        playerSummaryPage.setPlayerToFind('jack roberts');

        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');
        await playerStatOptionsPage.selectAllYearsSwitch();

        await playerSummaryPage.validateSummaryStats(110, 40, 36, -2.06);
    });

    test('Can switch between different club stats', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await expect(playerSummaryPage.playerRows).toHaveCount(32);

        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');
        await expect(playerSummaryPage.playerRows).toHaveCount(7);

        await playerStatOptionsPage.selectClubFromDropdown('Stanningley');
        await expect(playerSummaryPage.playerRows).toHaveCount(32);
    });

    test('Switching clubs does not reset the team dropdown', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2018Year();
        await playerStatOptionsPage.selectTeamFromDropdown(
            'Half Holiday Bradford'
        );
        await expect(playerSummaryPage.playerRows).toHaveCount(8);
        await playerStatOptionsPage.selectClubFromDropdown('Littlemoor');
        await expect(playerSummaryPage.playerRows).toHaveCount(2);

        await playerStatOptionsPage.selectTeamFromDropdown('Saturday Bradford');
        await expect(playerSummaryPage.playerRows).toHaveCount(2);
        await playerStatOptionsPage.selectClubFromDropdown('Stanningley');
        await expect(playerSummaryPage.playerRows).toHaveCount(15);
    });
});
