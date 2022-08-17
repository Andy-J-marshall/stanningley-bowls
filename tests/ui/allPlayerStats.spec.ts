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
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkStatsDropdownExists();
    await playerStatsPage.selectTeamStatsDropdown('ALL TEAM STATS');
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
  await playerStatsPage.searchForPlayer('Jim Moorin');
  await playerStatsPage.checkStatsDropdownExists();
  await playerStatsPage.checkTeamAccordionHeadersExist();
  await playerStatsPage.selectTeamStatsDropdown('ALL TEAM STATS');
  await playerStatsPage.checkOnlyBasicAccordionHeadersExist();
  await playerStatsPage.selectTeamStatsDropdown('STANNINGLEY STATS');
  await playerStatsPage.checkTeamAccordionHeadersExist();
  await playerStatsPage.checkStatsDropdownExists();
});
