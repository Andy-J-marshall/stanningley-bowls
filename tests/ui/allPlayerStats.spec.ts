import { test } from '@playwright/test';
import allBowlsStats from '../../src/data/allPlayerStats2023.json';
import { PlayerStatsPage } from './pages/playerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';

let playerStatsPage: PlayerStatsPage;
let yearSelectPage: YearSelectPage;

test.beforeEach(async ({ page }) => {
  playerStatsPage = new PlayerStatsPage(page);
  yearSelectPage = new YearSelectPage(page);
  await playerStatsPage.goto();
});

const players: Array<string> = [
  'Clifford Brogie',
  'Jim Moorin',
  'Stewart Watson',
  'John Armitage',
  'Duncan McPhail',
  'Peter Crowther',
  'Andy Marshall',
];

for (const player of players) {
  test(`Summary of player's all team stats are correct for ${player} in 2023`, async () => {
    await yearSelectPage.select2023Year();
    await playerStatsPage.selectAllTeamStatsCheckbox();
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

  await yearSelectPage.select2023Year();
  await playerStatsPage.selectAllTeamStatsCheckbox();
  await playerStatsPage.searchForPlayer(player);
  await playerStatsPage.checkOnlyBasicAccordionHeadersExist();

  await playerStatsPage.clickBackToSummary();
  await playerStatsPage.deselectTeamStatsCheckbox();
  await playerStatsPage.searchForPlayer(player);
  await playerStatsPage.checkTeamAccordionHeadersExist();
});

test('Summary of Jim Moorin stats for all teams is correct', async () => {
  playerStatsPage.setPlayerToFind('jim moorin');
  await playerStatsPage.selectAllTeamStatsCheckbox();

  await yearSelectPage.select2023Year();
  playerStatsPage.playerStatsAreCorrectInTable('111', '66', '59%', '2.23');

  await yearSelectPage.select2022Year();
  playerStatsPage.playerStatsAreCorrectInTable('96', '69', '72%', '5.35');
});

test('Summary of Andy Marshall stats for singles and pairs games for all teams is correct', async () => {
  playerStatsPage.setPlayerToFind('andy marshall');
  await playerStatsPage.selectAllTeamStatsCheckbox();
  await yearSelectPage.select2023Year();

  await playerStatsPage.selectSinglesOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('37', '30', '81%', '5.57');

  await playerStatsPage.selectAllGameTypesRadio();
  playerStatsPage.playerStatsAreCorrectInTable('52', '40', '77%', '5.33');

  await playerStatsPage.selectPairsOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('15', '10', '67%', '4.73');
});

test('Summary of Neil Porter stats for singles and pairs games for all teams is correct', async () => {
  playerStatsPage.setPlayerToFind('neil porter');
  await playerStatsPage.selectAllTeamStatsCheckbox();
  await yearSelectPage.select2023Year();

  await playerStatsPage.selectSinglesOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('31', '20', '65%', '4.74');

  await playerStatsPage.selectAllGameTypesRadio();
  playerStatsPage.playerStatsAreCorrectInTable('33', '22', '67%', '5.03');

  await playerStatsPage.selectPairsOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('2', '2', '100%', '9.5');
});

test('Summary of Dave Hudson stats since 2022 for all teams is correct', async () => {
  playerStatsPage.setPlayerToFind('dave hudson');
  await playerStatsPage.selectAllTeamStatsCheckbox();

  await playerStatsPage.selectSince2022Checkbox();
  playerStatsPage.playerStatsAreCorrectInTable('70', '24', '34%', '-2.83');
});

test('Summary of Bernie Miller stats since 2022 for all teams is correct', async () => {
  playerStatsPage.setPlayerToFind('bernie miller');
  await playerStatsPage.selectAllTeamStatsCheckbox();

  await playerStatsPage.selectSince2022Checkbox();
  playerStatsPage.playerStatsAreCorrectInTable('2', '0', '0%', '-12');

  await playerStatsPage.selectSinglesOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('1', '0', '0%', '-11');

  await playerStatsPage.selectPairsOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('1', '0', '0%', '-13');
});

test('Total player count is not visible for all team stats', async () => {
  await playerStatsPage.selectAllTeamStatsCheckbox();
  await playerStatsPage.totalPlayerCountIsNotVisible();
});