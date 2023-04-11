import { test } from '@playwright/test';
import allBowlsStats from '../../src/data/allPlayerStats2023.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
});

// TODO add these players back in
const players: Array<string> = [
  'Clifford Brogie',
  'Mario Biancardo',
  'Shirley Biancardo',
  // 'Dave Hudson',
  'Jim Moorin',
  'Stewart Watson',
  // 'John Armitage',
  'Duncan McPhail',
  // 'Joey Broadbent',
];
for (const player of players) {
  test(`Summary of player's all team stats are correct for ${player}`, async () => {
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkTeamAccordionHeadersExist();
    await playerStatsPage.selectTeamStatsCheckbox();
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
    await playerStatsPage.deselectTeamStatsCheckbox();
    await playerStatsPage.checkTeamAccordionHeadersExist();
  });
}

test('Can switch between team and all stats', async () => {
  const player = 'Clifford Brogie';
  await playerStatsPage.searchForPlayer(player);
  await playerStatsPage.checkTeamAccordionHeadersExist();
  await playerStatsPage.selectTeamStatsCheckbox();
  await playerStatsPage.checkOnlyBasicAccordionHeadersExist();
  await playerStatsPage.deselectTeamStatsCheckbox();
  await playerStatsPage.checkTeamAccordionHeadersExist();
});
