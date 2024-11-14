import { test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage as StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSummaryPage as PlayerSummaryPage } from './pages/playerSummaryPage';

let playerSummaryPage: PlayerSummaryPage;
let yearSelectPage: YearSelectPage;
let statOptionsPage: StatOptionsPage;

// TODO create a describe block for each test file

test.beforeEach(async ({ page }) => {
    // TODO create a fixture
    playerSummaryPage = new PlayerSummaryPage(page);
    yearSelectPage = new YearSelectPage(page);
    statOptionsPage = new StatOptionsPage(page);
    await playerSummaryPage.goto();
});

test('Summary of Steve Gardner stats for team are correct', async () => {
    playerSummaryPage.setPlayerToFind('steve gardner');

    await yearSelectPage.select2023Year();
    await playerSummaryPage.playerStatsAreCorrectInTable(57, 44, '77%', 7.81);

    await yearSelectPage.select2022Year();
    await playerSummaryPage.playerStatsAreCorrectInTable(43, 35, '81%', 7.86);
});

test('Summary of Andy Marshall stats for team with filters are correct', async () => {
    playerSummaryPage.setPlayerToFind('andy marshall');

    await yearSelectPage.select2023Year();

    // All venues
    await playerSummaryPage.playerStatsAreCorrectInTable(51, 40, '78%', 5.49);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(36, 30, '83%', 5.81);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(15, 10, '67%', 4.73);

    // Home only
    await statOptionsPage.selectHomeOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(24, 21, '88%', 7.96);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(16, 14, '88%', 7.94);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(8, 7, '88%', 8.0);

    // Away only
    await statOptionsPage.selectAwayOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(20, 14, '70%', 4.0);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(13, 11, '85%', 5.62);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(7, 3, '43%', 1.0);

    // Cup only
    await statOptionsPage.selectCupOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(7, 5, '71%', 1.29);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(7, 5, '71%', 1.29);
});

test('Summary of Dave Hudson stats since 2013 for team are correct', async () => {
    playerSummaryPage.setPlayerToFind('dave hudson');

    await statOptionsPage.selectAllYearsSwitch();
    await playerSummaryPage.playerStatsAreCorrectInTable(
        385,
        147,
        '38%',
        -2.34
    );
});

test('Summary of Bernie Miller stats since 2013 for team are correct', async () => {
    playerSummaryPage.setPlayerToFind('bernie miller');

    await statOptionsPage.selectAllYearsSwitch();
    await playerSummaryPage.playerStatsAreCorrectInTable(416, 242, '58%', 2.37);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(354, 211, '60%', 2.42);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(62, 31, '50%', 2.08);
});

test('Can filter for team specific stats in 2024', async () => {
    playerSummaryPage.setPlayerToFind('alyssa randell');

    await yearSelectPage.select2024Year();

    await statOptionsPage.selectTeamFromDropdown('Saturday Leeds');
    await playerSummaryPage.playerStatsAreCorrectInTable(19, 11, '58%', 2.37);
});

test('Can filter for team specific stats in 2013', async () => {
    playerSummaryPage.setPlayerToFind('chris gardner');

    await yearSelectPage.select2013Year();

    await statOptionsPage.selectTeamFromDropdown('Saturday Bradford');
    await playerSummaryPage.playerStatsAreCorrectInTable(20, 16, '80%', 6.0);
});

test('Can filter for team specific stats for all years', async () => {
    playerSummaryPage.setPlayerToFind('adam sandilands');

    await statOptionsPage.selectAllYearsSwitch();

    await statOptionsPage.selectTeamFromDropdown('Monday Airewharfe (B)');
    await playerSummaryPage.playerStatsAreCorrectInTable(60, 20, '33%', -4.03);
});

test('Other options are disabled when selecting specific team', async () => {
    await yearSelectPage.select2023Year();
    await statOptionsPage.selectTeamFromDropdown('Saturday Leeds');

    await statOptionsPage.optionsAreDisabledWhenSelectingSpecificTeam();
});
