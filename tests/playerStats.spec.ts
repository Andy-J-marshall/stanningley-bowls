import { test } from '@playwright/test';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { IndividualPlayerStatsPage } from './pages/playerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage as StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSearchPage } from './pages/playerSearchPage';

let individualPlayerStatsPage: IndividualPlayerStatsPage;
let yearSelectPage: YearSelectPage;
let statOptionsPage: StatOptionsPage;
let playerSearchPage: PlayerSearchPage;

test.beforeEach(async ({ page }) => {
    // TODO create a fixture
    individualPlayerStatsPage = new IndividualPlayerStatsPage(page);
    yearSelectPage = new YearSelectPage(page);
    statOptionsPage = new StatOptionsPage(page);
    playerSearchPage = new PlayerSearchPage(page);
    await individualPlayerStatsPage.goto();
});

const players: Array<string> = [
    'Andy Marshall',
    'Andy Waller',
    'Paul Bowes',
    'Alyssa Randell',
    'Alison Woodfine',
    'Derek Wilson',
];
for (const player of players) {
    test(`Summary of player's team stats are correct for ${player} in 2023`, async () => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer(player);
        await individualPlayerStatsPage.checkPlayerIsReturned();
        await individualPlayerStatsPage.checkPlayerName(player);
        await individualPlayerStatsPage.checkTeamAccordionHeadersExist();
        const {
            totalAgg,
            totalAggAgainst,
            homeWins,
            awayWins,
            cupWins,
            homeLosses,
            awayLosses,
            cupLosses,
            totalGamesPlayed,
        } = bowlsStats.playerResults[player.toLowerCase()];
        const totalWins = cupWins + homeWins + awayWins;
        const totalLosses = cupLosses + homeLosses + awayLosses;
        const totalAverage = (totalAgg - totalAggAgainst) / totalGamesPlayed;
        const stats = {
            totalGamesPlayed,
            totalWins,
            totalLosses,
            totalAverage,
        };
        await individualPlayerStatsPage.validateSummaryStats(stats);
    });
}

test('Summary of Steve Gardner stats for team are correct', async () => {
    individualPlayerStatsPage.setPlayerToFind('steve gardner');

    await yearSelectPage.select2023Year();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(57, 44, '77%', 7.81);

    await yearSelectPage.select2022Year();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(43, 35, '81%', 7.86);
});

test('Summary of Andy Marshall stats for team with filters are correct', async () => {
    individualPlayerStatsPage.setPlayerToFind('andy marshall');

    await yearSelectPage.select2023Year();

    // All venues
    individualPlayerStatsPage.playerStatsAreCorrectInTable(51, 40, '78%', 5.49);

    await statOptionsPage.selectSinglesOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(36, 30, '83%', 5.81);

    await statOptionsPage.selectPairsOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(15, 10, '67%', 4.73);

    // Home only
    await statOptionsPage.selectHomeOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(24, 21, '88%', 7.96);

    await statOptionsPage.selectSinglesOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(16, 14, '88%', 7.94);

    await statOptionsPage.selectPairsOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(8, 7, '88%', 8.0);

    // Away only
    await statOptionsPage.selectAwayOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(20, 14, '70%', 4.0);

    await statOptionsPage.selectSinglesOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(13, 11, '85%', 5.62);

    await statOptionsPage.selectPairsOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(7, 3, '43%', 1.0);

    // Cup only
    await statOptionsPage.selectCupOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(7, 5, '71%', 1.29);

    await statOptionsPage.selectSinglesOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(7, 5, '71%', 1.29);
});

test('Summary of Dave Hudson stats since 2013 for team are correct', async () => {
    individualPlayerStatsPage.setPlayerToFind('dave hudson');

    await statOptionsPage.selectAllYearsSwitch();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(385, 147, '38%', -2.34);
});

test('Detailed player stats for all years for Dave Hudson', async () => {
    const player = 'Dave Hudson';

    await statOptionsPage.selectAllYearsSwitch();
    await playerSearchPage.searchForPlayer(player);

    await individualPlayerStatsPage.checkPlayerIsReturned();
    await individualPlayerStatsPage.checkPlayerName(player);
    await individualPlayerStatsPage.checkTeamAccordionHeadersExist();

    const stats = {
        totalGamesPlayed: 385,
        totalWins: 147,
        totalLosses: 238,
        totalAverage: -2.34,
    };

    await individualPlayerStatsPage.validateSummaryStats(stats);
});

test('Summary of Bernie Miller stats since 2013 for team are correct', async () => {
    individualPlayerStatsPage.setPlayerToFind('bernie miller');

    await statOptionsPage.selectAllYearsSwitch();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(416, 242, '58%', 2.37);

    await statOptionsPage.selectSinglesOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(354, 211, '60%', 2.42);

    await statOptionsPage.selectPairsOnlyRadio();
    individualPlayerStatsPage.playerStatsAreCorrectInTable(62, 31, '50%', 2.08);
});

test('Can filter for team specific stats in 2024', async () => {
    individualPlayerStatsPage.setPlayerToFind('alyssa randell');

    await yearSelectPage.select2024Year();

    await statOptionsPage.selectTeamFromDropdown('Saturday Leeds');
    individualPlayerStatsPage.playerStatsAreCorrectInTable(19, 11, '58%', 2.37);
});

test('Can filter for team specific stats in 2013', async () => {
    individualPlayerStatsPage.setPlayerToFind('chris gardner');

    await yearSelectPage.select2013Year();

    await statOptionsPage.selectTeamFromDropdown('Saturday Bradford');
    individualPlayerStatsPage.playerStatsAreCorrectInTable(20, 16, '80%', 6.0);
});

test('Can filter for team specific stats for all years', async () => {
    individualPlayerStatsPage.setPlayerToFind('adam sandilands');

    await statOptionsPage.selectAllYearsSwitch();

    await statOptionsPage.selectTeamFromDropdown('Monday Airewharfe (B)');
    individualPlayerStatsPage.playerStatsAreCorrectInTable(60, 20, '33%', -4.03);
});

test('Other options are disabled when selecting specific team', async () => {
    await yearSelectPage.select2023Year();
    await statOptionsPage.selectTeamFromDropdown('Saturday Leeds');

    await statOptionsPage.optionsAreDisabledWhenSelectingSpecificTeam();
});
