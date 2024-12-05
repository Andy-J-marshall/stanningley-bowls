import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';

test.describe('Player summary stats - filters', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Summary of Andy Marshall stats for club with filters are correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('andy marshall');

        await yearSelectPage.select2023Year();

        // All venues
        await playerSummaryPage.validateSummaryStats(51, 40, 78, 5.49);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(36, 30, 83, 5.81);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(15, 10, 67, 4.73);

        // Home only
        await playerStatOptionsPage.selectHomeOnlyRadio();

        await playerStatOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.validateSummaryStats(24, 21, 88, 7.96);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(16, 14, 88, 7.94);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(8, 7, 88, 8.0);

        // Away only
        await playerStatOptionsPage.selectAwayOnlyRadio();

        await playerStatOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.validateSummaryStats(20, 14, 70, 4.0);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(13, 11, 85, 5.62);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(7, 3, 43, 1.0);

        // Cup only
        await playerStatOptionsPage.selectCupOnlyRadio();

        await playerStatOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.validateSummaryStats(7, 5, 71, 1.29);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(7, 5, 71, 1.29);
    });

    test('Summary of Richard Hodgson stats for all clubs with filters are correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('richard hodgson');

        await playerStatOptionsPage.selectAllClubsFromDropdown();
        await yearSelectPage.select2023Year();

        // All venues
        await playerSummaryPage.validateSummaryStats(58, 33, 57, 1.86);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(55, 32, 58, 1.96);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(3, 1, 33, 0.0);

        // Home only
        await playerStatOptionsPage.selectHomeOnlyRadio();

        await playerStatOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.validateSummaryStats(31, 20, 65, 3.9);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(31, 20, 65, 3.9);

        // Away only
        await playerStatOptionsPage.selectAwayOnlyRadio();

        await playerStatOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.validateSummaryStats(25, 11, 44, -1.28);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(23, 11, 48, -0.91);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(2, 0, 0, -5.5);

        // Cup only
        await playerStatOptionsPage.selectCupOnlyRadio();

        await playerStatOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.validateSummaryStats(2, 2, 100, 9.5);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(1, 1, 100, 8.0);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(1, 1, 100, 11.0);
    });

    test('Summary of Bernie Miller stats since 2013 for club are correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
    }) => {
        playerSummaryPage.setPlayerToFind('bernie miller');

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.validateSummaryStats(416, 242, 58, 2.37);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(354, 211, 60, 2.42);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(62, 31, 50, 2.08);
    });

    test('Summary of Neil Porter stats for singles and pairs games for all clubs are correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('neil porter');

        await playerStatOptionsPage.selectAllClubsFromDropdown();
        await yearSelectPage.select2023Year();

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(31, 20, 65, 4.74);

        await playerStatOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.validateSummaryStats(33, 22, 67, 5.03);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(2, 2, 100, 9.5);
    });

    test('Summary of Bernie Miller stats since 2013 for all clubs and all years is correct', async ({
        playerSummaryPage,
        playerStatOptionsPage,
    }) => {
        playerSummaryPage.setPlayerToFind('bernie miller');
        await playerStatOptionsPage.selectAllClubsFromDropdown();

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.validateSummaryStats(416, 242, 58, 2.37);

        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.validateSummaryStats(354, 211, 60, 2.42);

        await playerStatOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.validateSummaryStats(62, 31, 50, 2.08);
    });

    test('Can filter for team specific stats in 2022', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('kevin waller');

        await yearSelectPage.select2022Year();
        await playerStatOptionsPage.selectTeamFromDropdown('Saturday Leeds');

        await playerSummaryPage.validateSummaryStats(13, 10, 77, 6.46);
    });

    test('Can filter for team specific stats in 2013', async ({
        playerSummaryPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        playerSummaryPage.setPlayerToFind('chris gardner');

        await yearSelectPage.select2013Year();
        await playerStatOptionsPage.selectTeamFromDropdown('Saturday Bradford');

        await expect(playerSummaryPage.playerRows).toHaveCount(12);
        await playerSummaryPage.validateSummaryStats(20, 16, 80, 6.0);
    });

    test('Can filter for team specific stats for all years', async ({
        playerSummaryPage,
        playerStatOptionsPage,
    }) => {
        playerSummaryPage.setPlayerToFind('adam sandilands');

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerStatOptionsPage.selectTeamFromDropdown(
            'Monday Airewharfe (B)'
        );

        await playerSummaryPage.validateSummaryStats(60, 20, 33, -4.03);
    });

    test('Other options are disabled when selecting specific team', async ({
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await playerStatOptionsPage.selectTeamFromDropdown('Saturday Leeds');

        await expect(playerStatOptionsPage.clubSelectDropdown).toBeEnabled();
        await expect(playerStatOptionsPage.singlesOnlyRadio).toBeDisabled();
        await expect(playerStatOptionsPage.pairsOnlyRadio).toBeDisabled();
        await expect(playerStatOptionsPage.allGameTypesRadio).toBeDisabled();
        await expect(playerStatOptionsPage.homeOnlyRadio).toBeDisabled();
        await expect(playerStatOptionsPage.awayOnlyRadio).toBeDisabled();
        await expect(playerStatOptionsPage.cupOnlyRadio).toBeDisabled();
        await expect(playerStatOptionsPage.allVenuesRadio).toBeDisabled();
    });

    test('Clicking back to summary button remembers state of all stat toggles', async ({
        playerSummaryPage,
        playerSearchPage,
        playerStatOptionsPage,
    }) => {
        const name = 'Mabel Shaw';
        playerSummaryPage.setPlayerToFind(name);

        await playerStatOptionsPage.selectAllClubsFromDropdown();
        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerStatOptionsPage.selectSinglesOnlyRadio();
        await playerStatOptionsPage.selectAwayOnlyRadio();

        await playerSummaryPage.validateSummaryStats(270, 149, 55, 1.29);

        await playerSearchPage.searchForPlayer(name);
        await playerSearchPage.clickBackToSummary();

        await expect(playerStatOptionsPage.allYearSwitch).toBeChecked();
        await expect(playerStatOptionsPage.singlesOnlyRadio).toBeChecked();
        await expect(playerStatOptionsPage.awayOnlyRadio).toBeChecked();

        await playerSummaryPage.validateSummaryStats(270, 149, 55, 1.29);
    });
});
