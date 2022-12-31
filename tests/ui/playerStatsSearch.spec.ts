import { test } from '@playwright/test';
import bowlsStats from '../../src/data/bowlsStats2022.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

const totalNumberOfPlayers = Object.keys(bowlsStats.playerResults).length;
let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
});

// TODO fix tests

// test('All players appear by default', async () => {
//   await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
//   await playerStatsPage.clickSearch();
//   await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
// });

// test(`Stats search bar can show all player stats`, async () => {
//   await playerStatsPage.searchForPlayer('Donald Shaw');
//   await playerStatsPage.checkNumberOfPlayersReturned(1);

//   await playerStatsPage.searchForPlayer('Show All');
//   await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
// });

// test(`Clicking search with no player returns all stats`, async () => {
//   await playerStatsPage.searchForPlayer('Alyssa Randell');
//   await playerStatsPage.checkNumberOfPlayersReturned(1);

//   await playerStatsPage.clickSearch();
//   await playerStatsPage.checkNumberOfPlayersReturned(1);
//   await playerStatsPage.clickSearch();
//   await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
// });

test(`Stats year dropdown appears if there are multiple years of stats available`, async () => {
  await playerStatsPage.checkYearDropdownExists();
  // TODO improve this test?
});
