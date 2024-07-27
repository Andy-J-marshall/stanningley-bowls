import { test } from '@playwright/test';
import bowlsStats from '../../src/data/bowlsStats2023.json';
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
  'Andy Marshall',
  'Andy Waller',
  'Paul Bowes',
  'Alyssa Randell',
  'Alison Woodfine',
  'Derek Wilson',
];
for (const player of players) {
  test(`Summary of player's team stats are correct for ${player} in 2023`, async () => {
    await yearSelectPage.select2023Year();
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

test('Summary of Steve Gardner stats for team are correct', async () => {
  playerStatsPage.setPlayerToFind('steve gardner');

  await yearSelectPage.select2023Year();
  playerStatsPage.playerStatsAreCorrectInTable('57', '44', '77%', '7.81');

  await yearSelectPage.select2022Year();
  playerStatsPage.playerStatsAreCorrectInTable('43', '35', '81%', '7.86');
});

test('Summary of Andy Marshall stats for singles games for team are correct', async () => {
  playerStatsPage.setPlayerToFind('andy marshall');

  await yearSelectPage.select2023Year();
  playerStatsPage.playerStatsAreCorrectInTable('51', '40', '78%', '5.49');

  await playerStatsPage.selectPairsOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('15', '10', '67%', '4.73');

  await playerStatsPage.selectSinglesOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('36', '30', '83%', '5.81');
});

test('Summary of Dave Hudson stats since 2013 for team are correct', async () => {
  playerStatsPage.setPlayerToFind('dave hudson');

  await playerStatsPage.selectSince2013Checkbox();
  playerStatsPage.playerStatsAreCorrectInTable('387', '148', '38%', '-2.36');
});

test('Summary of Bernie Miller stats since 2013 for team are correct', async () => {
  playerStatsPage.setPlayerToFind('bernie miller');

  await playerStatsPage.selectSince2013Checkbox();
  playerStatsPage.playerStatsAreCorrectInTable('401', '232', '58%', '2.28');

  await playerStatsPage.selectSinglesOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('339', '201', '59%', '2.32');

  await playerStatsPage.selectPairsOnlyRadio();
  playerStatsPage.playerStatsAreCorrectInTable('62', '31', '50%', '2.08');
});

test('Total player count is calculated correctly', async () => {
  await yearSelectPage.select2023Year();
  await playerStatsPage.totalPlayerCountIsCorrect('32');

  await yearSelectPage.select2022Year();
  await playerStatsPage.totalPlayerCountIsCorrect('24');
});

test('Total player count is not visible if filtering player stats', async () => {
  await playerStatsPage.selectPairsOnlyRadio();
  await playerStatsPage.totalPlayerCountIsNotVisible();

  await playerStatsPage.selectSinglesOnlyRadio();
  await playerStatsPage.totalPlayerCountIsNotVisible();
  
  await playerStatsPage.selectAllGameTypesRadio();

  await playerStatsPage.selectAllTeamStatsCheckbox();
  await playerStatsPage.totalPlayerCountIsNotVisible();
});
