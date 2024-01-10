import { test } from '@playwright/test';
import allBowlsStats from '../../src/data/allPlayerStats2023.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
});

const players: Array<string> = [
  'Clifford Brogie',
  'Jim Moorin',
  'Stewart Watson',
  'John Armitage',
  'Duncan McPhail',
  'Peter Crowther',
  'Andy Marshall'
];

for (const player of players) {
  test(`Summary of player's all team stats are correct for ${player}`, async () => {
    await playerStatsPage.selectTeamStatsCheckbox();
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkOnlyBasicAccordionHeadersExist();
    const {
      totalAgg,
      totalAggAgainst,
      homeWins,
      awayWins,
      cupWins,
      homeLosses,
      awayLosses,
      cupLosses,
    } = allBowlsStats.playerResults[player.toLowerCase()];
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

test('Can switch between team and all stats', async () => {
  const player = 'Clifford Brogie';

  await playerStatsPage.selectTeamStatsCheckbox();
  await playerStatsPage.searchForPlayer(player);
  await playerStatsPage.checkOnlyBasicAccordionHeadersExist();

  await playerStatsPage.clickBackToSummary();
  await playerStatsPage.deselectTeamStatsCheckbox();
  await playerStatsPage.searchForPlayer(player);
  await playerStatsPage.checkTeamAccordionHeadersExist();
});
