import { expect, test } from '@playwright/test';
import bowlsStats2022 from '../src/data/bowlsStats2022.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

const totalNumberOfPlayers = Object.keys(bowlsStats2022.playerResults).length;
const { statsYear } = bowlsStats2022;
let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
});

test('Stats are checking for current year', async () => {
  const currentYear = new Date().getFullYear();
  expect(statsYear).toEqual(currentYear.toString());
});

const players: Array<string> = [
  'Andy Marshall',
  'Andy W',
  'Jack Roberts',
  'Paul Bowes',
];
for (const player of players) {
  test(`Stats search bar can return ${player} stats`, async () => {
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkNumberOfPlayersReturned(1);
    // TODO check stats
  });
}

test('All players appear by default', async () => {
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test(`Stats search bar can show all player stats`, async () => {
  await playerStatsPage.searchForPlayer('Donald Shaw');
  await playerStatsPage.checkNumberOfPlayersReturned(1);
  await playerStatsPage.searchForPlayer('Show All');
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});
