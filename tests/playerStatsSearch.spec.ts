import { expect, test } from '@playwright/test';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { PlayerStatsPage } from './pages/playerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';

const allPlayers = Object.keys(bowlsStats.playerResults);

var totalNumberOfPlayers = allPlayers.filter((player) => {
    const playerStats = bowlsStats.playerResults[player];
    if (playerStats.totalAgg > 0 || playerStats.totalAggAgainst > 0) {
        return player;
    }
}).length;

let playerStatsPage: PlayerStatsPage;
let yearSelectPage: YearSelectPage;

test.beforeEach(async ({ page }) => {
    playerStatsPage = new PlayerStatsPage(page);
    yearSelectPage = new YearSelectPage(page);
    await playerStatsPage.goto();
});

test('All players appear by default', async () => {
    await yearSelectPage.select2023Year();
    await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test('Stats search bar can show all player stats', async () => {
    await yearSelectPage.select2023Year();
    await playerStatsPage.searchForPlayer('Paul Bowes');
    await playerStatsPage.checkPlayerIsReturned();

    await playerStatsPage.searchForPlayer('Show All');
    await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test('Clicking back to summary button returns all stats', async () => {
    await yearSelectPage.select2023Year();
    await playerStatsPage.searchForPlayer('Alyssa Randell');
    await playerStatsPage.checkPlayerIsReturned();

    await playerStatsPage.clickBackToSummary();
    await playerStatsPage.checkNumberOfPlayersReturned(totalNumberOfPlayers);
});

test('Clicking back to summary button remembers state of all stat toggles', async () => {
    const name = 'Mabel Shaw';
    playerStatsPage.setPlayerToFind(name);

    await playerStatsPage.selectAllClubStatsSwitch();
    await playerStatsPage.selectAllYearsSwitch();
    await playerStatsPage.selectSinglesOnlyRadio();
    await playerStatsPage.selectAwayOnlyRadio();

    playerStatsPage.playerStatsAreCorrectInTable(270, 149, '55%', 1.29);

    await playerStatsPage.searchForPlayer(name);
    await playerStatsPage.clickBackToSummary();

    await expect(playerStatsPage.allYearSwitch).toBeChecked();
    await expect(playerStatsPage.singlesOnlyRadio).toBeChecked();
    await expect(playerStatsPage.awayOnlyRadio).toBeChecked();
    await expect(playerStatsPage.clubSwitch).toBeChecked();

    playerStatsPage.playerStatsAreCorrectInTable(270, 149, '55%', 1.29);
});

test('Stats year dropdown appears if there are multiple years of stats available', async () => {
    await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
});

test('Can switch between team and all stats when searching', async () => {
    const player = 'Clifford Brogie';

    await yearSelectPage.select2023Year();
    await playerStatsPage.selectAllClubStatsSwitch();
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkTeamAccordionHeadersNotExists();

    await playerStatsPage.clickBackToSummary();
    await playerStatsPage.deselectClubStatsSwitch();
    await playerStatsPage.searchForPlayer(player);
    await playerStatsPage.checkTeamAccordionHeadersExist();
});
