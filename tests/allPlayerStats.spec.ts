import { test } from '@playwright/test';
import allBowlsStats from '../src/data/allPlayerStats2023.json';
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
    'Clifford Brogie',
    'Jim Moorin',
    'Stewart Watson',
    'John Armitage',
    'Duncan McPhail',
    'Peter Crowther',
    'Andy Marshall',
];

for (const player of players) {
    test(`Summary of player's all team stats are correct for ${player} in 2023`, async () => {
        await yearSelectPage.select2023Year();
        await playerStatsPage.selectAllTeamStatsCheckbox();
        await playerStatsPage.searchForPlayer(player);
        await playerStatsPage.checkTeamAccordionHeadersNotExists();
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
        } = allBowlsStats.playerResults[player.toLowerCase()];
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

test('Can switch between team and all stats', async () => {
    const player = 'Clifford Brogie';

    await yearSelectPage.select2023Year();
    await playerStatsPage.selectAllTeamStatsCheckbox();
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkTeamAccordionHeadersNotExists();

    await playerStatsPage.clickBackToSummary();
    await playerStatsPage.deselectTeamStatsCheckbox();
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkTeamAccordionHeadersExist();
});

test('Summary of Jim Moorin stats for all teams is correct', async () => {
    playerStatsPage.setPlayerToFind('jim moorin');
    await playerStatsPage.selectAllTeamStatsCheckbox();

    await yearSelectPage.select2023Year();
    playerStatsPage.playerStatsAreCorrectInTable(111, 66, '59%', 2.23);

    await yearSelectPage.select2022Year();
    playerStatsPage.playerStatsAreCorrectInTable(114, 83, '73%', 5.57);
});

test('Summary of Richard Hodgson stats for all teams with filters are correct', async () => {
    playerStatsPage.setPlayerToFind('richard hodgson');
    await playerStatsPage.selectAllTeamStatsCheckbox();
    await yearSelectPage.select2023Year();

    // All venues
    playerStatsPage.playerStatsAreCorrectInTable(58, 33, '57%', 1.86);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(55, 32, '58%', 1.96);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(3, 1, '33%', 0.00);

    // Home only
    await playerStatsPage.selectHomeOnlyRadio();

    await playerStatsPage.selectAllGameTypesRadio();
    playerStatsPage.playerStatsAreCorrectInTable(31, 20, '65%', 3.90);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(31, 20, '65%', 3.90);

    // Away only
    await playerStatsPage.selectAwayOnlyRadio();

    await playerStatsPage.selectAllGameTypesRadio();
    playerStatsPage.playerStatsAreCorrectInTable(25, 11, '44%', -1.28);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(23, 11, '48%', -0.91);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(2, 0, '0%', -5.5);

    // Cup only
    await playerStatsPage.selectCupOnlyRadio();

    await playerStatsPage.selectAllGameTypesRadio();
    playerStatsPage.playerStatsAreCorrectInTable(2, 2, '100%', 9.50);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(1, 1, '100%', 8.00);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(1, 1, '100%', 11.00);
});

test('Summary of Neil Porter stats for singles and pairs games for all teams is correct', async () => {
    playerStatsPage.setPlayerToFind('neil porter');
    await playerStatsPage.selectAllTeamStatsCheckbox();
    await yearSelectPage.select2023Year();

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(31, 20, '65%', 4.74);

    await playerStatsPage.selectAllGameTypesRadio();
    playerStatsPage.playerStatsAreCorrectInTable(33, 22, '67%', 5.03);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(2, 2, '100%', 9.5);
});

test('Summary of Dave Hudson stats since 2013 for all teams is correct', async () => {
    playerStatsPage.setPlayerToFind('dave hudson');
    await playerStatsPage.selectAllTeamStatsCheckbox();

    await playerStatsPage.selectSince2013Checkbox();
    playerStatsPage.playerStatsAreCorrectInTable(463, 174, '38%', -2.48);
});

test('Detailed player stats for all teams and years for Dave Hudson', async () => {
    const player = 'Dave Hudson';

    await playerStatsPage.selectSince2013Checkbox();
    await playerStatsPage.selectAllTeamStatsCheckbox();
    await playerStatsPage.searchForPlayer(player);

    await playerStatsPage.checkPlayerIsReturned();
    await playerStatsPage.checkPlayerName(player);
    await playerStatsPage.checkTeamAccordionHeadersNotExists();

    const stats = {
        totalGamesPlayed: 463,
        totalWins: 174,
        totalLosses: 289,
        totalAverage: -2.48,
    };

    await playerStatsPage.validateSummaryStats(stats);
});

test('Summary of Bernie Miller stats since 2013 for all teams is correct', async () => {
    playerStatsPage.setPlayerToFind('bernie miller');
    await playerStatsPage.selectAllTeamStatsCheckbox();

    await playerStatsPage.selectSince2013Checkbox();
    playerStatsPage.playerStatsAreCorrectInTable(416, 242, '58%', 2.37);

    await playerStatsPage.selectSinglesOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(354, 211, '60%', 2.42);

    await playerStatsPage.selectPairsOnlyRadio();
    playerStatsPage.playerStatsAreCorrectInTable(62, 31, '50%', 2.08);
});

test('Total player count is not visible for all team stats', async () => {
    await playerStatsPage.selectAllTeamStatsCheckbox();
    await playerStatsPage.totalPlayerCountIsNotVisible();
});
