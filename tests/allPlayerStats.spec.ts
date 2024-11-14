import { test } from '@playwright/test';
import allBowlsStats from '../src/data/allPlayerStats2023.json';
import { IndividualPlayerStatsPage } from './pages/individualPlayerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSearchPage } from './pages/playerSearchPage';
import { PlayerSummaryPage } from './pages/playerSummaryPage';

let individualPlayerStatsPage: IndividualPlayerStatsPage;
let playerSummaryPage: PlayerSummaryPage;
let yearSelectPage: YearSelectPage;
let statOptionsPage: StatOptionsPage;
let playerSearchPage: PlayerSearchPage;

test.beforeEach(async ({ page }) => {
    individualPlayerStatsPage = new IndividualPlayerStatsPage(page);
    playerSummaryPage = new PlayerSummaryPage(page);
    yearSelectPage = new YearSelectPage(page);
    statOptionsPage = new StatOptionsPage(page);
    playerSearchPage = new PlayerSearchPage(page);
    await playerSummaryPage.goto();
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
        await statOptionsPage.selectAllClubStatsSwitch();
        await playerSearchPage.searchForPlayer(player);
        await individualPlayerStatsPage.checkTeamAccordionHeadersNotExists();
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
        await individualPlayerStatsPage.validateOverviewStats(stats);
    });
}

test('Summary of Jim Moorin stats for all teams is correct', async () => {
    playerSummaryPage.setPlayerToFind('jim moorin');
    await statOptionsPage.selectAllClubStatsSwitch();

    await yearSelectPage.select2023Year();
    await playerSummaryPage.playerStatsAreCorrectInTable(111, 66, '59%', 2.23);

    await yearSelectPage.select2022Year();
    await playerSummaryPage.playerStatsAreCorrectInTable(114, 83, '73%', 5.57);
});

test('Summary of Richard Hodgson stats for all teams with filters are correct', async () => {
    playerSummaryPage.setPlayerToFind('richard hodgson');
    await statOptionsPage.selectAllClubStatsSwitch();
    await yearSelectPage.select2023Year();

    // All venues
    await playerSummaryPage.playerStatsAreCorrectInTable(58, 33, '57%', 1.86);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(55, 32, '58%', 1.96);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(3, 1, '33%', 0.0);

    // Home only
    await statOptionsPage.selectHomeOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(31, 20, '65%', 3.9);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(31, 20, '65%', 3.9);

    // Away only
    await statOptionsPage.selectAwayOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(25, 11, '44%', -1.28);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(23, 11, '48%', -0.91);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(2, 0, '0%', -5.5);

    // Cup only
    await statOptionsPage.selectCupOnlyRadio();

    await statOptionsPage.selectAllGameTypesRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(2, 2, '100%', 9.5);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(1, 1, '100%', 8.0);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(1, 1, '100%', 11.0);
});

test('Summary of Neil Porter stats for singles and pairs games for all teams is correct', async () => {
    playerSummaryPage.setPlayerToFind('neil porter');
    await statOptionsPage.selectAllClubStatsSwitch();
    await yearSelectPage.select2023Year();

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(31, 20, '65%', 4.74);

    await statOptionsPage.selectAllGameTypesRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(33, 22, '67%', 5.03);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(2, 2, '100%', 9.5);
});

test('Summary of Dave Hudson stats since 2013 for all teams is correct', async () => {
    playerSummaryPage.setPlayerToFind('dave hudson');
    await statOptionsPage.selectAllClubStatsSwitch();

    await statOptionsPage.selectAllYearsSwitch();
    await playerSummaryPage.playerStatsAreCorrectInTable(
        463,
        174,
        '38%',
        -2.48
    );
});

test('Detailed player stats for all teams and years for Dave Hudson', async () => {
    const player = 'Dave Hudson';

    await statOptionsPage.selectAllYearsSwitch();
    await statOptionsPage.selectAllClubStatsSwitch();
    await playerSearchPage.searchForPlayer(player);

    await individualPlayerStatsPage.checkPlayerIsReturned();
    await individualPlayerStatsPage.checkPlayerName(player);
    await individualPlayerStatsPage.checkTeamAccordionHeadersNotExists();

    const stats = {
        totalGamesPlayed: 463,
        totalWins: 174,
        totalLosses: 289,
        totalAverage: -2.48,
    };

    await individualPlayerStatsPage.validateOverviewStats(stats);
});

test('Summary of Bernie Miller stats since 2013 for all teams is correct', async () => {
    playerSummaryPage.setPlayerToFind('bernie miller');
    await statOptionsPage.selectAllClubStatsSwitch();

    await statOptionsPage.selectAllYearsSwitch();
    await playerSummaryPage.playerStatsAreCorrectInTable(416, 242, '58%', 2.37);

    await statOptionsPage.selectSinglesOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(354, 211, '60%', 2.42);

    await statOptionsPage.selectPairsOnlyRadio();
    await playerSummaryPage.playerStatsAreCorrectInTable(62, 31, '50%', 2.08);
});

test('Team select dropdown is disabled when include other teams switch is enabled', async () => {
    await yearSelectPage.select2023Year();
    await statOptionsPage.selectAllClubStatsSwitch();

    await statOptionsPage.teamSelectDropDownIsDisabled();
});
