import { test } from '@playwright/test';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { IndividualPlayerStatsPage } from './pages/individualPlayerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSearchPage } from './pages/playerSearchPage';
import { PlayerSummaryPage } from './pages/playerSummaryPage';
import { findTotalNumberOfPlayersForYears } from './utils/statsHelper';

const totalPlayerCOunt = findTotalNumberOfPlayersForYears(bowlsStats);

let individualPlayerStatsPage: IndividualPlayerStatsPage;
let playerSummaryPage: PlayerSummaryPage;
let yearSelectPage: YearSelectPage;
let statOptionsPage: StatOptionsPage;
let playerSearchPage: PlayerSearchPage;

test.describe('Player stats - search', () => {
    test.beforeEach(async ({ page }) => {
        individualPlayerStatsPage = new IndividualPlayerStatsPage(page);
        playerSummaryPage = new PlayerSummaryPage(page);
        yearSelectPage = new YearSelectPage(page);
        statOptionsPage = new StatOptionsPage(page);
        playerSearchPage = new PlayerSearchPage(page);
        await playerSummaryPage.goto();
    });

    test('Stats search bar can show all player stats', async () => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Paul Bowes');
        await individualPlayerStatsPage.checkPlayerIsReturned();

        await playerSearchPage.searchForPlayer('Show All');
        await playerSummaryPage.checkNumberOfPlayersReturned(totalPlayerCOunt);
    });

    test('Clicking back to summary button returns all stats', async () => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Alyssa Randell');
        await individualPlayerStatsPage.checkPlayerIsReturned();

        await playerSearchPage.clickBackToSummary();
        await playerSummaryPage.checkNumberOfPlayersReturned(totalPlayerCOunt);
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
});
