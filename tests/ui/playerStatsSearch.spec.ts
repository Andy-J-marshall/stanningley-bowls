import { test } from '@playwright/test';
import bowlsStats from '../../src/data/bowlsStats2022.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

const totalNumberOfPlayers = Object.keys(bowlsStats.playerResults).length;
let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
});

test('All players appear by default', async () => {
  await playerStatsPage.checkStatsDropdownNotExists();
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
  await playerStatsPage.clickSearch();
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
  await playerStatsPage.checkStatsDropdownNotExists();
});

test(`Stats search bar can show all player stats`, async () => {
  await playerStatsPage.searchForPlayer('Donald Shaw');
  await playerStatsPage.checkNumberOfPlayersReturned(1);
  await playerStatsPage.checkStatsDropdownNotExists();

  await playerStatsPage.searchForPlayer('Show All');
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
  await playerStatsPage.checkStatsDropdownNotExists();
});

test(`Clicking search with no player returns all stats`, async () => {
  await playerStatsPage.searchForPlayer('Alyssa Randell');
  await playerStatsPage.checkNumberOfPlayersReturned(1);
  await playerStatsPage.checkStatsDropdownNotExists();

  await playerStatsPage.clickSearch();
  await playerStatsPage.checkNumberOfPlayersReturned(1);
  await playerStatsPage.clickSearch();
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
  await playerStatsPage.checkStatsDropdownNotExists();
});

test(`Stats year dropdown does not appear if there are only 1 years of stats available`, async () => {
  await playerStatsPage.checkYearDropdownNotExists();
});
