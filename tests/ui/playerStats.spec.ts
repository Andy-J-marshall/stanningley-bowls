import { test } from '@playwright/test';
import bowlsStats from '../../src/data/bowlsStats2023.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
});

const players: Array<string> = [
  'Andy Marshall',
  'Andy Waller',
  'Paul Bowes',
  'Alyssa Randell',
  'Alison',
  'Derek Wilson',
];
for (const player of players) {
  test(`Summary of player's team stats are correct for ${player}`, async () => {
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
    } = bowlsStats.playerResults[player.toLowerCase()];
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
