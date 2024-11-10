import { test } from '@playwright/test';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { PlayerStatsPage } from './pages/playerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';

let playerStatsPage: PlayerStatsPage;
let yearSelectPage: YearSelectPage;

test.beforeEach(async ({ page }) => {
    playerStatsPage = new PlayerStatsPage(page);
    yearSelectPage = new YearSelectPage(page);
    await playerStatsPage.goto();
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
        await playerStatsPage.searchForPlayer(player);
        await playerStatsPage.checkPlayerIsReturned();
        await playerStatsPage.checkPlayerName(player);
        await playerStatsPage.checkTeamAccordionHeadersExist();
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
        await playerStatsPage.validateSummaryStats(stats);
    });
}

test('Summary of Steve Gardner stats for team are correct', async () => {
    playerStatsPage.setPlayerToFind('steve gardner');

    await yearSelectPage.select2023Year();
    playerStatsPage.playerStatsAreCorrectInTable(57, 44, '77%', 7.81);

    await yearSelectPage.select2022Year();
    playerStatsPage.playerStatsAreCorrectInTable(43, 35, '81%', 7.86);
});

test('Summary of Andy Marshall stats for team with filters are correct', async () => {
    playerStatsPage.setPlayerToFind('andy marshall');

    await yearSelectPage.select2023Year();

    // All venues
    playerStatsPage.playerStatsAreCorrectInTable(51, 40, '78%', 5.49);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(36, 30, '83%', 5.81);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(15, 10, '67%', 4.73);

    // Home only
    await playerStatsPage.selectHomeOnlyRadio();

    await playerStatsPage.selectAllGameTypesRadio();
    playerStatsPage.playerStatsAreCorrectInTable(24, 21, '88%', 7.96);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(16, 14, '88%', 7.94);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(8, 7, '88%', 8.0);

    // Away only
    await playerStatsPage.selectAwayOnlyRadio();

    await playerStatsPage.selectAllGameTypesRadio();
    playerStatsPage.playerStatsAreCorrectInTable(20, 14, '70%', 4.0);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(13, 11, '85%', 5.62);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(7, 3, '43%', 1.0);

    // Cup only
    await playerStatsPage.selectCupOnlyRadio();

    await playerStatsPage.selectAllGameTypesRadio();
    playerStatsPage.playerStatsAreCorrectInTable(7, 5, '71%', 1.29);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(7, 5, '71%', 1.29);
});

test('Summary of Dave Hudson stats since 2013 for team are correct', async () => {
    playerStatsPage.setPlayerToFind('dave hudson');

    await playerStatsPage.selectSince2013Switch();
    playerStatsPage.playerStatsAreCorrectInTable(385, 147, '38%', -2.34);
});

test('Detailed player stats for all years for Dave Hudson', async () => {
    const player = 'Dave Hudson';

    await playerStatsPage.selectSince2013Switch();
    await playerStatsPage.searchForPlayer(player);

    await playerStatsPage.checkPlayerIsReturned();
    await playerStatsPage.checkPlayerName(player);
    await playerStatsPage.checkTeamAccordionHeadersExist();

    const stats = {
        totalGamesPlayed: 385,
        totalWins: 147,
        totalLosses: 238,
        totalAverage: -2.34,
    };

    await playerStatsPage.validateSummaryStats(stats);
});

test('Summary of Bernie Miller stats since 2013 for team are correct', async () => {
    playerStatsPage.setPlayerToFind('bernie miller');

    await playerStatsPage.selectSince2013Switch();
    playerStatsPage.playerStatsAreCorrectInTable(416, 242, '58%', 2.37);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(354, 211, '60%', 2.42);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(62, 31, '50%', 2.08);
});

test('Can filter for team specific stats in 2024', async () => {
    playerStatsPage.setPlayerToFind('alyssa randell');

    await yearSelectPage.select2024Year();

    await playerStatsPage.selectTeamFromDropdown('Saturday Leeds');
    playerStatsPage.playerStatsAreCorrectInTable(19, 11, '58%', 2.37);

});

test('Can filter for team specific stats in 2013', async () => {
    playerStatsPage.setPlayerToFind('chris gardner');

    await yearSelectPage.select2013Year();

    await playerStatsPage.selectTeamFromDropdown('Saturday Bradford');
    playerStatsPage.playerStatsAreCorrectInTable(20, 16, '80%', 6.00);

});

test('Can filter for team specific stats for all years', async () => {
    playerStatsPage.setPlayerToFind('adam sandilands');

    await playerStatsPage.selectSince2013Switch();

    await playerStatsPage.selectTeamFromDropdown('Monday Airewharfe (B)');
    playerStatsPage.playerStatsAreCorrectInTable(60, 20, '33%', -4.03);

});

test('Other options are disabled when selecting specific team', async () => {
    await yearSelectPage.select2023Year();
    await playerStatsPage.selectTeamFromDropdown('Saturday Leeds');

    await playerStatsPage.optionsAreDisabledWhenSelectingSpecificTeam();
});
