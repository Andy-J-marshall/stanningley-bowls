import { test } from './utils/fixture';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { findTotalNumberOfPlayersForYears } from './utils/statsHelper';

const totalPlayerCOunt = findTotalNumberOfPlayersForYears(bowlsStats);

test.describe('Player stats - search', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Stats search bar can show all player stats', async ({
        playerSummaryPage,
        playerSearchPage,
        individualPlayerStatsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Paul Bowes');
        await individualPlayerStatsPage.checkPlayerIsReturned();

        await playerSearchPage.searchForPlayer('Show All');
        await playerSummaryPage.checkNumberOfPlayersReturned(totalPlayerCOunt);
    });

    test('Clicking back to summary button returns all stats', async ({
        playerSummaryPage,
        playerSearchPage,
        individualPlayerStatsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Alyssa Randell');
        await individualPlayerStatsPage.checkPlayerIsReturned();

        await playerSearchPage.clickBackToSummary();
        await playerSummaryPage.checkNumberOfPlayersReturned(totalPlayerCOunt);
    });

    test('Can switch between team and all stats when searching', async ({
        playerSearchPage,
        individualPlayerStatsPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        const player = 'Clifford Brogie';

        await yearSelectPage.select2023Year();
        await playerStatOptionsPage.selectAllClubStatsSwitch();
        await playerSearchPage.searchForPlayer(player);
        await individualPlayerStatsPage.checkTeamAccordionHeadersNotExists();

        await playerSearchPage.clickBackToSummary();
        await playerStatOptionsPage.deselectClubStatsSwitch();
        await playerSearchPage.searchForPlayer(player);
        await individualPlayerStatsPage.checkTeamAccordionHeadersExist();
    });
});
