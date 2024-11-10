import { test } from '@playwright/test';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { PlayerStatsPage } from './pages/playerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';

const allPlayers = Object.keys(bowlsStats.playerResults);

var totalNumberOfPlayers = allPlayers.filter((player) => {
    const playerStats = bowlsStats.playerResults[player];
    if (playerStats.totalAgg > 0 || playerStats.totalAggAgainst > 0) {
        return player;
    }
}).length;

let playerStatsPage: PlayerStatsPage;
let yearSelectPage: YearSelectPage;

test.beforeEach(async ({ page }) => {
    playerStatsPage = new PlayerStatsPage(page);
    yearSelectPage = new YearSelectPage(page);
    await playerStatsPage.goto();
});

test('All players appear by default', async () => {
    await yearSelectPage.select2023Year();
    await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test('Stats search bar can show all player stats', async () => {
    await yearSelectPage.select2023Year();
    await playerStatsPage.searchForPlayer('Paul Bowes');
    await playerStatsPage.checkPlayerIsReturned();

    await playerStatsPage.searchForPlayer('Show All');
    await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test('Clicking back to summary button returns all stats', async () => {
    await yearSelectPage.select2023Year();
    await playerStatsPage.searchForPlayer('Alyssa Randell');
    await playerStatsPage.checkPlayerIsReturned();

    await playerStatsPage.clickBackToSummary();
    await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test('Stats year dropdown appears if there are multiple years of stats available', async () => {
    await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
});
