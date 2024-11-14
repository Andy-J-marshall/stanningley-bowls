import { expect, test } from '@playwright/test';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { IndividualPlayerStatsPage } from './pages/playerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSearchPage } from './pages/playerSearchPage';

const allPlayers = Object.keys(bowlsStats.playerResults);

var totalNumberOfPlayers = allPlayers.filter((player) => {
    const playerStats = bowlsStats.playerResults[player];
    if (playerStats.totalAgg > 0 || playerStats.totalAggAgainst > 0) {
        return player;
    }
}).length;

let individualPlayerStatsPage: IndividualPlayerStatsPage;
let yearSelectPage: YearSelectPage;
let statOptionsPage: StatOptionsPage;
let playerSearchPage: PlayerSearchPage;

test.beforeEach(async ({ page }) => {
    individualPlayerStatsPage = new IndividualPlayerStatsPage(page);
    yearSelectPage = new YearSelectPage(page);
    statOptionsPage = new StatOptionsPage(page);
    playerSearchPage = new PlayerSearchPage(page);
    await individualPlayerStatsPage.goto();
});

test('All players appear by default', async () => {
    await yearSelectPage.select2023Year();
    await individualPlayerStatsPage.checkNumberOfPlayersReturned(
        totalNumberOfPlayers
    );
});

test('Stats search bar can show all player stats', async () => {
    await yearSelectPage.select2023Year();
    await playerSearchPage.searchForPlayer('Paul Bowes');
    await individualPlayerStatsPage.checkPlayerIsReturned();

    await playerSearchPage.searchForPlayer('Show All');
    await individualPlayerStatsPage.checkNumberOfPlayersReturned(
        totalNumberOfPlayers
    );
});

test('Clicking back to summary button returns all stats', async () => {
    await yearSelectPage.select2023Year();
    await playerSearchPage.searchForPlayer('Alyssa Randell');
    await individualPlayerStatsPage.checkPlayerIsReturned();

    await playerSearchPage.clickBackToSummary();
    await individualPlayerStatsPage.checkNumberOfPlayersReturned(
        totalNumberOfPlayers
    );
});

test('Clicking back to summary button remembers state of all stat toggles', async () => {
    const name = 'Mabel Shaw';
    individualPlayerStatsPage.setPlayerToFind(name);

    await statOptionsPage.selectAllClubStatsSwitch();
    await statOptionsPage.selectAllYearsSwitch();
    await statOptionsPage.selectSinglesOnlyRadio();
    await statOptionsPage.selectAwayOnlyRadio();

    individualPlayerStatsPage.playerStatsAreCorrectInTable(
        270,
        149,
        '55%',
        1.29
    );

    await playerSearchPage.searchForPlayer(name);
    await playerSearchPage.clickBackToSummary();

    await expect(statOptionsPage.allYearSwitch).toBeChecked();
    await expect(statOptionsPage.singlesOnlyRadio).toBeChecked();
    await expect(statOptionsPage.awayOnlyRadio).toBeChecked();
    await expect(statOptionsPage.clubSwitch).toBeChecked();

    individualPlayerStatsPage.playerStatsAreCorrectInTable(
        270,
        149,
        '55%',
        1.29
    );
});

test('Stats year dropdown appears if there are multiple years of stats available', async () => {
    await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
});

test('Can switch between team and all stats when searching', async () => {
    const player = 'Clifford Brogie';

    await yearSelectPage.select2023Year();
    await statOptionsPage.selectAllClubStatsSwitch();
    await playerSearchPage.searchForPlayer(player);
    await individualPlayerStatsPage.checkTeamAccordionHeadersNotExists();

    await playerSearchPage.clickBackToSummary();
    await statOptionsPage.deselectClubStatsSwitch();
    await playerSearchPage.searchForPlayer(player);
    await individualPlayerStatsPage.checkTeamAccordionHeadersExist();
});
