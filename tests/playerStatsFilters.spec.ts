import { expect, test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage as StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSummaryPage as PlayerSummaryPage } from './pages/playerSummaryPage';
import { PlayerSearchPage } from './pages/playerSearchPage';

let playerSummaryPage: PlayerSummaryPage;
let yearSelectPage: YearSelectPage;
let statOptionsPage: StatOptionsPage;
let playerSearchPage: PlayerSearchPage;

test.describe('Player summary stats - filters', () => {
    test.beforeEach(async ({ page }) => {
        playerSummaryPage = new PlayerSummaryPage(page);
        yearSelectPage = new YearSelectPage(page);
        statOptionsPage = new StatOptionsPage(page);
        playerSearchPage = new PlayerSearchPage(page);
        await playerSummaryPage.goto();
    });

    test('Summary of Andy Marshall stats for club with filters are correct', async () => {
        playerSummaryPage.setPlayerToFind('andy marshall');

        await yearSelectPage.select2023Year();

        // All venues
        await playerSummaryPage.summaryStatsAreCorrect(51, 40, '78%', 5.49);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(36, 30, '83%', 5.81);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(15, 10, '67%', 4.73);

        // Home only
        await statOptionsPage.selectHomeOnlyRadio();

        await statOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.summaryStatsAreCorrect(24, 21, '88%', 7.96);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(16, 14, '88%', 7.94);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(8, 7, '88%', 8.0);

        // Away only
        await statOptionsPage.selectAwayOnlyRadio();

        await statOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.summaryStatsAreCorrect(20, 14, '70%', 4.0);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(13, 11, '85%', 5.62);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(7, 3, '43%', 1.0);

        // Cup only
        await statOptionsPage.selectCupOnlyRadio();

        await statOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.summaryStatsAreCorrect(7, 5, '71%', 1.29);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(7, 5, '71%', 1.29);
    });

    test('Summary of Richard Hodgson stats for all clubs with filters are correct', async () => {
        playerSummaryPage.setPlayerToFind('richard hodgson');
        await statOptionsPage.selectAllClubStatsSwitch();
        await yearSelectPage.select2023Year();

        // All venues
        await playerSummaryPage.summaryStatsAreCorrect(58, 33, '57%', 1.86);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(55, 32, '58%', 1.96);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(3, 1, '33%', 0.0);

        // Home only
        await statOptionsPage.selectHomeOnlyRadio();

        await statOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.summaryStatsAreCorrect(31, 20, '65%', 3.9);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(31, 20, '65%', 3.9);

        // Away only
        await statOptionsPage.selectAwayOnlyRadio();

        await statOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.summaryStatsAreCorrect(25, 11, '44%', -1.28);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(23, 11, '48%', -0.91);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(2, 0, '0%', -5.5);

        // Cup only
        await statOptionsPage.selectCupOnlyRadio();

        await statOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.summaryStatsAreCorrect(2, 2, '100%', 9.5);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(1, 1, '100%', 8.0);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(1, 1, '100%', 11.0);
    });

    test('Summary of Bernie Miller stats since 2013 for club are correct', async () => {
        playerSummaryPage.setPlayerToFind('bernie miller');

        await statOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.summaryStatsAreCorrect(416, 242, '58%', 2.37);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(354, 211, '60%', 2.42);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(62, 31, '50%', 2.08);
    });

    test('Summary of Neil Porter stats for singles and pairs games for all clubs are correct', async () => {
        playerSummaryPage.setPlayerToFind('neil porter');
        await statOptionsPage.selectAllClubStatsSwitch();
        await yearSelectPage.select2023Year();

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(31, 20, '65%', 4.74);

        await statOptionsPage.selectAllGameTypesRadio();
        await playerSummaryPage.summaryStatsAreCorrect(33, 22, '67%', 5.03);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(2, 2, '100%', 9.5);
    });

    test('Summary of Bernie Miller stats since 2013 for all clubs and all years is correct', async () => {
        playerSummaryPage.setPlayerToFind('bernie miller');
        await statOptionsPage.selectAllClubStatsSwitch();

        await statOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.summaryStatsAreCorrect(416, 242, '58%', 2.37);

        await statOptionsPage.selectSinglesOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(354, 211, '60%', 2.42);

        await statOptionsPage.selectPairsOnlyRadio();
        await playerSummaryPage.summaryStatsAreCorrect(62, 31, '50%', 2.08);
    });

    test('Can filter for team specific stats in 2024', async () => {
        playerSummaryPage.setPlayerToFind('alyssa randell');

        await yearSelectPage.select2024Year();

        await statOptionsPage.selectTeamFromDropdown('Saturday Leeds');
        await playerSummaryPage.summaryStatsAreCorrect(19, 11, '58%', 2.37);
    });

    test('Can filter for team specific stats in 2013', async () => {
        playerSummaryPage.setPlayerToFind('chris gardner');

        await yearSelectPage.select2013Year();

        await statOptionsPage.selectTeamFromDropdown('Saturday Bradford');
        await playerSummaryPage.summaryStatsAreCorrect(20, 16, '80%', 6.0);
    });

    test('Can filter for team specific stats for all years', async () => {
        playerSummaryPage.setPlayerToFind('adam sandilands');

        await statOptionsPage.selectAllYearsSwitch();

        await statOptionsPage.selectTeamFromDropdown('Monday Airewharfe (B)');
        await playerSummaryPage.summaryStatsAreCorrect(60, 20, '33%', -4.03);
    });

    test('Other options are disabled when selecting specific team', async () => {
        await yearSelectPage.select2023Year();
        await statOptionsPage.selectTeamFromDropdown('Saturday Leeds');

        await statOptionsPage.optionsAreDisabledWhenSelectingSpecificTeam();
    });

    test('Clicking back to summary button remembers state of all stat toggles', async () => {
        const name = 'Mabel Shaw';
        playerSummaryPage.setPlayerToFind(name);

        await statOptionsPage.selectAllClubStatsSwitch();
        await statOptionsPage.selectAllYearsSwitch();
        await statOptionsPage.selectSinglesOnlyRadio();
        await statOptionsPage.selectAwayOnlyRadio();

        await playerSummaryPage.summaryStatsAreCorrect(270, 149, '55%', 1.29);

        await playerSearchPage.searchForPlayer(name);
        await playerSearchPage.clickBackToSummary();

        await expect(statOptionsPage.allYearSwitch).toBeChecked();
        await expect(statOptionsPage.singlesOnlyRadio).toBeChecked();
        await expect(statOptionsPage.awayOnlyRadio).toBeChecked();
        await expect(statOptionsPage.clubSwitch).toBeChecked();

        await playerSummaryPage.summaryStatsAreCorrect(270, 149, '55%', 1.29);
    });

    test('Team select dropdown is disabled when include all club switch is enabled', async () => {
        await yearSelectPage.select2023Year();
        await statOptionsPage.selectAllClubStatsSwitch();

        await statOptionsPage.teamSelectDropDownIsDisabled();
    });
});
