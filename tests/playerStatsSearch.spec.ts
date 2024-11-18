import { expect } from '@playwright/test';
import { test } from './utils/fixture';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { findTotalNumberOfPlayersForYears } from './utils/statsHelper';

const playerCount = findTotalNumberOfPlayersForYears(bowlsStats);

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

        await expect(individualPlayerStatsPage.playerStats).toHaveCount(1);

        await playerSearchPage.searchForPlayer('Show All');
        await expect(playerSummaryPage.playerRows).toHaveCount(playerCount);
    });

    test('Clicking back to summary button returns all stats', async ({
        playerSummaryPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Alyssa Randell');

        await playerSearchPage.clickBackToSummary();
        await expect(playerSummaryPage.playerRows).toHaveCount(playerCount);
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

        await expect(individualPlayerStatsPage.accordions).toHaveCount(4);
        await expect(individualPlayerStatsPage.overviewAccordion).toHaveText(
            'OVERVIEW'
        );
        await expect(individualPlayerStatsPage.winLossAccordion).toHaveText(
            'WINS & LOSSES'
        );
        await expect(individualPlayerStatsPage.aggAccordion).toHaveText(
            'AGGREGATES'
        );
        await expect(individualPlayerStatsPage.resultsAccordion).toHaveText(
            'RESULTS'
        );

        await playerSearchPage.clickBackToSummary();
        await playerStatOptionsPage.deselectClubStatsSwitch();
        await playerSearchPage.searchForPlayer(player);

        await expect(individualPlayerStatsPage.accordions).toHaveCount(5);
        await expect(individualPlayerStatsPage.overviewAccordion).toHaveText(
            'OVERVIEW'
        );
        await expect(individualPlayerStatsPage.winLossAccordion).toHaveText(
            'WINS & LOSSES'
        );
        await expect(individualPlayerStatsPage.aggAccordion).toHaveText(
            'AGGREGATES'
        );
        await expect(individualPlayerStatsPage.teamAccordion).toHaveText(
            'TEAMS'
        );
        await expect(individualPlayerStatsPage.resultsAccordion).toHaveText(
            'RESULTS'
        );
    });
});
