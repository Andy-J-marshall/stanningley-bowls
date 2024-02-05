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
  'Alison',
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
  await yearSelectPage.select2023Year();
  playerStatsPage.playerStatsAreCorrectForSG('57', '44', '77%', '7.81');
  await yearSelectPage.select2022Year();
  playerStatsPage.playerStatsAreCorrectForSG('43', '35', '81%', '7.86');
  await playerStatsPage.selectSince2022Checkbox();
});

test('Summary of Andy Marshall stats for singles games for team are correct', async () => {
  await yearSelectPage.select2023Year();
  playerStatsPage.playerStatsAreCorrectForAM('51', '40', '78%', '5.49');
  await playerStatsPage.selectSinglesOnlyCheckbox();
  playerStatsPage.playerStatsAreCorrectForAM('36', '30', '83%', '5.81');
});

test('Summary of Dave Hudson stats since 2022 for team are correct', async () => {
  await playerStatsPage.selectSince2022Checkbox();
  playerStatsPage.playerStatsAreCorrectForDH('14', '7', '50%', '-1.00');
});

test('Summary of Bernie Miller stats since 2022 for team are correct', async () => {
  await playerStatsPage.selectSince2022Checkbox();
  playerStatsPage.playerStatsAreCorrectForBM('2', '0', '0%', '-12');
  await playerStatsPage.selectSinglesOnlyCheckbox();
  playerStatsPage.playerStatsAreCorrectForBM('1', '0', '0%', '-11');
});
