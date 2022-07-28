import { test } from '@playwright/test';
import bowlsStatsExample from './fixtures/bowlsStatsExample.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

const totalNumberOfPlayers = Object.keys(
  bowlsStatsExample.playerResults
).length;
let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
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
    await playerStatsPage.checkPlayerName(player);
  });

  test(`Summary of player stats are correct for ${player}`, async () => {
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkAccordionHeadersExist();
    const {
      totalAgg,
      totalAggAgainst,
      homeWins,
      awayWins,
      cupWins,
      homeLosses,
      awayLosses,
      cupLosses,
    } = bowlsStatsExample.playerResults[player.toLowerCase()];
    const totalWins = cupWins + homeWins + awayWins;
    const totalLosses = cupLosses + homeLosses + awayLosses;
    const totalGamesPlayed = totalLosses + totalWins;
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

test('All players appear by default', async () => {
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test(`Stats search bar can show all player stats`, async () => {
  await playerStatsPage.searchForPlayer('Donald Shaw');
  await playerStatsPage.checkNumberOfPlayersReturned(1);
  await playerStatsPage.searchForPlayer('Show All');
  await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});
