import { test } from '@playwright/test';
import allBowlsStats from '../../src/data/allPlayerStats2022.json';
import { PlayerStatsPage } from './pages/playerStatsPage';

let playerStatsPage: PlayerStatsPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  await playerStatsPage.goto();
});

const players: Array<string> = [
  'Dave Hudson',
  'Clifford Brogie',
  'Mario Biancardo',
  'Shirley Biancardo',
  'Jim Moorin',
  'Stewart Watson',
  'John Armitage',
  'Duncan McPhail',
  'Joey Broadbent',
];
for (const player of players) {
  test(`Summary of player's all team stats are correct for ${player}`, async () => {
    await playerStatsPage.select2022Year();
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
  const player = 'Jim Moorin';
  await playerStatsPage.select2022Year();
  await playerStatsPage.searchForPlayer(player);
  await playerStatsPage.checkTeamAccordionHeadersExist();
  await playerStatsPage.selectTeamStatsCheckbox();
  await playerStatsPage.checkOnlyBasicAccordionHeadersExist();
  await playerStatsPage.deselectTeamStatsCheckbox();
  await playerStatsPage.checkTeamAccordionHeadersExist();
});
