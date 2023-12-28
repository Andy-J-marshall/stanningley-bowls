import { test } from '@playwright/test';
import bowlsStats from '../../src/data/bowlsStats2023.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

const allPlayers = Object.keys(bowlsStats.playerResults);

var totalNumberOfPlayers = allPlayers.filter((player) => {
  const playerStats = bowlsStats.playerResults[player];
  if (playerStats.totalAgg > 0 || playerStats.totalAggAgainst > 0) {
    return player;
  }
}).length;

let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
});

test('All players appear by default', async () => {
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
  await playerStatsPage.clickSearch();
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test(`Stats search bar can show all player stats`, async () => {
  await playerStatsPage.searchForPlayer('Paul Bowes');
  await playerStatsPage.checkPlayerIsReturned();

  await playerStatsPage.searchForPlayer('Show All');
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test(`Clicking search with no player returns all stats`, async () => {
  await playerStatsPage.searchForPlayer('Alyssa Randell');
  await playerStatsPage.checkPlayerIsReturned();

  await playerStatsPage.clickSearch();
  await playerStatsPage.checkPlayerIsReturned();
  await playerStatsPage.clickSearch();
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test(`Stats year dropdown appears if there are multiple years of stats available`, async () => {
  await playerStatsPage.checkYearDropdownExists();
  // TODO improve this test?
});
